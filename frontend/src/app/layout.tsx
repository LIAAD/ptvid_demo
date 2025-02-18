import { Roboto, Nunito } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'PtVId',
  description: 'Identify whether a text is written in European Portuguese and Brazilian Portuguese',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${nunito.variable} font-roboto`}>
        {children}
      </body>
    </html>
  );
} 