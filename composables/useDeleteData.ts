// composables/useDeleteData.ts
import { TABLE_IDS } from "~/utils/constants"; // Import your constants

import { useRuntimeConfig } from "#app"; // Import runtime config for environment variables
import { constructBaserowApiUrl } from "~/utils/baserowUtils"; // Import the URL construction utility

// Generic function to delete data from the Baserow API
const deleteFromBaserowApi = async (tableId: number, rowId: number) => {
  const config = useRuntimeConfig();
  const token = config.public.apiToken;

  // Construct the delete URL with the row ID
  const url = constructBaserowApiUrl(tableId, rowId);

  // Send delete request to the Baserow API
  const { error } = await useFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return { error };
};

// Main function to delete data from a specified table
export const useDeleteData = async (
  rowId: number,
  tableKey: keyof typeof TABLE_IDS
) => {
  const tableId = TABLE_IDS[tableKey]; // Get the table ID from the constants
  if (tableId === undefined) {
    throw new Error(`Table ID not found for key: ${tableKey}`); // Error handling for undefined table ID
  }
  return await deleteFromBaserowApi(tableId, rowId); // Call the generic DELETE function
};
