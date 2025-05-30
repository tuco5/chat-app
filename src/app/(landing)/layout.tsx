import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Sellia | Chat App",
  description: "Sellia Code Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="min-h-[90vh]">{children}</div>
      <Footer />
    </main>
  );
}
