"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MoreHorizontal,
  PanelLeft,
  Printer,
  QrCode,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  X,
} from "lucide-react";

type JobStatus = "Awaiting approval" | "Printing" | "Completed" | "Failed";

type Job = {
  id: string;
  file: string;
  customer: string;
  pages: number;
  mode: string;
  copies: number;
  amount: number;
  status: JobStatus;
  time: string;
  tone: string;
};

const initialJobs: Job[] = [
  { id: "#1832", file: "resume-anthony.pdf", customer: "Walk-in customer", pages: 12, mode: "B&W · Duplex", copies: 1, amount: 24, status: "Awaiting approval", time: "2 min ago", tone: "amber" },
  { id: "#1831", file: "visa-application.pdf", customer: "Walk-in customer", pages: 6, mode: "Colour · Single", copies: 2, amount: 120, status: "Printing", time: "4 min ago", tone: "blue" },
  { id: "#1830", file: "college-form.pdf", customer: "Walk-in customer", pages: 4, mode: "B&W · Single", copies: 1, amount: 8, status: "Completed", time: "11 min ago", tone: "green" },
  { id: "#1829", file: "passport-scan.jpg", customer: "Walk-in customer", pages: 2, mode: "Colour · Single", copies: 1, amount: 20, status: "Completed", time: "18 min ago", tone: "green" },
  { id: "#1828", file: "address-proof.pdf", customer: "Walk-in customer", pages: 3, mode: "B&W · Duplex", copies: 1, amount: 6, status: "Failed", time: "32 min ago", tone: "red" },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Print queue", icon: FolderOpen, count: 3 },
  { label: "Job history", icon: Clock3 },
];

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function Home() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeNav, setActiveNav] = useState("Overview");
  const [filter, setFilter] = useState<"All jobs" | JobStatus>("All jobs");
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toast, setToast] = useState("");

  const filteredJobs = useMemo(
    () => filter === "All jobs" ? jobs : jobs.filter((job) => job.status === filter),
    [filter, jobs],
  );

  const updateJob = (id: string, status: JobStatus) => {
    setJobs((current) => current.map((job) => job.id === id ? { ...job, status, tone: status === "Completed" ? "green" : status === "Failed" ? "red" : "blue" } : job));
    setToast(status === "Completed" ? "Print job sent to the agent" : "Job rejected and customer notified");
    window.setTimeout(() => setToast(""), 2600);
  };

  const createJob = () => {
    if (!selectedFile) return;
    const newJob: Job = {
      id: `#${1833 + jobs.length - initialJobs.length}`,
      file: selectedFile.name,
      customer: "New customer",
      pages: 1,
      mode: "B&W · Single",
      copies: 1,
      amount: 2,
      status: "Awaiting approval",
      time: "Just now",
      tone: "amber",
    };
    setJobs((current) => [newJob, ...current]);
    setSelectedFile(null);
    setIsNewJobOpen(false);
    setToast("New print job added to the queue");
    window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-mark"><Printer size={20} strokeWidth={2.6} /></div><div><strong>print<span>doc</span></strong><small>shop console</small></div></div>
        <div className="shop-switcher"><div className="shop-avatar">SX</div><div className="shop-name"><strong>Sai Xerox</strong><span>Mapusa, Goa</span></div><ChevronDown size={16} /></div>
        <p className="nav-label">Workspace</p>
        <nav className="main-nav" aria-label="Main navigation">{navItems.map(({ label, icon: Icon, count }) => <button className={activeNav === label ? "nav-item active" : "nav-item"} key={label} onClick={() => setActiveNav(label)}><Icon size={18} /> <span>{label}</span>{count && <b>{count}</b>}</button>)}</nav>
        <p className="nav-label settings-label">Manage</p>
        <nav className="main-nav" aria-label="Management navigation"><button className="nav-item" onClick={() => setToast("Pricing settings are ready to configure")}><SlidersHorizontal size={18} /> <span>Pricing</span></button><button className="nav-item" onClick={() => setToast("QR code panel opened")}><QrCode size={18} /> <span>Shop QR code</span></button><button className="nav-item" onClick={() => setToast("Settings are coming next")}><Settings2 size={18} /> <span>Settings</span></button></nav>
        <div className="sidebar-bottom"><div className="agent-status"><span className="status-dot online" /><div><strong>Print agent online</strong><span>HP LaserJet Pro · Ready</span></div><Activity size={17} /></div><div className="user-profile"><div className="user-avatar">SK</div><div><strong>Sai Khanolkar</strong><span>Shop administrator</span></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><button className="mobile-menu" aria-label="Open navigation"><PanelLeft size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>{activeNav}</strong></div><div className="topbar-actions"><div className="connection-pill"><span className="status-dot online" /> Agent connected</div><button className="icon-button" aria-label="Notifications"><Bell size={19} /><i /></button><button className="help-button"><CircleHelp size={17} /> Help centre</button></div></header>
        <div className="page-content">
          <div className="page-heading"><div><p className="eyebrow">Wednesday, 24 September 2026</p><h1>Good morning, Sai</h1><p className="subheading">Here&apos;s what&apos;s moving through the shop today.</p></div><button className="primary-button" onClick={() => setIsNewJobOpen(true)}><Upload size={17} /> Add print job</button></div>
          <section className="stats-grid" aria-label="Print shop summary"><article className="stat-card"><div className="stat-icon warm"><Clock3 size={19} /></div><div><span>Awaiting approval</span><strong>{jobs.filter((job) => job.status === "Awaiting approval").length}</strong></div><em>Needs your eye</em></article><article className="stat-card"><div className="stat-icon cool"><Printer size={19} /></div><div><span>Printing now</span><strong>{jobs.filter((job) => job.status === "Printing").length}</strong></div><em className="positive">Agent is ready</em></article><article className="stat-card"><div className="stat-icon mint"><Check size={19} /></div><div><span>Completed today</span><strong>28</strong></div><em className="positive">+12% vs yesterday</em></article><article className="stat-card"><div className="stat-icon lilac"><span>₹</span></div><div><span>Today&apos;s revenue</span><strong>₹1,246</strong></div><em className="positive">+8.4% vs yesterday</em></article></section>
          <div className="workspace-grid">
            <section className="queue-panel"><div className="section-heading"><div><h2>Print queue</h2><p>Review incoming documents before they reach the printer.</p></div><button className="outline-button" onClick={() => setFilter("All jobs")}><Search size={16} /> Search</button></div><div className="queue-toolbar"><div className="filter-tabs">{(["All jobs", "Awaiting approval", "Printing", "Completed"] as const).map((item) => <button key={item} className={filter === item ? "filter-tab active" : "filter-tab"} onClick={() => setFilter(item)}>{item}{item === "Awaiting approval" && <b>{jobs.filter((job) => job.status === item).length}</b>}</button>)}</div><button className="more-filter" aria-label="More filters"><SlidersHorizontal size={16} /></button></div><div className="job-list">{filteredJobs.map((job) => <article className="job-row" key={job.id}><div className={`file-icon ${job.tone}`}><FileText size={20} /></div><div className="job-main"><div className="job-title"><strong>{job.file}</strong><span>{job.id}</span></div><p>{job.customer} <span>·</span> {job.pages} pages <span>·</span> {job.mode} <span>·</span> {job.copies} {job.copies === 1 ? "copy" : "copies"}</p></div><div className="job-status"><span className={`status-badge ${job.tone}`}><i />{job.status}</span><small>{job.time}</small></div><strong className="job-amount">{formatAmount(job.amount)}</strong><div className="job-actions">{job.status === "Awaiting approval" ? <><button className="approve-button" onClick={() => updateJob(job.id, "Completed")}><Check size={15} /> Approve</button><button className="reject-button" onClick={() => updateJob(job.id, "Failed")}><X size={15} /></button></> : <button className="row-more" aria-label={`More options for ${job.file}`}><MoreHorizontal size={18} /></button>}</div></article>)}{filteredJobs.length === 0 && <div className="empty-state"><FolderOpen size={24} /><strong>No jobs here</strong><span>The queue is clear for this status.</span></div>}</div><div className="panel-footer"><span>Showing {filteredJobs.length} of {jobs.length} jobs</span><button onClick={() => setActiveNav("Job history")}>View full history <span>→</span></button></div></section>
            <aside className="right-rail"><section className="rail-card agent-card"><div className="rail-heading"><h3>Print agent</h3><span className="live-label"><i /> Live</span></div><div className="printer-visual"><div className="printer-body"><div className="printer-top" /><div className="printer-slot" /><div className="paper-sheet" /></div><span className="signal signal-one" /><span className="signal signal-two" /></div><div className="printer-meta"><div><strong>HP LaserJet Pro M404</strong><span>USB · Default printer</span></div><button aria-label="Printer settings"><Settings2 size={17} /></button></div><div className="rail-divider" /><div className="agent-detail"><span>Last heartbeat</span><strong>Just now</strong></div><div className="agent-detail"><span>Jobs processed</span><strong>28 today</strong></div><button className="text-button" onClick={() => setToast("Printer settings are ready to configure")}>Manage printer <span>→</span></button></section><section className="rail-card qr-card"><div className="qr-copy"><span className="eyebrow">Customer entry point</span><h3>Your shop QR code</h3><p>Customers scan to upload documents from their phone.</p><button className="outline-button" onClick={() => setToast("QR code downloaded")}>Download QR <QrCode size={15} /></button></div><div className="qr-pattern" aria-label="Shop QR code"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></section><section className="rail-card pricing-card"><div className="rail-heading"><h3>Pricing snapshot</h3><button className="row-more" aria-label="Pricing options"><MoreHorizontal size={18} /></button></div><div className="price-line"><span>A4 · B&W · Single-sided</span><strong>₹2 <small>/ page</small></strong></div><div className="price-line"><span>A4 · B&W · Double-sided</span><strong>₹3 <small>/ sheet</small></strong></div><div className="price-line"><span>A4 · Colour</span><strong>₹10 <small>/ page</small></strong></div><button className="text-button" onClick={() => setActiveNav("Pricing")}>Edit pricing <span>→</span></button></section></aside>
          </div>
        </div>
      </section>

      {isNewJobOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsNewJobOpen(false)}><div className="job-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><p className="eyebrow">Manual intake</p><h2 id="modal-title">Add a print job</h2></div><button className="icon-button close-button" onClick={() => setIsNewJobOpen(false)} aria-label="Close"><X size={19} /></button></div><label className="upload-zone">{selectedFile ? <><FileText size={26} /><strong>{selectedFile.name}</strong><span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Ready to add</span></> : <><Upload size={26} /><strong>Choose a document</strong><span>PDF, JPG or PNG · up to 20 MB</span></>}<input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} /></label><div className="modal-options"><label>Paper size<select defaultValue="A4"><option>A4</option><option>A3</option></select></label><label>Colour<select defaultValue="Black & White"><option>Black & White</option><option>Colour</option></select></label><label>Copies<input type="number" min="1" max="100" defaultValue="1" /></label></div><div className="modal-footer"><span className="secure-note"><ShieldCheck size={15} /> Files auto-delete after printing</span><button className="primary-button" disabled={!selectedFile} onClick={createJob}>Add to queue <span>→</span></button></div></div></div>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </main>
  );
}

export function LegacyHome() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
