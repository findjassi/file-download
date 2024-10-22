import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import TableRow from "./TableRow";
import { TableColumn } from "../../../../types/types";

type MockFile = {
  name: string;
  status: string;
};

const mockFile: MockFile = {
  name: "file1.txt",
  status: "available",
};

const columns: TableColumn<MockFile>[] = [
  { header: "Name", key: "name" },
  { header: "Status", key: "status" },
];

describe("TableRow component", () => {
  test("renders the row data correctly", () => {
    render(
      <TableRow
        item={mockFile}
        columns={columns}
        isSelected={false}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText("file1.txt")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();
  });

  test("checkbox is checked when row is selected", () => {
    render(
      <TableRow
        item={mockFile}
        columns={columns}
        isSelected={true}
        onSelect={() => {}}
      />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("checkbox is not checked when row is not selected", () => {
    render(
      <TableRow
        item={mockFile}
        columns={columns}
        isSelected={false}
        onSelect={() => {}}
      />
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("checkbox is disabled when status is not 'available'", () => {
    render(
      <TableRow
        item={{
          name: "file2.txt",
          status: "scheduled",
        }}
        columns={columns}
        isSelected={false}
        onSelect={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  test("checkbox is not disabled when status is 'available'", () => {
    render(
      <TableRow
        item={mockFile}
        columns={columns}
        isSelected={false}
        onSelect={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeDisabled();
  });

  test("calls onSelect when checkbox is clicked", () => {
    const mockOnSelect = jest.fn();

    render(
      <TableRow
        item={mockFile}
        columns={columns}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
