import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "./Table";
import { TableColumn } from "../../../types/types";

type MockFile = {
  name: string;
  status: string;
};

const mockFiles: MockFile[] = [
  { name: "file1.txt", status: "available" },
  { name: "file2.txt", status: "scheduled" },
];

const columns: TableColumn<MockFile>[] = [
  { header: "Name", key: "name" },
  { header: "Status", key: "status" },
];

describe("Table component", () => {
  test("renders the table with the correct number of rows, columns and data", () => {
    render(
      <Table
        items={mockFiles}
        columns={columns}
        selectedItems={[]}
        onSelectItem={() => {}}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // includes the header row

    expect(screen.getByText("file1.txt")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();

    expect(screen.getByText("file2.txt")).toBeInTheDocument();
    expect(screen.getByText("scheduled")).toBeInTheDocument();
  });

  test("renders selected rows correctly", () => {
    render(
      <Table
        items={mockFiles}
        columns={columns}
        selectedItems={[mockFiles[0]]}
        onSelectItem={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  test("calls onSelectItem when a row's checkbox is clicked", () => {
    const mockOnSelectItem = jest.fn();

    render(
      <Table
        items={mockFiles}
        columns={columns}
        selectedItems={[]}
        onSelectItem={mockOnSelectItem}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    expect(mockOnSelectItem).toHaveBeenCalledWith(mockFiles[0]);
  });
});
