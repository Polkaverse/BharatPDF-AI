import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "Hindi OCR & English OCR Online - Scan Image to Text Free | PDF Studio",
  description: "Extract text from scanned images and PDFs online. High-accuracy OCR supporting English, Hindi (Devanagari), Chinese, and German client-side.",
  keywords: [
    "hindi ocr online",
    "english ocr online",
    "scan image to text devanagari",
    "german ocr tool",
    "chinese ocr app browser",
    "free tesseract ocr client-side"
  ],
  openGraph: {
    title: "Hindi OCR & English OCR Online - Scan Image to Text Free | PDF Studio",
    description: "Extract text from scanned images and PDFs online. High-accuracy OCR supporting English, Hindi (Devanagari), Chinese, and German client-side.",
    url: "https://pdfstudio.site/tools/ocr",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindi OCR & English OCR Online - Scan Image to Text Free | PDF Studio",
    description: "Extract text from scanned images and PDFs online. High-accuracy OCR supporting English, Hindi (Devanagari), Chinese, and German client-side.",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Studio OCR",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Extract text from screenshots, scanned receipts, and PDFs with client-side OCR supporting Hindi Devanagari, English, German, and Chinese."
          })
        }}
      />
      <MvpShell initialTab="ocr" />
    </>
  );
}
