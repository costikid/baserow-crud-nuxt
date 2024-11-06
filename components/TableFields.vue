<script setup lang="ts">
import { type TableRow, type ApiResponse } from "~/types/tableFields";
import { useFetchData } from "~/composables/useFetchData";
import { usePostData } from "~/composables/usePostData";
import { useUpdateData } from "~/composables/useUpdateData"; // Import update composable
import { usePolling } from "~/composables/usePolling";

// Define initial row structure
const initialRow: TableRow = {
  id: 0,
  Name: "",
  Notes: "",
};

// States
const data = useState<ApiResponse | null>("apiData", () => null);
const error = useState<string | null>("apiError", () => null);
const newRow = useState<TableRow>("newRow", () => initialRow);

// Define table key based on TABLE_IDS
const tableKey = "EXAMPLE_TABLE";

// Fetch data from API
const fetchData = async () => {
  const { data: fetchedData, error: fetchError } = await useFetchData();
  if (fetchError.value) {
    error.value = fetchError.value.message;
  } else if (fetchedData.value) {
    data.value = fetchedData.value as ApiResponse;
  }
};

// Initial data fetch
await fetchData();
usePolling(fetchData, 5000);

// Submit new data
const handleSubmit = async () => {
  const { data: postData, error: postError } = await usePostData(
    newRow.value,
    tableKey
  );
  if (postError.value) {
    error.value = postError.value.message;
  } else {
    newRow.value.Name = "";
    newRow.value.Notes = "";
    await fetchData();
  }
};

// Edit and save functions
const editingRow = ref<number | null>(null); // Track which row is being edited
const editedRow = ref<Partial<TableRow>>({}); // Store edits temporarily

const handleEdit = (row: TableRow) => {
  editingRow.value = row.id;
  editedRow.value = { ...row };
};

const handleSave = async (rowId: number) => {
  const { error: updateError } = await useUpdateData(
    rowId,
    editedRow.value,
    tableKey
  );
  if (updateError.value) {
    error.value = updateError.value.message;
  } else {
    editingRow.value = null;
    await fetchData();
  }
};

const handleCancel = () => {
  editingRow.value = null;
  editedRow.value = {};
};
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else>
    <ul>
      <li v-for="row in data?.results ?? []" :key="row.id">
        <div v-if="editingRow === row.id">
          <input v-model="editedRow.Name" placeholder="Edit name" />
          <input v-model="editedRow.Notes" placeholder="Edit notes" />
          <button @click="handleSave(row.id)">Save</button>
          <button @click="handleCancel">Cancel</button>
        </div>
        <div v-else>
          Name: {{ row.Name }} <br />
          Notes: {{ row.Notes }}
          <button @click="handleEdit(row)">Edit</button>
        </div>
      </li>
    </ul>

    <form @submit.prevent="handleSubmit">
      <input v-model="newRow.Name" placeholder="Enter name" required />
      <input v-model="newRow.Notes" placeholder="Enter notes" required />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
