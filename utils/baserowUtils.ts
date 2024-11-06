// baserowUtils.ts
import { useRuntimeConfig } from "#app";

// Function to construct the Baserow API URL
export const constructBaserowApiUrl = (tableId: number, rowId?: number) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  // If a rowId is provided, construct the URL for a specific row (used for DELETE and GET specific row)
  if (rowId) {
    return `${apiUrl}/api/database/rows/table/${tableId}/${rowId}/?user_field_names=true`;
  }

  // If no rowId, construct the URL for general table operations (POST, GET all rows)
  return `${apiUrl}/api/database/rows/table/${tableId}/?user_field_names=true`;
};
