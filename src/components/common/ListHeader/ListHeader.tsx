import "./ListHeader.css";

type ListHeaderProps = {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  selectedCount: number;
  actionLabel: string;
  toggleSelectAll: () => void;
  onAction: () => void;
};

const ListHeader = ({
  isAllSelected,
  isIndeterminate,
  selectedCount,
  actionLabel,
  toggleSelectAll,
  onAction,
}: ListHeaderProps) => {
  return (
    <div className="list-header">
      <input
        type="checkbox"
        checked={isAllSelected}
        ref={(el) => el && (el.indeterminate = isIndeterminate)}
        onChange={toggleSelectAll}
      />
      <span>
        {selectedCount > 0 ? `Selected ${selectedCount}` : "None Selected"}
      </span>
      <button disabled={selectedCount === 0} onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
};

export default ListHeader;
