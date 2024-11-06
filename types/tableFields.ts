// types/tableFields.ts
export interface TableRow {
  id: number;
  Name: string;
  Notes: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results?: TableRow[];
}
