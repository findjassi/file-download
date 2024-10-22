import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FileDownloadComponent from "./FileDownloadComponent";
import { fetchFiles } from "../../services/fileService";
import { File } from "../../types/types";

jest.mock("../../services/fileService");
jest.spyOn(window, "alert").mockImplementation(() => {});

const mockFiles: File[] = [
  {
    name: "smss.exe",
    device: "Device A",
    path: "/path/smss.exe",
    status: "available",
  },
  {
    name: "netsh.exe",
    device: "Device B",
    path: "/path/netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Device C",
    path: "/path/uxtheme.dll",
    status: "scheduled",
  },
];

describe("FileDownloadComponent", () => {
  beforeEach(() => {
    (fetchFiles as jest.Mock).mockResolvedValue(mockFiles);
  });

  test("renders the component", async () => {
    render(<FileDownloadComponent />);

    expect(screen.getByText("File Download Component")).toBeInTheDocument();
    expect(screen.getByText("None Selected")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download Selected" })
    ).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText("smss.exe")).toBeInTheDocument();
      expect(screen.getByText("netsh.exe")).toBeInTheDocument();
      expect(screen.getByText("uxtheme.dll")).toBeInTheDocument();
    });
  });

  test("selects and deselects individual files", async () => {
    render(<FileDownloadComponent />);

    await waitFor(() => {
      expect(screen.getByText("smss.exe")).toBeInTheDocument();
    });

    const firstCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    expect(screen.getByText("Selected 1")).toBeInTheDocument();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  test("selects and deselects all available files", async () => {
    render(<FileDownloadComponent />);

    await waitFor(() => {
      expect(screen.getByText("smss.exe")).toBeInTheDocument();
    });

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(selectAllCheckbox);

    const firstCheckbox = screen.getAllByRole("checkbox")[1];
    const secondCheckbox = screen.getAllByRole("checkbox")[2];

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).toBeChecked();
    expect(screen.getByText("Selected 2")).toBeInTheDocument();

    fireEvent.click(selectAllCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(secondCheckbox).not.toBeChecked();
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  test("handles downloading selected files", async () => {
    render(<FileDownloadComponent />);

    await waitFor(() => {
      expect(screen.getByText("smss.exe")).toBeInTheDocument();
    });

    const firstCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(firstCheckbox);

    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });
    fireEvent.click(downloadButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Downloading: \nDevice A: /path/smss.exe"
    );
  });
});
