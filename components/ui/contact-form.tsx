"use client";

import { useState } from "react";
import { profile } from "@/lib/portfolio-data";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message
    ].join("\n");

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject || "Portfolio Inquiry"
    )}&body=${encodeURIComponent(body)}`;

    setStatus("Launching your email client.");
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-slate-400">
            Name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-white/10"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-slate-400">
            Email
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-white/10"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-slate-400">
          Subject
        </span>
        <input
          required
          value={form.subject}
          onChange={(event) =>
            setForm((current) => ({ ...current, subject: event.target.value }))
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-white/10"
          placeholder="Project collaboration"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-slate-400">
          Message
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/40 focus:bg-white/10"
          placeholder="Tell me about the infrastructure, delivery, or automation problem you're solving."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="glow-button">
          Send message
        </button>
        <p className="text-sm text-slate-400">
          Form launches your configured email client.
        </p>
      </div>

      {status ? <p className="text-sm text-accent">{status}</p> : null}
    </form>
  );
}
