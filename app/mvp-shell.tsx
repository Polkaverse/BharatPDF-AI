"use client";

import { useMemo, useState } from "react";

type TaskId = "compress" | "ocr" | "summary" | "translate" | "template" | "sign";
type ProcessingStage = "uploading" | "cleaning" | "reading" | "generating" | "completed";
type TemplateId = "invoice" | "resume" | "quotation";
type SignatureMode = "self" | "request";

type Task = {
  id: TaskId;
  label: string;
  detail: string;
  eta: string;
  retention: string;
  formats: string;
};

type FileCard = {
  name: string;
  size: string;
  progress: number;
  status: "ready" | "uploading" | "scanned";
};

type TemplateDraft = {
  clientName: string;
  amount: string;
  city: string;
  role: string;
};

const tasks: Task[] = [
  {
    id: "compress",
    label: "Quick PDF",
    detail: "Compress, merge, split, or convert without login.",
    eta: "Usually under 30 seconds",
    retention: "Auto-delete in 24 hours",
    formats: "PDF, JPG, PNG",
  },
  {
    id: "ocr",
    label: "Scan to Text",
    detail: "Hindi and English OCR with searchable PDF export.",
    eta: "1-3 minutes",
    retention: "Auto-delete in 24 hours",
    formats: "PDF, JPG, PNG",
  },
  {
    id: "summary",
    label: "Summarize",
    detail: "Extract key points, action items, and clean notes.",
    eta: "1-2 minutes",
    retention: "Auto-delete in 24 hours",
    formats: "PDF",
  },
  {
    id: "translate",
    label: "Translate",
    detail: "Switch between English and Hindi with copy-ready output.",
    eta: "1-2 minutes",
    retention: "Auto-delete in 24 hours",
    formats: "PDF",
  },
  {
    id: "template",
    label: "Create from Template",
    detail: "Generate invoices, resumes, quotations, and other common forms.",
    eta: "2-4 minutes",
    retention: "Save only after download",
    formats: "PDF export",
  },
  {
    id: "sign",
    label: "Send and Sign",
    detail: "Self-sign immediately or request signatures with expiry controls.",
    eta: "2-5 minutes",
    retention: "Share links expire in 15 minutes",
    formats: "PDF",
  },
];

const stageOrder: ProcessingStage[] = [
  "uploading",
  "cleaning",
  "reading",
  "generating",
  "completed",
];

const stageCopy: Record<
  ProcessingStage,
  { title: string; helper: string; progress: number }
> = {
  uploading: {
    title: "Uploading files over a resilient mobile-safe channel",
    helper: "You can keep this tab open in the background while upload continues.",
    progress: 18,
  },
  cleaning: {
    title: "Checking file type, scan safety, and PDF structure",
    helper: "Every upload stays private until malware and file validation succeed.",
    progress: 41,
  },
  reading: {
    title: "Reading text from page 2 of 4",
    helper: "OCR is running in an isolated worker so the web app stays responsive.",
    progress: 66,
  },
  generating: {
    title: "Preparing translated text, summary, and searchable PDF",
    helper: "Generated outputs use short-lived download links only.",
    progress: 86,
  },
  completed: {
    title: "Outputs are ready to review, edit, and download",
    helper: "Files remain available for 24 hours unless you delete them sooner.",
    progress: 100,
  },
};

const fileCards: FileCard[] = [
  { name: "rent-agreement-scan.pdf", size: "4.2 MB", progress: 100, status: "scanned" },
  { name: "aadhaar-front.jpg", size: "1.1 MB", progress: 74, status: "uploading" },
  { name: "quotation-draft.pdf", size: "860 KB", progress: 100, status: "ready" },
];

const templateChoices: Record<
  TemplateId,
  { title: string; useCase: string; duration: string; language: string }
