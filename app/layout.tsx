import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Wedding Show — סרטוני חתונה מותאמים אישית",
  description: "סרטוני AI, שירי חינה ומופעי פתיחה מותאמים אישית עם שמות החתן והכלה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
