import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h2>Government Tender Portal</h2>
          <nav>
            <Link href="/">Home</Link> |{" "}
            <Link href="/add-tender">Add Tender</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}