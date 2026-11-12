import React from 'react';
import {
  Code2, Activity, Sparkles, BookOpen, ShoppingCart,
  CreditCard, BarChart3, Stethoscope, Users, ClipboardList
} from 'lucide-react';

export default function ProjectVisual({ type, screenshotUrl, title }) {
  if (screenshotUrl) {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <img
          src={screenshotUrl}
          alt={`${title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(to top, var(--bg-card), transparent)',
          }}
        />
      </div>
    );
  }

  if (type === 'umcao') {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-4 flex flex-col justify-between select-none transition-colors duration-300">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)] opacity-50" />
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] opacity-80" />
            <span className="ml-2 text-[10px] font-mono text-[var(--text-secondary)]">umcao-ast-analyzer</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] text-[10px] font-mono text-[var(--accent-primary)]">
            FastAPI + AST
          </span>
        </div>

        {/* Center Mockup */}
        <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
          <div className="col-span-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] p-2.5 font-mono text-[9px] text-[var(--text-secondary)] space-y-1 transition-colors duration-300">
            <div className="flex items-center justify-between text-[var(--text-primary)] pb-1 border-b border-[var(--border-color)]">
              <span className="flex items-center gap-1">
                <Code2 className="w-3 h-3 text-[var(--accent-primary)]" /> AST Check
              </span>
            </div>
            <p className="text-[var(--accent-primary)]">
              def <span className="text-[var(--text-primary)]">scan_items</span>(data):
            </p>
            <p className="pl-2 text-[var(--accent-secondary)]"># Inefficient nested loop</p>
            <p className="pl-2">for x in data: ...</p>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-[var(--text-primary)] bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-[var(--accent-secondary)]" />
              <span>Optimize to Set</span>
            </div>
          </div>

          <div className="col-span-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] p-2.5 flex flex-col justify-between transition-colors duration-300">
            <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-[var(--accent-primary)]" /> Metrics
              </span>
              <Activity className="w-3 h-3 text-[var(--accent-secondary)]" />
            </div>
            <div className="flex items-end gap-1.5 h-14 pt-1 px-1">
              <div className="w-1/4 bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)] rounded-t h-[85%]" />
              <div className="w-1/4 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-t h-[60%]" />
              <div className="w-1/4 bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] rounded-t h-[45%]" />
              <div className="w-1/4 bg-[var(--accent-primary)] rounded-t h-[28%]" />
            </div>
            <div className="text-[9px] font-mono text-center text-[var(--text-secondary)] pt-1 border-t border-[var(--border-color)]">
              Chart.js Bench
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
          <span>Static Analysis Engine</span>
          <span className="text-[var(--accent-primary)]">React • Python</span>
        </div>
      </div>
    );
  }

  if (type === 'bookstore') {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-4 flex flex-col justify-between select-none transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)] opacity-50" />
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] opacity-80" />
            <span className="ml-2 text-[10px] font-mono text-[var(--text-secondary)]">bookstore.mvc</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] text-[10px] font-mono text-[var(--accent-primary)]">
              Spring Boot
            </span>
            <ShoppingCart className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto py-1">
          {[
            { title: "Clean Code", tag: "Engineering", isSecondary: false },
            { title: "Java Design", tag: "Backend", isSecondary: true },
            { title: "Algorithms", tag: "Core CS", isSecondary: false }
          ].map((book, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] p-2 flex flex-col justify-between transition-colors duration-300"
            >
              <div
                className={`h-12 rounded bg-[var(--bg-primary)] border ${
                  book.isSecondary
                    ? 'border-[var(--accent-secondary-border)]'
                    : 'border-[var(--accent-primary-border)]'
                } flex items-center justify-center mb-1.5`}
              >
                <BookOpen className="w-4 h-4 text-[var(--text-primary)] opacity-85" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[var(--text-primary)] truncate">{book.title}</p>
                <p className="text-[9px] text-[var(--text-secondary)]">{book.tag}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
          <span className="flex items-center gap-1 text-[var(--accent-secondary)]">
            <CreditCard className="w-3 h-3" /> Stripe Checkout
          </span>
          <span>Thymeleaf • MySQL</span>
        </div>
      </div>
    );
  }

  // Fallback Project Mockup
  return (
    <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-4 flex flex-col justify-between select-none transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] opacity-80" />
          <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)] opacity-50" />
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] opacity-80" />
          <span className="ml-2 text-[10px] font-mono text-[var(--text-secondary)]">patient-mgmt.portal</span>
        </div>
        <span className="px-2 py-0.5 rounded pink-badge text-[10px] font-mono">
          ASP.NET Core
        </span>
      </div>

      <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
        <div className="col-span-6 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] p-2.5 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-primary)]">
            <Users className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Patient Records</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-[var(--border-color)]" />
            <div className="h-2 w-4/5 rounded bg-[var(--accent-primary-soft)]" />
            <div className="h-2 w-3/4 rounded bg-[var(--border-color)]" />
          </div>
        </div>

        <div className="col-span-6 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] p-2.5 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-primary)]">
            <Stethoscope className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>Doctor Details</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-5/6 rounded bg-[var(--accent-secondary-soft)]" />
            <div className="h-2 w-full rounded bg-[var(--border-color)]" />
            <div className="h-2 w-2/3 rounded bg-[var(--border-color)]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
        <span className="flex items-center gap-1 text-[var(--accent-primary)]">
          <ClipboardList className="w-3 h-3" /> MVC Directory
        </span>
        <span>C# • MySQL</span>
      </div>
    </div>
  );
}
