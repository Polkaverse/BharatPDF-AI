import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "Merge PDF Online - Combine Multiple PDF Files Free | PDF Studio",
  description: "Combine multiple PDF documents into a single PDF file online for free. Drag or reorder files easily. 100% private client-side processing.",
  keywords: [
    "merge pdf",
    "combine pdf files",
    "join pdf documents",
    "free pdf merger",
    "pdf combiner online",
    "local browser pdf combine"
  ],
  openGraph: {
    title: "Merge PDF Online - Combine Multiple PDF Files Free | PDF Studio",
    description: "Combine multiple PDF documents into a single PDF file online for free. Drag or reorder files easily. 100% private client-side processing.",
    url: "https://pdfstudio.site/tools/merge-pdf",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Online - Combine Multiple PDF Files Free | PDF Studio",
    description: "Combine multiple PDF documents into a single PDF file online for free. Drag or reorder files easily. 100% private client-side processing.",
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
            "name": "How to Merge PDF Files Online",
            "description": "Step-by-step guide to combine multiple PDF documents into a single file online for free.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload PDF Files",
                "text": "Select and upload two or more PDF files you wish to merge."
              },
              {
                "@type": "HowToStep",
                "name": "Arrange Order",
                "text": "Use the visual up and down arrows to arrange the files in the correct sequence."
              },
              {
                "@type": "HowToStep",
                "name": "Merge & Download",
                "text": "Click 'Execute MERGE' to combine the documents and download the merged PDF."
              }
            ]
          })
        }}
      />
      <MvpShell initialTab="utilities" initialUtility="merge" />
    </>
  );
}
