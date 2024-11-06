import type { ApiResponse } from "~/types/tableFields";

export const useFetchData = async () => {
  const config = useRuntimeConfig();
  const token = config.public.apiToken;
  const apiUrl = config.public.apiUrl;

  // Fetch data from the Baserow API
  const { data, error } = await useFetch<ApiResponse>(
    `${apiUrl}/api/database/rows/table/373117/?user_field_names=true`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return { data, error };
};
