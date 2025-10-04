"use client";

import Link from "next/link";
import { Users, FileText, CheckSquare, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { href: "/posts", label: "Posts", icon: <FileText className="w-4 h-4" /> },
    { href: "/todos", label: "Todos", icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full bg-gray-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
        <Link href="/">MyWebsite</Link>
        </h1>

        {/* hamburger button icon */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* desktop header */}
        <nav className="hidden sm:flex items-center gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* mobile header */}
      {isOpen && (
        <div className="sm:hidden bg-gray-50 border-t border-gray-200 shadow-md">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
