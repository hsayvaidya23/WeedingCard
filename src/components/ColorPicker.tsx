import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-10 h-10 rounded-full border-2 ${
            selectedColor === color ? 'border-gray-800' : 'border-gray-200'
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;