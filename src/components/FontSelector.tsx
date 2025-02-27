import React from 'react';

interface FontSelectorProps {
  fonts: { name: string; value: string }[];
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, selectedFont, onFontChange }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {fonts.map((font) => (
        <button
          key={font.value}
          className={`px-3 py-2 border rounded-md text-center transition-colors ${
            selectedFont === font.value
              ? 'border-pink-500 bg-pink-50 text-pink-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          style={{ fontFamily: font.value }}
          onClick={() => onFontChange(font.value)}
        >
          {font.name}
        </button>
      ))}
    </div>
  );
};

export default FontSelector;