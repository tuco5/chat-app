export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-25 border-t border-muted bg-sidebar/60 mt-auto">
      <div className="flex items-center justify-between p-2 w-full max-w-6xl">
        &copy; 2025 Sellia. All rights reserved.
      </div>

      <a
        href="https://www.linkedin.com/in/tuco5/"
        className="text-blue-400 hover:dark:text-blue-300 transition-all duration-300 hover:text-blue-500"
      >
        @tuco5
      </a>
    </footer>
  );
}
