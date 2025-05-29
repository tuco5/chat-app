import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CodeChallengeLogo } from "./sellia-logo";

// Mock next/image to render a regular img for testing
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt="Sellia Logo" />;
  },
}));

describe("CodeChallengeLogo", () => {
  it("renders the logo image with correct src and alt", () => {
    render(<CodeChallengeLogo />);
    const img = screen.getByAltText(
      "Sellia Logo"
    ) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/logo.png");
    expect(img.width).toBe(128);
    expect(img.height).toBe(40);
  });

  it("renders the text 'sellia'", () => {
    render(<CodeChallengeLogo />);
    expect(screen.getByText("sellia")).toBeInTheDocument();
  });

  it("renders the text 'code challenge'", () => {
    render(<CodeChallengeLogo />);
    expect(
      screen.getByText("code challenge")
    ).toBeInTheDocument();
  });

  it("renders a link with correct href, target, and title", () => {
    render(<CodeChallengeLogo />);
    const link = screen.getByRole("link", {
      name: /sellia code challenge/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://docs.google.com/document/d/1NpeteBEWAG8Q3rHnWvsl00yOnUflLNceTitfstbY6OE/edit?usp=sharing"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute(
      "title",
      "Sellia Code Challenge"
    );
  });
});
