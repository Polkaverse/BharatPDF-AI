import type { Metadata } from "next";
import { MvpShell } from "../../mvp-shell";

export const metadata: Metadata = {
  title: "GST Invoice & Rent Agreement Generator Online | PDF Studio",
  description: "Create professional GST billing invoices, legally vetted rental agreements, resumes, and HR offer letters in seconds. Save and download drafts.",
  keywords: [
    "gst invoice generator online",
    "rent agreement maker free",
    "professional resume builder",
    "hr offer letter template pdf",
    "create contract draft",
    "local draft editor pdf"
  ],
  openGraph: {
    title: "GST Invoice & Rent Agreement Generator Online | PDF Studio",
    description: "Create professional GST billing invoices, legally vetted rental agreements, resumes, and HR offer letters in seconds. Save and download drafts.",
    url: "https://pdfstudio.site/tools/invoice-generator",
    siteName: "PDF Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Invoice & Rent Agreement Generator Online | PDF Studio",
    description: "Create professional GST billing invoices, legally vetted rental agreements, resumes, and HR offer letters in seconds. Save and download drafts.",
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
            "name": "PDF Studio Document Creator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Generate GST-compliant billing invoices, lease agreements, standard resumes, and contract offer letters."
          })
        }}
      />
      <MvpShell initialTab="templates" />
    </>
  );
}
