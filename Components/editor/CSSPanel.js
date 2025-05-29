import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Palette, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CSSPanel({ 
  customCSS, 
  onCSSChange, 
  selectedTheme, 
  onThemeChange,
  cssEnabled = true,
  onToggleCSS 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const resetCSS = () => {
    onCSSChange('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div 
        className="p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Styling Options</h3>
              <p className="text-xs text-white/60">Customize your document appearance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/70">CSS</span>
              <Switch 
                checked={cssEnabled}
                onCheckedChange={onToggleCSS}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-400 data-[state=checked]:to-blue-500"
              />
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-white/70" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/70" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Theme selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Theme</label>
                <Select value={selectedTheme} onValueChange={onThemeChange}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom CSS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white/90">Custom CSS</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetCSS}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                </div>
                <Textarea
                  value={customCSS}
                  onChange={(e) => onCSSChange(e.target.value)}
                  placeholder="/* Add your custom CSS here */
body { 
  font-family: 'Your Font', sans-serif; 
}

h1 { 
  color: #your-color; 
}"
                  className="h-40 resize-none bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 font-mono text-xs"
                  disabled={!cssEnabled}
                />
              </div>

              <div className="flex space-x-2">
                <div className="flex-1 p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20">
                  <p className="text-xs text-white/80">
                    💡 <strong>Tip:</strong> Changes apply instantly to the preview
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
