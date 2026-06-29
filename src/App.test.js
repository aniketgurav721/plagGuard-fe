import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders PlagGuard header", () => {
  render(<App />);
  expect(screen.getByText(/PlagGuard/i)).toBeInTheDocument();
});
