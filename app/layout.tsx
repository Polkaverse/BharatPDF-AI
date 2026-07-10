import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatPDF AI - Free PDF Tools, Hindi OCR, eSign & Document Templates",
  description: "Free online PDF utilities built for India. Perform PDF merge, split, rotate, and compression. Run high-accuracy English & Hindi OCR scanner. Legally sign documents under the IT Act 2000 and build GST Invoices or Rent Agreements instantly.",
  keywords: [
    "BharatPDF", 
    "Bharat PDF", 
    "free PDF tools India", 
    "Hindi OCR", 
    "Devanagari OCR online", 
    "eSign India", 
    "IT Act 2000 signature", 
    "GST Invoice PDF generator", 
    "Rent Agreement maker",
    "Tamil OCR scanner", 
    "Telugu OCR online", 
    "free PDF compress online", 
    "WhatsApp PDF share"
  ],
  authors: [{ name: "Pankaj Chaudhary" }],
  openGraph: {
    title: "BharatPDF AI - Free PDF Tools, Hindi OCR, eSign & Document Templates",
    description: "Secure, local, and legally-binding PDF utilities tailored for Indian MSMEs, students, and professionals.",
    url: "https://bharatpdf-ai.vercel.app",
    siteName: "BharatPDF AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BharatPDF AI - Secure Indian PDF Utility Suite",
    description: "Run English/Hindi OCR, merge/split PDFs, sign documents legally under IT Act, and generate GST invoices on the fly.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Structured Data for Google/Bing SEO ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "BharatPDF AI",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "description": "Free online PDF utilities, English & Hindi Devanagari OCR, eSign under IT Act 2000, and GST invoice/rent agreement generation.",
              "publisher": {
                "@type": "Organization",
                "name": "BharatPDF AI"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
