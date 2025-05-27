import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./theme-toggle";
import { useTheme } from "next-themes";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

const setThemeMock = jest.fn();

describe("ThemeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  it("renders the button with correct title for dark theme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Switch to light mode")).toBeInTheDocument();
  });

  it("renders the button with correct title for light theme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Switch to dark mode")).toBeInTheDocument();
  });

  it("calls setTheme with 'light' when current theme is dark", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with 'dark' when current theme is light", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
