import Image from "next/image";
import Link from "next/link";

export function CodeChallengeLogo() {
  return (
    <a
      className="flex flex-col items-center justify-center cursor-pointer"
      href="https://docs.google.com/document/d/1NpeteBEWAG8Q3rHnWvsl00yOnUflLNceTitfstbY6OE/edit?usp=sharing"
      target="_blank"
      title="Sellia Code Challenge"
    >
      <div className="flex gap-1 items-baseline">
        <Image
          src="/logo.png"
          alt="Sellia Logo"
          height={24}
          width={24}
          className="h-6 w-6 lg:h-10 lg:w-10 flex-shrink-0"
          loading="eager"
          priority
        />
        <p className=" italic font-bold text-2xl lg:text-3xl">
          sellia
        </p>
      </div>
      <p className="text-xs lg:text-sm font-mono text-muted-foreground">
        code challenge
      </p>
    </a>
  );
}

export function SelliaLogo() {
  return (
    <Link
      href="/"
      className="pl-1 flex gap-2 items-baseline cursor-pointer overflow-hidden"
    >
      <Image
        src="/logo.png"
        alt="Sellia Logo"
        height={24}
        width={24}
        className="h-6 w-6 flex-shrink-0 self-center"
        loading="eager"
        priority
      />
      <p className=" italic font-bold text-xl">sellia</p>
    </Link>
  );
}
