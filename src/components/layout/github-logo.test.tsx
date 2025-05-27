import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GithubLogo from "./github-logo";

describe("GithubLogo", () => {
  it("renders the github logo", () => {
    render(<GithubLogo />);

    const logo = screen.getByRole("link", { name: /github/i });

    expect(logo).toBeInTheDocument();
  });

  it("has the correct attributes", () => {
    render(<GithubLogo />);

    const logo = screen.getByRole("link", { name: /github/i });

    expect(logo).toHaveAttribute("href", "https://github.com/tuco5/chat-app");
    expect(logo).toHaveAttribute("target", "_blank");
  });
});
