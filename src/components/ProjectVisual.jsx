import React from 'react';
import {
  Code2, Activity, Sparkles, BookOpen, ShoppingCart,
  CreditCard, BarChart3, Stethoscope, Users, ClipboardList
} from 'lucide-react';

export default function ProjectVisual({ type, screenshotUrl, title }) {
  if (screenshotUrl) {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[#0A0A0A] border-b border-[#252525]">
        <img
          src={screenshotUrl}
          alt={`${title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  if (type === 'umcao') {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[#0A0A0A] border-b border-[#252525] p-4 flex flex-col justify-between select-none">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-[#252525] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF2D75]/80" />
            <span className="w-2 h-2 rounded-full bg-[#A1A1AA]/50" />
            <span className="w-2 h-2 rounded-full bg-[#007BA7]/80" />
            <span className="ml-2 text-[10px] font-mono text-[#A1A1AA]">umcao-ast-analyzer</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#007BA7]/15 border border-[#007BA7]/40 text-[10px] font-mono text-[#007BA7]">
            FastAPI + AST
          </span>
        </div>

        {/* Center Mockup */}
        <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
          <div className="col-span-7 rounded-lg bg-[#141414] border border-[#252525] p-2.5 font-mono text-[9px] text-[#A1A1AA] space-y-1">
            <div className="flex items-center justify-between text-white pb-1 border-b border-[#252525]">
              <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-[#007BA7]" /> AST Check</span>
            </div>
            <p className="text-[#007BA7]">def <span className="text-white">scan_items</span>(data):</p>
            <p className="pl-2 text-[#FF2D75]/90"># Inefficient nested loop</p>
            <p className="pl-2">for x in data: ...</p>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-white bg-[#007BA7]/20 border border-[#007BA7]/40 px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-[#FF2D75]" />
              <span>Optimize to Set</span>
            </div>
          </div>

          <div className="col-span-5 rounded-lg bg-[#141414] border border-[#252525] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] font-mono text-[#A1A1AA]">
              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3 text-[#007BA7]" /> Metrics</span>
              <Activity className="w-3 h-3 text-[#FF2D75]" />
            </div>
            <div className="flex items-end gap-1.5 h-14 pt-1 px-1">
              <div className="w-1/4 bg-[#FF2D75]/50 border border-[#FF2D75]/60 rounded-t h-[85%]" />
              <div className="w-1/4 bg-[#A1A1AA]/30 border border-[#A1A1AA]/40 rounded-t h-[60%]" />
              <div className="w-1/4 bg-[#007BA7]/60 border border-[#007BA7] rounded-t h-[45%]" />
              <div className="w-1/4 bg-[#007BA7] rounded-t h-[28%]" />
            </div>
            <div className="text-[9px] font-mono text-center text-[#A1A1AA] pt-1 border-t border-[#252525]">
              Chart.js Bench
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
          <span>Static Analysis Engine</span>
          <span className="text-[#007BA7]">React • Python</span>
        </div>
      </div>
    );
  }

  if (type === 'bookstore') {
    return (
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[#0A0A0A] border-b border-[#252525] p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-[#252525] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF2D75]/80" />
            <span className="w-2 h-2 rounded-full bg-[#A1A1AA]/50" />
            <span className="w-2 h-2 rounded-full bg-[#007BA7]/80" />
            <span className="ml-2 text-[10px] font-mono text-[#A1A1AA]">bookstore.mvc</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#007BA7]/15 border border-[#007BA7]/40 text-[10px] font-mono text-[#007BA7]">
              Spring Boot
            </span>
            <ShoppingCart className="w-3.5 h-3.5 text-[#FF2D75]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto py-1">
          {[
            { title: "Clean Code", tag: "Engineering", accent: "border-[#007BA7]/40" },
            { title: "Java Design", tag: "Backend", accent: "border-[#FF2D75]/40" },
            { title: "Algorithms", tag: "Core CS", accent: "border-[#007BA7]/40" }
          ].map((book, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-[#141414] border border-[#252525] p-2 flex flex-col justify-between"
            >
              <div className={`h-12 rounded bg-[#0A0A0A] border ${book.accent} flex items-center justify-center mb-1.5`}>
                <BookOpen className="w-4 h-4 text-white/80" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white truncate">{book.title}</p>
                <p className="text-[9px] text-[#A1A1AA]">{book.tag}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
          <span className="flex items-center gap-1 text-[#FF2D75]">
            <CreditCard className="w-3 h-3" /> Stripe Checkout
          </span>
          <span>Thymeleaf • MySQL</span>
        </div>
      </div>
    );
  }

  // Patient Management System (ASP.NET Core MVC, C#, MySQL)
  return (
    <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[#0A0A0A] border-b border-[#252525] p-4 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-[#252525] pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF2D75]/80" />
          <span className="w-2 h-2 rounded-full bg-[#A1A1AA]/50" />
          <span className="w-2 h-2 rounded-full bg-[#007BA7]/80" />
          <span className="ml-2 text-[10px] font-mono text-[#A1A1AA]">patient-mgmt.portal</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[10px] font-mono text-[#FF2D75]">
          ASP.NET Core
        </span>
      </div>

      <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
        <div className="col-span-6 rounded-lg bg-[#141414] border border-[#252525] p-2.5 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white">
            <Users className="w-3.5 h-3.5 text-[#007BA7]" />
            <span>Patient Records</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-[#252525]" />
            <div className="h-2 w-4/5 rounded bg-[#007BA7]/40" />
            <div className="h-2 w-3/4 rounded bg-[#252525]" />
          </div>
        </div>

        <div className="col-span-6 rounded-lg bg-[#141414] border border-[#252525] p-2.5 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white">
            <Stethoscope className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>Doctor Details</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-5/6 rounded bg-[#FF2D75]/40" />
            <div className="h-2 w-full rounded bg-[#252525]" />
            <div className="h-2 w-2/3 rounded bg-[#252525]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
        <span className="flex items-center gap-1 text-[#007BA7]">
          <ClipboardList className="w-3 h-3" /> MVC Directory
        </span>
        <span>C# • MySQL</span>
      </div>
    </div>
  );
}
