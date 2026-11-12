"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" }
];

export function SiteHeader() {
  const path = usePathname();
  return (
    <nav aria-label="Main navigation" className="mb-8 mt-4 py-4">
      <div className="mx-auto w-fit rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
        <ul className="flex items-center gap-1 px-1.5 py-1.5">
          {links.map(link => {
            const active = link.href === "/" ? path === "/" : path.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
