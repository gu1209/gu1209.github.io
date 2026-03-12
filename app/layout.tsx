import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kris Gu | Finance & Technology Portfolio",
  description: "Personal portfolio of Kris Gu - Finance Master's student at Tianjin University specializing in quantitative analysis, LLM research, and financial data analytics.",
  keywords: ["Kris Gu", "顾杰", "Finance", "Quantitative Analysis", "LLM", "Python", "CPA", "Tianjin University", "Portfolio", "金融分析", "量化研究", "数据分析"],
  authors: [{ name: "Kris Gu" }],
  creator: "Kris Gu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gu1209.github.io",
    title: "Kris Gu | Finance & Technology Portfolio",
    description: "Finance Master's student at Tianjin University with expertise in quantitative analysis, LLM research, and financial data analytics.",
    siteName: "Kris Gu Portfolio",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
