export interface TableColumn<T> {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
}
