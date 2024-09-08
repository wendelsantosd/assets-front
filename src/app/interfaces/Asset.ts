export interface IAsset {
  id?: string;
  name: string;
  value: number;
  date?: string | Date | null;
  createdAt?: string;
  updatedAt?: string;
}
