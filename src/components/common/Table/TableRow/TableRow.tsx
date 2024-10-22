import { TableColumn } from "../../../../types/types";
import "./TableRow.css";

type TableRowProps<T> = {
  item: T;
  columns: TableColumn<T>[];
  isSelected: boolean;
  onSelect: () => void;
};

const TableRow = <T extends { status: string }>({
  item,
  columns,
  isSelected,
  onSelect,
}: TableRowProps<T>) => {
  return (
    <tr className={isSelected ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          disabled={item.status !== "available"}
          aria-checked={isSelected}
          aria-label="Select file"
        />
      </td>
      {columns.map((col, index) => (
        <td key={index}>
          {col.render ? col.render(item) : String(item[col.key])}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
