import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Pavan Teeparty | DevOps & Cloud Engineer',
  description:
    'DevOps Engineer specializing in cloud infrastructure automation, CI/CD pipelines, and production reliability across AWS and Azure.',
  keywords: 'DevOps Engineer, Cloud Infrastructure, AWS, Azure, Terraform, CI/CD, Kubernetes, SRE',
  authors: [{ name: 'Pavan Teeparty' }],
  openGraph: {
    title: 'Pavan Teeparty | DevOps & Cloud Engineer',
    description: 'Building infrastructure that never sleeps — automation, reliability, and cloud-native solutions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <div className="noise-overlay" aria-hidden="true" />
        <main className="siteMain">{children}</main>
      </body>
    </html>
  );
}
