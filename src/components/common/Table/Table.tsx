import { TableColumn } from "../../../types/types";
import "./Table.css";
import TableRow from "./TableRow/TableRow";

type TableProps<T> = {
  items: T[];
  columns: TableColumn<T>[];
  selectedItems: T[];
  onSelectItem: (item: T) => void;
};

const Table = <T extends { status: string }>({
  items,
  columns,
  selectedItems,
  onSelectItem,
}: TableProps<T>) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <TableRow
            key={index}
            item={item}
            columns={columns}
            isSelected={selectedItems.includes(item)}
            onSelect={() => onSelectItem(item)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
