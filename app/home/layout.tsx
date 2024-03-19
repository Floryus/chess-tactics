import "./globals.css";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  );
}
