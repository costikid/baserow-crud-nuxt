import type { TableRow } from "~/types/tableFields"; // Import your TableRow type
import { TABLE_IDS } from "~/utils/constants"; // Import your constants
import { constructBaserowApiUrl } from "~/utils/baserowUtils"; // Import the URL construction utility

// Generic function to post data to Baserow API
const postToBaserowApi = async (tableId: number, newRow: TableRow) => {
  const config = useRuntimeConfig();
  const token = config.public.apiToken;

  // Construct the API URL using the utility function
  const url = constructBaserowApiUrl(tableId);

  // Post data to the Baserow API
  const { data, error } = await useFetch<TableRow>(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRow),
  });

  return { data, error };
};

// Main function to post data to a specified table
export const usePostData = async (
  newRow: TableRow,
  tableKey: keyof typeof TABLE_IDS
) => {
  const tableId = TABLE_IDS[tableKey]; // Get the table ID from the constants
  if (tableId === undefined) {
    throw new Error(`Table ID not found for key: ${tableKey}`); // Error handling for undefined table ID
  }
  return await postToBaserowApi(tableId, newRow); // Call the generic POST function
};
