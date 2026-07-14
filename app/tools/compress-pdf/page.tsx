import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "Compress PDF Online - Reduce PDF File Size Free | PDF Studio",
  description: "Shrink the file size of your PDF documents online for free. Set Low, Medium, or High compression levels. Runs 100% locally in your browser.",
  keywords: [
    "compress pdf",
    "reduce pdf size",
    "shrink pdf file",
    "free pdf compressor",
    "optimize pdf online",
    "local browser pdf compression"
  ],
  openGraph: {
    title: "Compress PDF Online - Reduce PDF File Size Free | PDF Studio",
    description: "Shrink the file size of your PDF documents online for free. Set Low, Medium, or High compression levels. Runs 100% locally in your browser.",
    url: "https://pdfstudio.site/tools/compress-pdf",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online - Reduce PDF File Size Free | PDF Studio",
    description: "Shrink the file size of your PDF documents online for free. Set Low, Medium, or High compression levels. Runs 100% locally in your browser.",
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
            "name": "How to Compress PDF Size Online",
            "description": "Step-by-step guide to shrink PDF file size inside your local web browser.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload PDF",
                "text": "Select and upload the PDF file you wish to compress."
              },
              {
                "@type": "HowToStep",
                "name": "Choose Compression Level",
                "text": "Select between Low, Medium, or High compression settings to balance quality and file size."
              },
              {
                "@type": "HowToStep",
                "name": "Download Compressed PDF",
                "text": "Click 'Execute COMPRESS' to optimize file assets and download the smaller file."
              }
            ]
          })
        }}
      />
      <MvpShell initialTab="utilities" initialUtility="compress" />
    </>
  );
}