> = {
  invoice: {
    title: "Invoice",
    useCase: "Freelancers and small shops sending GST-ready billing.",
    duration: "3 min",
    language: "English + Hindi",
  },
  resume: {
    title: "Resume",
    useCase: "Job-ready profile with concise role summary.",
    duration: "4 min",
    language: "English",
  },
  quotation: {
    title: "Quotation",
    useCase: "Fast customer quote with totals and terms.",
    duration: "3 min",
    language: "English + Hindi",
  },
};

const ocrParagraphs = [
  {
    id: "p1",
    source: "Page 1, upper block",
    confidence: "High confidence",
    original:
      "Tenant agrees to pay monthly rent of Rs. 18,000 by the fifth day of each month.",
    translated:
      "Kirayedar pratyek mahine ki paanch tareekh tak Rs. 18,000 kiraya dene ke liye sahamat hai.",
  },
  {
    id: "p2",
    source: "Page 2, stamp area",
    confidence: "Review suggested",
    original:
      "Electricity charges will be paid separately based on meter reading and society notice.",
    translated:
      "Bijli ke shulk alag se meter reading aur society notice ke aadhar par bhare jayenge.",
  },
  {
    id: "p3",
    source: "Page 3, signature line",
    confidence: "High confidence",
    original: "Both parties acknowledge receipt of one signed copy.",
    translated: "Dono paksh ek signed copy prapt hone ki pushti karte hain.",
  },
];

const securityBullets = [
  "Uploads enter a private quarantine area before OCR, AI, or PDF transforms start.",
  "Processing runs in separate worker queues for scan, PDF, OCR, AI, and signing workloads.",
  "Anonymous files default to 24-hour retention with short-lived download links.",
  "Only signed URLs leave the system; raw object paths are never shown to the user.",
];

