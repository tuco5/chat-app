import Image from "next/image";

export default function Logo() {
  return (
    <a
      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
      href="https://docs.google.com/document/d/1NpeteBEWAG8Q3rHnWvsl00yOnUflLNceTitfstbY6OE/edit?usp=sharing"
      target="_blank"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="h-10 w-auto"
      />
      <span className="text-sm font-mono text-muted-foreground">
        code challenge
      </span>
    </a>
  );
}
