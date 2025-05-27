import GithubLogo from "@/components/github-logo";
import SelliaLogo from "@/components/sellia-logo";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="w-full flex justify-center items-center h-20 border-b border-muted">
      <div className="flex items-center justify-between w-full max-w-6xl px-4">
        <SelliaLogo />
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <GithubLogo />
        </nav>
      </div>
    </header>
  );
}
