import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "Rotate PDF Online - Visually Spin Individual PDF Pages | PDF Studio",
  description: "Rotate individual pages within your PDF document online for free. Click cards to visually spin pages 90, 180, or 270 degrees. Private and local.",
  keywords: [
    "rotate pdf",
    "spin pdf pages",
    "fix upside down pdf",
    "free pdf rotator",
    "visual page rotation",
    "client-side pdf page rotation"
  ],
  openGraph: {
    title: "Rotate PDF Online - Visually Spin Individual PDF Pages | PDF Studio",
    description: "Rotate individual pages within your PDF document online for free. Click cards to visually spin pages 90, 180, or 270 degrees. Private and local.",
    url: "https://pdfstudio.site/tools/rotate-pdf",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Online - Visually Spin Individual PDF Pages | PDF Studio",
    description: "Rotate individual pages within your PDF document online for free. Click cards to visually spin pages 90, 180, or 270 degrees. Private and local.",
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
            "name": "How to Rotate PDF Pages Online",
            "description": "Step-by-step guide to visually spin individual pages in your PDF document online for free.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload PDF",
                "text": "Upload the PDF document containing pages you want to rotate."
              },
              {
                "@type": "HowToStep",
                "name": "Click Page Cards to Rotate",
                "text": "Click on specific page thumbnails to rotate them 90 degrees clockwise in the browser preview."
              },
              {
                "@type": "HowToStep",
                "name": "Save Rotated PDF",
                "text": "Click 'Execute ROTATE' to save and download the updated PDF file with custom page angles."
              }
            ]
          })
        }}
      />
      <MvpShell initialTab="utilities" initialUtility="rotate" />
    </>
  );
}
