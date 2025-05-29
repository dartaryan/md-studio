import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Code, Type, Eye } from "lucide-react";

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "# Start writing your markdown here...\n\nYour content will appear in the preview panel in real-time." 
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Editor header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Markdown Editor</h3>
            <p className="text-xs text-white/60">GitHub Flavored Markdown supported</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 rounded-md bg-green-500/20 border border-green-400/30">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs text-green-200">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor content */}
      <div className="flex-1 p-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full resize-none border-0 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:bg-white/10 transition-all duration-300 font-mono text-sm leading-relaxed"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        />
      </div>
    </div>
  );
}
