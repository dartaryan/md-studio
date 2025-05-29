import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Download, Sparkles } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Static gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-500 to-indigo-600 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-300 via-purple-400 to-indigo-500 opacity-50"></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-white/5">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to={createPageUrl("Editor")} className="flex items-center space-x-3 group">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Markdown Studio</h1>
                  <p className="text-xs text-white/70">Beautiful Markdown to PDF</p>
                </div>
              </Link>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-white/90 font-medium">Live Preview</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
