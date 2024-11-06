import { type TableRow } from "~/types/tableFields";
import { TABLE_IDS } from "~/utils/constants";
import { constructBaserowApiUrl } from "~/utils/baserowUtils";

// Generic function to update data in Baserow API
const updateBaserowApi = async (
  tableId: number,
  rowId: number,
  updatedRow: Partial<TableRow>
) => {
  const config = useRuntimeConfig();
  const token = config.public.apiToken;

  // Construct the API URL for a specific row using the rowId
  const url = constructBaserowApiUrl(tableId, rowId);

  // Send the update request
  const { data, error } = await useFetch(url, {
    method: "PATCH", // PATCH to update specific fields
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRow),
  });

  return { data, error };
};

// Main function to update data in a specified table
export const useUpdateData = async (
  rowId: number,
  updatedRow: Partial<TableRow>,
  tableKey: keyof typeof TABLE_IDS
) => {
  const tableId = TABLE_IDS[tableKey]; // Get the table ID from the constants
  if (tableId === undefined) {
    throw new Error(`Table ID not found for key: ${tableKey}`);
  }
  return await updateBaserowApi(tableId, rowId, updatedRow);
};
