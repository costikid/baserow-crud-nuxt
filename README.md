# Nuxt Baserow Table Data Management

This repository demonstrates how to interact with a Baserow table using a Nuxt app, covering how to fetch, post, and edit data with composables for easy API management.

## Prerequisites

1. **Nuxt 3**: This project is built on Nuxt 3. Make sure Node.js and Nuxt are installed.
2. **Baserow Account**: Create a [Baserow](https://baserow.io) account to obtain an API token and set up your database tables.

## Setup

1. **Clone this repository**:

   ```bash
   git clone https://github.com/yourusername/baserow-crud-nuxt.git
   cd baserow-crud-nuxt
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add API token**:

   Create a `.env` file at the root of the project and add your Baserow API token and API URL:

   ```plaintext
   NUXT_API_TOKEN=your_baserow_api_token
   NUXT_API_URL=https://api.baserow.io
   ```

---

4. **Set up constants**:

Define your Baserow table IDs in a constants file (e.g., `utils/constants.ts`) for easy reference in the composables.

## Key Functionalities

This project provides composables to fetch, post, and edit data in a Baserow table. Here’s how to use each feature:

### 1. Fetching Data

The `useFetchData` composable retrieves data from a Baserow table with a GET request.

#### Usage

In your component, call `useFetchData()` to fetch data on load:

```javascript
const { data, error } = await useFetchData();
```

#### Tutorial

For a step-by-step guide on fetching data, check out this tutorial:  
[Fetching Data from a Baserow Table using Nuxt](https://costanza.website/fetching-data-from-a-baserow-table-using-nuxt-a-step-by-step-tutorial)

### 2. Posting Data

Use the `usePostData` composable to add new rows to a Baserow table by sending a POST request. Ideal for form submissions where you need to add data.

#### Usage

To post data, call `usePostData()` with the row data and table key:

```javascript
const { data: postData, error: postError } = await usePostData(
  newRow,
  tableKey
);
```

#### Tutorial

For more on posting data, refer to this tutorial:  
[Posting Data to a Baserow Table using Nuxt](https://hashnode.com/post/cm35s3zgb000i09l2d3iy9s67)

### 3. Editing Data

The `useUpdateData` composable allows you to edit existing rows in the Baserow table using a PATCH request.

#### Usage

To edit data, track which row is being edited, capture edits in `editedRow`, and call `useUpdateData()`:

```javascript
const { error: updateError } = await useUpdateData(rowId, editedRow, tableKey);
```

### Folder Structure

The project is organized as follows:

```plaintext
/my-nuxt-app
│
├── /composables
│   ├── useFetchData.ts          # Fetch data from Baserow
│   ├── usePostData.ts           # Post new data to Baserow
│   └── useUpdateData.ts         # Update data in Baserow
│
├── /types
│   └── tableFields.ts           # Type definitions for Baserow data
│
├── /components
│   └── TableFields.vue          # Displays table data with edit functionality
│
├── /pages
│   └── index.vue                # Main page to display data and form
│
├── nuxt.config.ts               # Nuxt configuration file
└── .env                         # Environment variables (e.g., API token)
```
