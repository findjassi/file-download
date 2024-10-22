import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock(
  "./components/FileDownloadComponent/FileDownloadComponent",
  () => () => <div>Mock FileDownloadComponent</div>
);

describe("App Component", () => {
  test("renders FileDownloadComponent", () => {
    render(<App />);

    expect(screen.getByText("Mock FileDownloadComponent")).toBeInTheDocument();
  });
});