export function MvpShell() {
  const [selectedTask, setSelectedTask] = useState<TaskId>("ocr");
  const [currentStage, setCurrentStage] = useState<ProcessingStage>("reading");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("invoice");
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("self");
  const [activeParagraphId, setActiveParagraphId] = useState("p2");
  const [showTranslation, setShowTranslation] = useState(true);
  const [templateDraft, setTemplateDraft] = useState<TemplateDraft>({
    clientName: "Sharma Traders",
    amount: "18,500",
    city: "Jaipur",
    role: "Operations Executive",
  });

  const selectedTaskDetails = tasks.find((task) => task.id === selectedTask) ?? tasks[0];
  const activeStage = stageCopy[currentStage];
  const activeParagraph = ocrParagraphs.find((paragraph) => paragraph.id === activeParagraphId)
    ?? ocrParagraphs[0];

  const templatePreview = useMemo(() => {
    if (selectedTemplate === "invoice") {
      return `Invoice for ${templateDraft.clientName}\nAmount due: Rs. ${templateDraft.amount}\nIssued from ${templateDraft.city}`;
    }

    if (selectedTemplate === "resume") {
      return `${templateDraft.clientName}\nTarget role: ${templateDraft.role}\nLocation: ${templateDraft.city}`;
    }

    return `Quotation for ${templateDraft.clientName}\nEstimated total: Rs. ${templateDraft.amount}\nPrepared in ${templateDraft.city}`;
  }, [selectedTemplate, templateDraft]);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">BharatPDF AI MVP</p>
          <h1>Finish a PDF task first. Decide on an account later.</h1>
          <p className="lede">
            A mobile-first utility for scan cleanup, OCR, summary, translation,
            template creation, and lightweight signing with visible privacy controls.
          </p>
          <div className="trust-strip" aria-label="Trust signals">
            <span>No login for basic tools</span>
            <span>Files auto-delete after processing</span>
            <span>Low-bandwidth upload progress</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="task-tabs" role="tablist" aria-label="Primary tasks">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                role="tab"
                aria-selected={selectedTask === task.id}
                className={selectedTask === task.id ? "task-tab active" : "task-tab"}
                onClick={() => setSelectedTask(task.id)}
              >
                {task.label}
              </button>
            ))}
          </div>

          <div className="upload-panel">
            <div>
              <p className="section-kicker">Selected task</p>
              <h2>{selectedTaskDetails.label}</h2>
              <p>{selectedTaskDetails.detail}</p>
            </div>

            <div className="cta-row">
              <button type="button" className="primary-cta">
                Upload file
              </button>
              <button type="button" className="secondary-cta">
                Scan with camera
              </button>
            </div>

            <dl className="upload-meta">
              <div>
                <dt>Formats</dt>
                <dd>{selectedTaskDetails.formats}</dd>
              </div>
              <div>
                <dt>ETA</dt>
                <dd>{selectedTaskDetails.eta}</dd>
              </div>
              <div>
                <dt>Retention</dt>
                <dd>{selectedTaskDetails.retention}</dd>
              </div>
            </dl>

            <div className="file-grid">
              {fileCards.map((file) => (
                <article key={file.name} className="file-card">
                  <div className="file-card-header">
                    <div>
                      <h3>{file.name}</h3>
                      <p>{file.size}</p>
                    </div>
                    <span className={`status-pill ${file.status}`}>{file.status}</span>
                  </div>
                  <div className="progress-bar" aria-hidden="true">
                    <span style={{ width: `${file.progress}%` }} />
                  </div>
                  <div className="file-actions">
                    <button type="button">Retry</button>
                    <button type="button">Remove</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="surface-card">
          <div className="card-header">
            <div>
              <p className="section-kicker">Processing status</p>
              <h2>Show real backend stages, not fake loaders</h2>
            </div>
            <div className="segmented">
              {stageOrder.map((stage) => (
                <button
                  key={stage}
                  type="button"
                  className={currentStage === stage ? "segment active" : "segment"}
                  onClick={() => setCurrentStage(stage)}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div className="timeline-panel">
            <div className="timeline-copy">
              <strong>{activeStage.title}</strong>
              <p>{activeStage.helper}</p>
            </div>
            <div className="meter" aria-label={`Progress ${activeStage.progress}%`}>
              <span style={{ width: `${activeStage.progress}%` }} />
            </div>
            <ul className="timeline-list">
              <li>Uploading files immediately after selection</li>
              <li>Failing closed when scan service or validation is unavailable</li>
              <li>Issuing signed downloads only after clean processing completes</li>
            </ul>
          </div>
        </article>

        <article className="surface-card">
          <div className="card-header stacked">
            <div>
              <p className="section-kicker">OCR review</p>
              <h2>Source preview linked to editable extracted text</h2>
            </div>
            <div className="toggle-row">
              <button
                type="button"
                className={!showTranslation ? "segment active" : "segment"}
                onClick={() => setShowTranslation(false)}
              >
                Original
              </button>
              <button
                type="button"
                className={showTranslation ? "segment active" : "segment"}
                onClick={() => setShowTranslation(true)}
              >
                Translated
              </button>
            </div>
          </div>

          <div className="ocr-layout">
            <div className="scan-preview">
              <div className="scan-page">
                <span className="scan-chip">Page-linked preview</span>
                <p>Tap any region to focus the matching OCR paragraph.</p>
                <button type="button" onClick={() => setActiveParagraphId("p1")}>
                  Header clause
                </button>
                <button type="button" onClick={() => setActiveParagraphId("p2")}>
                  Meter note
                </button>
                <button type="button" onClick={() => setActiveParagraphId("p3")}>
                  Signature line
                </button>
              </div>
            </div>

            <div className="ocr-editor">
              <div className="ocr-toolbar">
                <span className="status-pill scanned">{activeParagraph.confidence}</span>
                <span className="status-pill ready">{activeParagraph.source}</span>
              </div>
              <textarea
                value={showTranslation ? activeParagraph.translated : activeParagraph.original}
                readOnly
                aria-label="Extracted text"
              />
              <div className="action-row">
                <button type="button" className="secondary-cta">
                  Copy text
                </button>
                <button type="button" className="secondary-cta">
                  Download searchable PDF
                </button>
                <button type="button" className="primary-cta">
                  Generate summary
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="surface-card">
          <div className="card-header">
            <div>
              <p className="section-kicker">Template generation</p>
              <h2>Intent-led forms with live preview after the first answer</h2>
            </div>
          </div>

          <div className="template-grid">
            <div className="template-choices">
              {(Object.entries(templateChoices) as [TemplateId, typeof templateChoices[TemplateId]][])
                .map(([id, template]) => (
                  <button
                    key={id}
                    type="button"
                    className={selectedTemplate === id ? "template-card active" : "template-card"}
                    onClick={() => setSelectedTemplate(id)}
                  >
                    <strong>{template.title}</strong>
                    <span>{template.useCase}</span>
                    <small>{template.duration} • {template.language}</small>
                  </button>
                ))}
            </div>

            <form className="template-form">
              <label>
                Client or candidate name
                <input
                  value={templateDraft.clientName}
                  onChange={(event) =>
                    setTemplateDraft((current) => ({
                      ...current,
                      clientName: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Amount or current CTC
                <input
                  value={templateDraft.amount}
                  onChange={(event) =>
                    setTemplateDraft((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                City
                <input
                  value={templateDraft.city}
                  onChange={(event) =>
                    setTemplateDraft((current) => ({
                      ...current,
                      city: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Role or service label
                <input
                  value={templateDraft.role}
                  onChange={(event) =>
                    setTemplateDraft((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                />
              </label>
            </form>

            <div className="template-preview">
              <p className="section-kicker">Live preview</p>
              <pre>{templatePreview}</pre>
              <div className="action-row">
                <button type="button" className="primary-cta">
                  Download PDF
                </button>
                <button type="button" className="secondary-cta">
                  Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </article>

        <article className="surface-card">
          <div className="card-header">
            <div>
              <p className="section-kicker">Signature flow</p>
              <h2>Separate self-sign from request-signature complexity</h2>
            </div>
            <div className="segmented">
              <button
                type="button"
                className={signatureMode === "self" ? "segment active" : "segment"}
                onClick={() => setSignatureMode("self")}
              >
                Sign yourself
              </button>
              <button
                type="button"
                className={signatureMode === "request" ? "segment active" : "segment"}
                onClick={() => setSignatureMode("request")}
              >
                Request signature
              </button>
            </div>
          </div>

          <div className="signature-layout">
            <div className="signature-panel">
              {signatureMode === "self" ? (
                <>
                  <h3>Self-sign now</h3>
                  <ul className="timeline-list">
                    <li>Draw, type, or upload a signature mark</li>
                    <li>Place it visually on the page with date and name fields</li>
                    <li>Download the signed PDF with a simple certificate summary</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>Request signatures</h3>
                  <ul className="timeline-list">
                    <li>Add recipient name plus WhatsApp number or email</li>
                    <li>Set expiry and reminders only when the flow needs them</li>
                    <li>Explain visual signature vs OTP-confirmed vs provider-backed eSign</li>
                  </ul>
                </>
              )}
            </div>

            <div className="signature-strength">
              <h3>Legal-strength explainer</h3>
              <div className="strength-list">
                <article>
                  <strong>Visual signature</strong>
                  <p>Fast for internal approvals and lightweight acknowledgements.</p>
                </article>
                <article>
                  <strong>OTP-confirmed signature</strong>
                  <p>Better identity assurance for remote approvals.</p>
                </article>
                <article>
                  <strong>Provider-backed eSign</strong>
                  <p>Reserved for deeper regulated workflows outside the MVP path.</p>
                </article>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="surface-card">
          <p className="section-kicker">Security baseline in product language</p>
          <h2>Trust copy backed by actual runtime decisions</h2>
          <ul className="timeline-list">
            {securityBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="surface-card">
          <p className="section-kicker">Release-ready verification targets</p>
          <h2>Smallest checks that should stay true as backend work lands</h2>
          <ul className="timeline-list">
            <li>Clean upload reaches a scan pass and exposes a signed download path</li>
            <li>Rejected upload fails closed with retry guidance instead of bypassing scan</li>
            <li>Expired artifacts disappear and the UI makes the retention window explicit</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
