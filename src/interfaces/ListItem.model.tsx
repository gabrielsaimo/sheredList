export interface ListItem {
  id: number;
  idreq: number;
  user: string;
  check: boolean;
  name: string;
  description: string;
  quantity: number;
  unit?: string;
  price?: number;
  updated_at?: string;
  created_at: string;
}
