import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Type, Palette, ChevronDown, Check } from 'lucide-react';

interface Props {
  onStyleChange: (key: string, value: any) => void;
  currentConfig: any;
}

export default function TextSelectionToolbar({ onStyleChange, currentConfig }: Props) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 10
        });
        setIsVisible(true);
      } else {
        // Only hide if we didn't click inside the toolbar
        if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
          setIsVisible(false);
        }
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  if (!isVisible || !position) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={toolbarRef}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        style={{ 
          left: position.x, 
          top: position.y,
          transform: 'translateX(-50%) translateY(-100%)'
        }}
        className="fixed z-[9999] flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-xl p-1.5 shadow-2xl backdrop-blur-xl"
      >
        {/* Font Size */}
        <div className="flex items-center gap-1 px-2 border-r border-white/10">
          <Type className="w-4 h-4 text-text-secondary" />
          <select 
            value={currentConfig.fontSize}
            onChange={(e) => onStyleChange('fontSize', parseInt(e.target.value))}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
          >
            {[12, 14, 16, 18, 20, 24, 32].map(size => (
              <option key={size} value={size} className="bg-[#1a1a1a]">{size}px</option>
            ))}
          </select>
        </div>

        {/* Font Weight */}
        <div className="flex items-center gap-1 px-2 border-r border-white/10">
          <select 
            value={currentConfig.fontWeight}
            onChange={(e) => onStyleChange('fontWeight', e.target.value)}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
          >
            {['300', '400', '500', '600', '700', '800', '900'].map(weight => (
              <option key={weight} value={weight} className="bg-[#1a1a1a]">W{weight}</option>
            ))}
          </select>
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-2 px-2">
          <Palette className="w-4 h-4 text-text-secondary" />
          <div className="flex gap-1">
            {['#ffffff', '#8A2BE2', '#00FF00', '#FF6321', '#00D1FF'].map(color => (
              <button
                key={color}
                onClick={() => onStyleChange('accentColor', color)}
                className={`w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125 ${currentConfig.accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a]' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
