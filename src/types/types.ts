export type File = {
    name: string;
    device: string;
    path: string;
    status: 'available' | 'scheduled';
  };

export type TableColumn<T> = {
  header: string;
  key: keyof T;
  render?: (data: T) => JSX.Element;
};
