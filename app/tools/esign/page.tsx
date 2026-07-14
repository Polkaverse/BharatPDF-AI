import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "eSign PDF Online - Free Digital Signature Maker | PDF Studio",
  description: "Sign PDF documents online for free. Draw, type, or upload transparent signatures. Visual click-to-place board is legally compliant with IT Act 2000.",
  keywords: [
    "esign pdf",
    "digital signature free",
    "electronic signature online",
    "sign pdf documents",
    "IT Act 2000 audit signature",
    "click to place signature pdf"
  ],
  openGraph: {
    title: "eSign PDF Online - Free Digital Signature Maker | PDF Studio",
    description: "Sign PDF documents online for free. Draw, type, or upload transparent signatures. Visual click-to-place board is legally compliant with IT Act 2000.",
    url: "https://pdfstudio.site/tools/esign",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eSign PDF Online - Free Digital Signature Maker | PDF Studio",
    description: "Sign PDF documents online for free. Draw, type, or upload transparent signatures. Visual click-to-place board is legally compliant with IT Act 2000.",
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
            "name": "PDF Studio eSign",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Legally sign PDF documents online with visual click placement, transparent signatures, and audit logs."
          })
        }}
      />
      <MvpShell initialTab="esign" />
    </>
  );
}
