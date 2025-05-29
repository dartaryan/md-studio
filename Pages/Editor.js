import React, { useState, useEffect } from 'react';
import { Document } from '@/entities/Document';
import { User } from '@/entities/User';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import PreviewPanel, { defaultThemes, previewScopeSelector } from '../components/editor/PreviewPanel'; // Import themes and selector from PreviewPanel
import CSSPanel from '../components/editor/CSSPanel';
// No ExportDialog needed if print is simple, or pass options directly to onExportPDF
// import ExportDialog from '../components/editor/ExportDialog'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2, FileText } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// Removed import from '@/utils/styling' as it's now in PreviewPanel.jsx

// Helper function to generate scoped styles for PDF
const getScopedStylesForPDF = (themeKey, userCSS, cssIsEnabled) => {
  const themeCSS = defaultThemes[themeKey] || defaultThemes.default; // defaultThemes is now imported from PreviewPanel
  const effectivelyScopedCustomCSS = (userCSS && cssIsEnabled) ? `${previewScopeSelector} { ${userCSS} }` : ''; // previewScopeSelector also from PreviewPanel
  return `${themeCSS}\n${effectivelyScopedCustomCSS}`;
};

export default function Editor() {
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('id');

  const [documentData, setDocumentData] = useState({ // Renamed to avoid conflict with Document entity
    title: 'Untitled Document',
    markdown_content: '',
    custom_css: '',
    theme: 'default'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false); // Kept for potential future use with complex export
  const [cssEnabled, setCSSEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Load document if ID provided
  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    } else {
      loadFromLocalStorage();
    }
  }, [documentId]);

  // Auto-save to localStorage
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem('markdown-studio-document', JSON.stringify(documentData));
      localStorage.setItem('markdown-studio-css-enabled', cssEnabled.toString());
    };
    
    const timeoutId = setTimeout(saveToLocalStorage, 1000);
    return () => clearTimeout(timeoutId);
  }, [documentData, cssEnabled]);

  const loadDocument = async (id) => {
    try {
      const doc = await Document.get(id);
      setDocumentData(doc); // Use setDocumentData
    } catch (error) {
      console.error('Error loading document:', error);
      // Fallback to local storage or default if load fails
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('markdown-studio-document');
    const savedCSSEnabled = localStorage.getItem('markdown-studio-css-enabled');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure essential fields exist before setting state
        if (parsed && typeof parsed.title === 'string' && typeof parsed.markdown_content === 'string') {
            setDocumentData(parsed); // Use setDocumentData
        } else {
            console.warn("Invalid data found in localStorage for document, using defaults.");
        }
      } catch (e) {
        console.error("Error parsing document from localStorage:", e);
      }
    }
    if (savedCSSEnabled) {
      setCSSEnabled(savedCSSEnabled === 'true');
    }
  };

  const saveDocument = async () => {
    setIsSaving(true);
    try {
      let userName = 'Anonymous';
      try {
        const user = await User.me(); 
        if (user && user.full_name) {
            userName = user.full_name;
        }
      } catch (userError) {
        console.warn("User not logged in or error fetching user:", userError);
      }

      const dataToSave = { 
        ...documentData,
        author: userName
      };

      if (documentId) {
        await Document.update(documentId, dataToSave);
      } else {
        const newDoc = await Document.create(dataToSave);
        // OPTIONAL: Update URL if you want the new ID to reflect.
        // Example: navigate(`${createPageUrl("Editor)}?id=${newDoc.id}`, { replace: true });
        // For now, just update the state if necessary or rely on next load.
        // If you want to continue editing the newly created doc, you might need to set its ID in state.
      }
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving document:', error);
      // Add user feedback about save error (e.g., using a toast notification component)
    }
    setIsSaving(false);
  };

  const exportToPDF = async (/* pass export options here if needed */) => {
    setIsExporting(true); // Visually indicate exporting process
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Please allow popups for this site to export PDF.");
        setIsExporting(false);
        return;
      }
      const printDocument = printWindow.document;
      
      const previewContentElement = document.querySelector(`${previewScopeSelector} .prose`);
      if (!previewContentElement) {
        console.error("Preview content area not found for PDF export.");
        printWindow.close();
        setIsExporting(false);
        return;
      }
      
      const stylesForPDF = getScopedStylesForPDF(documentData.theme, documentData.custom_css, cssEnabled);
      const previewClassName = previewScopeSelector.startsWith('.') ? previewScopeSelector.substring(1) : previewScopeSelector;

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${documentData.title || 'Document'}</title>
          <style>
            body { 
              margin: 0; 
              font-family: 'Inter', sans-serif; 
            }
            @page {
              margin: 1in; 
            }
            ${stylesForPDF}
            .${previewClassName} {
                padding: 0 !important; 
                border: none !important; 
                box-shadow: none !important; 
                background-color: #fff !important;
            }
            @media print {
              .${previewClassName} a {
                text-decoration: none; 
                color: inherit; 
              }
              .${previewClassName} img, .${previewClassName} pre, .${previewClassName} table {
                page-break-inside: avoid;
              }
              .${previewClassName} h1, .${previewClassName} h2, .${previewClassName} h3, 
              .${previewClassName} h4, .${previewClassName} h5, .${previewClassName} h6 {
                page-break-after: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="${previewClassName}">
            ${previewContentElement.innerHTML}
          </div>
        </body>
        </html>
      `;
      
      printDocument.write(html);
      printDocument.close();
      
      setTimeout(() => {
        try {
          printWindow.focus(); // Bring window to front before printing
          printWindow.print();
        } catch (e) {
          console.error("Error calling printWindow.print():", e);
          alert("Could not initiate printing. Please check browser console for errors.");
        } finally {
          // Delay closing, some browsers need more time.
          // setTimeout(() => { if (!printWindow.closed) { printWindow.close(); } }, 1000);
        }
      }, 500); 
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert("An error occurred while preparing the PDF. Please try again.");
    }
    setIsExporting(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <Input
              value={documentData.title}
              onChange={(e) => setDocumentData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 max-w-sm"
              placeholder="Document title"
            />
            {lastSaved && (
              <span className="text-xs text-white/60">
                Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={saveDocument}
              disabled={isSaving}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel - Editor */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white/5 backdrop-blur-sm border-r border-white/10">
          <MarkdownEditor
            value={documentData.markdown_content}
            onChange={(value) => setDocumentData(prev => ({ ...prev, markdown_content: value }))}
          />
        </div>

        {/* Right panel - Preview */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <PreviewPanel
            markdownContent={documentData.markdown_content}
            customCSS={documentData.custom_css} // Pass raw custom CSS
            selectedTheme={documentData.theme}
            onExportPDF={() => exportToPDF({ /* pass options if ExportDialog is used */ })}
          />
        </div>
      </div>

      {/* Bottom panel - CSS */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto">
          <CSSPanel
            customCSS={documentData.custom_css}
            onCSSChange={(css) => setDocumentData(prev => ({ ...prev, custom_css: css }))}
            selectedTheme={documentData.theme}
            onThemeChange={(theme) => setDocumentData(prev => ({ ...prev, theme }))}
            cssEnabled={cssEnabled}
            onToggleCSS={setCSSEnabled}
          />
        </div>
      </div>
    </div>
  );
}
