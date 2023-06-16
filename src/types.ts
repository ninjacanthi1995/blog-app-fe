export interface Data {
  title: string
  createdAt: string
  createdBy: string
}

export type BlogDto = {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
}

export type HeadCell = {
  id: keyof Data
  label: string
}

export type Order = 'asc' | 'desc';

export type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

export type FormInputs = {
  title: string
  createdBy: string
  content: string
}
