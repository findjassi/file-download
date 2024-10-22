import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ListHeader from "./ListHeader";

describe("ListHeader Component", () => {
  test("renders correct data on initial state", () => {
    render(
      <ListHeader
        isAllSelected={false}
        isIndeterminate={false}
        selectedCount={0}
        toggleSelectAll={() => {}}
        actionLabel="Download Selected"
        onAction={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const actionButton = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    const spanText = screen.getByText("None Selected");

    expect(checkbox).not.toBeChecked();
    expect(checkbox.indeterminate).toBe(false);
    expect(actionButton).toBeDisabled();
    expect(spanText).toBeInTheDocument();
  });

  test("handles selectAll checkbox state", () => {
    render(
      <ListHeader
        isAllSelected={true}
        isIndeterminate={true}
        selectedCount={5}
        toggleSelectAll={() => {}}
        actionLabel="Download Selected"
        onAction={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    expect(checkbox).toBeChecked();
    expect(checkbox.indeterminate).toBe(true);
  });

  test("enables action button when selectedCount > 0", () => {
    render(
      <ListHeader
        isAllSelected={false}
        isIndeterminate={false}
        selectedCount={3}
        toggleSelectAll={() => {}}
        actionLabel="Download Selected"
        onAction={() => {}}
      />
    );

    const actionButton = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    const spanText = screen.getByText("Selected 3");

    expect(actionButton).not.toBeDisabled();
    expect(spanText).toBeInTheDocument();
  });

  test("calls toggleSelectAll when checkbox is clicked", () => {
    const mockToggleSelectAll = jest.fn();

    render(
      <ListHeader
        isAllSelected={false}
        isIndeterminate={false}
        selectedCount={0}
        toggleSelectAll={mockToggleSelectAll}
        actionLabel="Download Selected"
        onAction={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleSelectAll).toHaveBeenCalledTimes(1);
  });

  test("calls onAction when action button is clicked", () => {
    const mockOnAction = jest.fn();

    render(
      <ListHeader
        isAllSelected={false}
        isIndeterminate={false}
        selectedCount={2}
        toggleSelectAll={() => {}}
        actionLabel="Download Selected"
        onAction={mockOnAction}
      />
    );

    const actionButton = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    fireEvent.click(actionButton);

    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });
});
