import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "Split PDF Online - Free Visual PDF Page Extractor | PDF Studio",
  description: "Extract specific pages from your PDF documents visually for free. Select pages using our interactive grid. Secure local processing in your browser.",
  keywords: [
    "split pdf",
    "extract pages from pdf",
    "free pdf splitter",
    "visual page extractor",
    "pdf-lib split online",
    "local browser pdf split"
  ],
  openGraph: {
    title: "Split PDF Online - Free Visual PDF Page Extractor | PDF Studio",
    description: "Extract specific pages from your PDF documents visually for free. Select pages using our interactive grid. Secure local processing in your browser.",
    url: "https://pdfstudio.site/tools/split-pdf",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online - Free Visual PDF Page Extractor | PDF Studio",
    description: "Extract specific pages from your PDF documents visually for free. Select pages using our interactive grid. Secure local processing in your browser.",
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
            "@type": "HowTo",
            "name": "How to Split PDF Pages Online",
            "description": "Step-by-step guide to visually extract specific pages from your PDF document online for free.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload PDF",
                "text": "Choose or drag and drop your PDF file into the PDF Studio splitter utility."
              },
              {
                "@type": "HowToStep",
                "name": "Select Pages Visually",
                "text": "Click on individual page preview cards on the interactive grid to select pages you want to extract."
              },
              {
                "@type": "HowToStep",
                "name": "Download Split PDF",
                "text": "Click 'Execute SPLIT' to download your extracted pages as a new PDF file."
              }
            ]
          })
        }}
      />
      <MvpShell initialTab="utilities" initialUtility="split" />
    </>
  );
}
