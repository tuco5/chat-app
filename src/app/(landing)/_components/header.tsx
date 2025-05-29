import GithubLogo from "@/components/layout/github-logo";
import { CodeChallengeLogo } from "@/components/layout/sellia-logo";
import ThemeToggle from "@/components/layout/theme-toggle";

export default function Header() {
  return (
    <header className="w-full flex justify-center items-center h-20 border-b border-muted bg-sidebar">
      <div className="flex items-center justify-between w-full max-w-6xl px-4">
        <CodeChallengeLogo />
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <GithubLogo />
        </nav>
      </div>
    </header>
  );
}
