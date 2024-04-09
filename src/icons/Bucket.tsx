import { useState } from 'react';

interface BucketProps {
  selectedColor: string;
  onColorChange: (newColor: string) => void;
}

const Bucket = ({ selectedColor, onColorChange }: BucketProps) => {
  const [showPalette, setShowPalette] = useState(false);
  const colors = [
    '#BAE2FF',
    '#B9FFDD',
    '#FFE8AC',
    '#FFCAB9',
    '#F99494',
    '#9DD6FF',
    '#ECA1FF',
    '#DAFF8B',
    '#FFA285',
    '#CDCDCD',
    '#979797',
  ];

  const handleClick = (color: string) => {
    onColorChange(color);
    setShowPalette(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setShowPalette(!showPalette)}
      >
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1011 11.5468C16.1011 11.5468 14.1011 13.7168 14.1011 15.0468C14.1011 15.5772 14.3118 16.086 14.6869 16.461C15.062 16.8361 15.5707 17.0468 16.1011 17.0468C16.6316 17.0468 17.1403 16.8361 17.5153 16.461C17.8904 16.086 18.1011 15.5772 18.1011 15.0468C18.1011 13.7168 16.1011 11.5468 16.1011 11.5468ZM2.31113 10.0468L7.10113 5.25681L11.8911 10.0468M13.6611 8.98681L4.72113 0.046814L3.31113 1.45681L5.69113 3.83681L0.541133 8.98681C-0.0488672 9.54681 -0.0488672 10.5168 0.541133 11.1068L6.04113 16.6068C6.33113 16.8968 6.72113 17.0468 7.10113 17.0468C7.48113 17.0468 7.87113 16.8968 8.16113 16.6068L13.6611 11.1068C14.2511 10.5168 14.2511 9.54681 13.6611 8.98681Z"
            fill="#51646E"
          />
          <path
            d="M7.16985 15.0439L2.33984 10H11.9072L7.16985 15.0439Z"
            fill="#FFA000"
          />
        </svg>
      </div>

      {showPalette && (
        <div className="absolute top-10 z-10 flex gap-1 bg-white p-2 border border-gray-300 rounded-md shadow-md">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bucket;
