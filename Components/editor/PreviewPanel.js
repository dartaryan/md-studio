import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Moved from utils/styling.js
export const previewScopeSelector = '.markdown-render-area';

export const defaultThemes = {
  default: `
    ${previewScopeSelector} { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
      line-height: 1.7; 
      color: #2c3e50; 
      background-color: #ffffff; /* Default background for the preview area */
    }
    ${previewScopeSelector} h1, 
    ${previewScopeSelector} h2, 
    ${previewScopeSelector} h3, 
    ${previewScopeSelector} h4, 
    ${previewScopeSelector} h5, 
    ${previewScopeSelector} h6 { 
      color: #1a1a1a; 
      margin-top: 1.5em; 
      margin-bottom: 0.8em; 
      font-weight: 600; 
    }
    ${previewScopeSelector} h1 { 
      font-size: 2.2rem; 
      border-bottom: 2px solid #3498db; 
      padding-bottom: 0.4em; 
    }
    ${previewScopeSelector} h2 { 
      font-size: 1.8rem; 
      border-bottom: 1px solid #ecf0f1; 
      padding-bottom: 0.3em; 
    }
    ${previewScopeSelector} h3 { font-size: 1.4rem; }
    ${previewScopeSelector} p { margin-bottom: 1em; }
    ${previewScopeSelector} code { 
      background: #f0f2f5; 
      padding: 0.2em 0.4em; 
      border-radius: 4px; 
      font-family: 'Fira Code', monospace; 
      font-size: 0.9em;
    }
    ${previewScopeSelector} pre { 
      background: #2d2d2d; 
      color: #f8f8f2; 
      padding: 1em; 
      border-radius: 8px; 
      overflow-x: auto; 
      margin: 1em 0;
    }
    ${previewScopeSelector} pre code { /* Reset styles for code inside pre */
      background: none;
      padding: 0;
      border-radius: 0;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
    }
    ${previewScopeSelector} blockquote { 
      border-left: 4px solid #3498db; 
      padding: 0.5em 1em; 
      margin: 1.5em 0; 
      font-style: italic; 
      background: #f8f9fa; 
      color: #555;
    }
    ${previewScopeSelector} table { 
      border-collapse: collapse; 
      width: 100%; 
      margin: 1.5em 0; 
      font-size: 0.95em;
    }
    ${previewScopeSelector} th, 
    ${previewScopeSelector} td { 
      border: 1px solid #ddd; 
      padding: 0.6em; 
      text-align: left; 
    }
    ${previewScopeSelector} th { 
      background: #f2f2f2; 
      font-weight: 600; 
    }
    ${previewScopeSelector} img { 
      max-width: 100%; 
      height: auto; 
      border-radius: 8px; 
      margin: 1em 0; 
      display: block;
      border: 1px solid #eee;
    }
    ${previewScopeSelector} ul, 
    ${previewScopeSelector} ol { 
      margin-bottom: 1em; 
      padding-left: 1.5em; 
    }
    ${previewScopeSelector} li { margin-bottom: 0.5em; }
    ${previewScopeSelector} a { color: #3498db; text-decoration: none; }
    ${previewScopeSelector} a:hover { text-decoration: underline; }
    ${previewScopeSelector} hr {
      border: none;
      border-top: 1px solid #ecf0f1;
      margin: 2em 0;
    }
  `,
  github: `
    ${previewScopeSelector} { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; 
      line-height: 1.6; 
      color: #24292e; 
      background-color: #ffffff;
    }
    ${previewScopeSelector} h1, 
    ${previewScopeSelector} h2, 
    ${previewScopeSelector} h3, 
    ${previewScopeSelector} h4, 
    ${previewScopeSelector} h5, 
    ${previewScopeSelector} h6 { 
      margin-top: 24px; 
      margin-bottom: 16px; 
      font-weight: 600; 
      line-height: 1.25;
    }
    ${previewScopeSelector} h1 { font-size: 2em; }
    ${previewScopeSelector} h2 { font-size: 1.5em; }
    ${previewScopeSelector} h3 { font-size: 1.25em; }
    ${previewScopeSelector} h1, 
    ${previewScopeSelector} h2 { 
      padding-bottom: 0.3em; 
      border-bottom: 1px solid #eaecef; 
    }
    ${previewScopeSelector} p { margin-bottom: 16px; }
    ${previewScopeSelector} code { 
      background: rgba(27,31,35,0.05); 
      padding: 0.2em 0.4em; 
      margin: 0; 
      font-size: 85%; 
      border-radius: 3px; 
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    }
    ${previewScopeSelector} pre { 
      background: #f6f8fa; 
      padding: 16px; 
      overflow: auto; 
      font-size: 85%; 
      line-height: 1.45; 
      border-radius: 6px; 
      margin: 16px 0;
    }
    ${previewScopeSelector} pre code {
      background: none;
      padding: 0;
      margin: 0;
      font-size: 100%; /* Reset from inline code */
      border-radius: 0;
      line-height: inherit;
    }
    ${previewScopeSelector} blockquote { 
      padding: 0 1em; 
      color: #6a737d; 
      border-left: 0.25em solid #dfe2e5; 
      margin: 16px 0;
    }
    ${previewScopeSelector} table {
      border-collapse: collapse;
      width: auto;
      margin: 16px 0;
      display: block;
      overflow: auto;
    }
    ${previewScopeSelector} th,
    ${previewScopeSelector} td {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
    }
    ${previewScopeSelector} th { font-weight: 600; }
    ${previewScopeSelector} img { max-width: 100%; height: auto; }
    ${previewScopeSelector} ul,
    ${previewScopeSelector} ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    ${previewScopeSelector} li > p { margin-bottom: 0; } /* For p inside li */
    ${previewScopeSelector} a { color: #0366d6; text-decoration: none; }
    ${previewScopeSelector} a:hover { text-decoration: underline; }
    ${previewScopeSelector} hr {
      height: .25em;
      padding: 0;
      margin: 24px 0;
      background-color: #e1e4e8;
      border: 0;
    }
  `,
  dark: `
    ${previewScopeSelector} { 
      font-family: 'Inter', sans-serif; 
      line-height: 1.7; 
      color: #e1e5e9; 
      background: #1a1a1a; 
    }
    ${previewScopeSelector} h1, 
    ${previewScopeSelector} h2, 
    ${previewScopeSelector} h3, 
    ${previewScopeSelector} h4, 
    ${previewScopeSelector} h5, 
    ${previewScopeSelector} h6 { 
      color: #ffffff; 
      margin-top: 1.5em; 
      margin-bottom: 0.8em; 
    }
    ${previewScopeSelector} h1 { 
      font-size: 2.2rem; 
      border-bottom: 2px solid #6366f1; 
    }
    ${previewScopeSelector} h2 { 
      font-size: 1.8rem; 
      border-bottom: 1px solid #4b5563; 
    }
    ${previewScopeSelector} h3 { font-size: 1.4rem; }
    ${previewScopeSelector} p { margin-bottom: 1em; }
    ${previewScopeSelector} code { 
      background: #374151; 
      color: #f3f4f6; 
      padding: 0.2em 0.4em; 
      border-radius: 4px; 
      font-size: 0.9em;
    }
    ${previewScopeSelector} pre { 
      background: #111827; 
      color: #f9fafb; 
      padding: 1em; 
      border-radius: 8px; 
      border: 1px solid #374151; 
      margin: 1em 0;
    }
    ${previewScopeSelector} pre code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
    }
    ${previewScopeSelector} blockquote { 
      border-left: 4px solid #6366f1; 
      background: #1f2937; 
      padding: 0.5em 1em; 
      margin: 1.5em 0; 
      color: #d1d5db;
    }
    ${previewScopeSelector} table { 
      border-collapse: collapse; 
      width: 100%; 
      margin: 1.5em 0; 
      font-size: 0.95em;
    }
    ${previewScopeSelector} th, 
    ${previewScopeSelector} td { 
      border: 1px solid #4b5563; 
      padding: 0.6em; 
      text-align: left; 
    }
    ${previewScopeSelector} th { 
      background: #374151; 
      font-weight: 600; 
    }
    ${previewScopeSelector} img { 
      max-width: 100%; 
      height: auto; 
      border-radius: 8px; 
      margin: 1em 0; 
      display: block;
      border: 1px solid #4b5563;
    }
    ${previewScopeSelector} ul, 
    ${previewScopeSelector} ol { 
      margin-bottom: 1em; 
      padding-left: 1.5em; 
    }
    ${previewScopeSelector} li { margin-bottom: 0.5em; }
    ${previewScopeSelector} a { color: #818cf8; text-decoration: none; }
    ${previewScopeSelector} a:hover { text-decoration: underline; }
    ${previewScopeSelector} hr {
      border: none;
      border-top: 1px solid #4b5563;
      margin: 2em 0;
    }
  `
};
// End of moved code

