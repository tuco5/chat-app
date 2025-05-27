import Image from "next/image";

export default function Logo() {
  return (
    <a
      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
      href="https://docs.google.com/document/d/1NpeteBEWAG8Q3rHnWvsl00yOnUflLNceTitfstbY6OE/edit?usp=sharing"
      target="_blank"
      title="Sellia Code Challenge"
    >
      <div className="flex gap-1 items-baseline italic font-bold text-3xl">
        <Image
          src="/logo.png"
          alt="Sellia Logo"
          width={128}
          height={40}
          className="h-10 w-auto"
        />
        <p>sellia</p>
      </div>
      <p className="text-sm font-mono text-muted-foreground">code challenge</p>
    </a>
  );
}
