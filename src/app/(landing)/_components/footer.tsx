export default function Footer() {
  return (
    <footer className="flex justify-between items-center h-25 border-t border-muted bg-sidebar/60 mt-auto p-2">
      <div className="flex flex-col md:flex-row md:items-center items-start gap-2">
        <p>&copy; 2025 Sellia.</p>
        <p>All rights reserved.</p>
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