export default function PreviewPanel({ 
  markdownContent, 
  customCSS, 
  selectedTheme = 'default',
  onExportPDF 
}) {
  const combinedCSS = useMemo(() => {
    const themeCSS = defaultThemes[selectedTheme] || defaultThemes.default;
    // Wrap customCSS inside the previewScopeSelector to ensure it's scoped
    const effectivelyScopedCustomCSS = customCSS ? `${previewScopeSelector} { ${customCSS} }` : '';
    return `${themeCSS}\n${effectivelyScopedCustomCSS}`;
  }, [customCSS, selectedTheme]);

  // Remove the dot from previewScopeSelector for className usage
  const previewClassName = previewScopeSelector.startsWith('.') ? previewScopeSelector.substring(1) : previewScopeSelector;

  return (
    <div className="h-full flex flex-col">
      {/* Editor header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Live Preview</h3>
            <p className="text-xs text-white/60">Real-time rendering</p>
          </div>
        </div>
        
        <Button
          onClick={onExportPDF}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div 
            className={`bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 min-h-full ${previewClassName}`} // Apply scoping class
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <style dangerouslySetInnerHTML={{ __html: combinedCSS }} />
            {/* Tailwind's .prose class provides good defaults. Theme/custom CSS will override/extend this. */}
            <div className="prose prose-lg max-w-none"> 
              <ReactMarkdown>
                {markdownContent || '# Welcome to Markdown Studio\n\nStart typing in the editor to see your content here!\n\n## Features\n- Live preview\n- Custom CSS styling\n- PDF export\n- Multiple themes\n\n```javascript\nconsole.log("Hello, World!");\n```\n\n> This is a beautiful blockquote that showcases the styling capabilities.'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
