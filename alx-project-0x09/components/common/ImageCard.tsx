import React from 'react';
import { GeneratedImageProps } from '@/interfaces';

const ImageCard: React.FC<GeneratedImageProps> = ({ 
  imageUrl, 
  prompt, 
  width = "400px", 
  height = "400px", 
  action 
}) => {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-2">Generated Image</h3>
      <p className="text-gray-600 mb-4">
        <strong>Prompt:</strong> {prompt}
      </p>
      
      <div className="flex justify-center mb-4">
        <img
          src={imageUrl}
          alt={`Generated from prompt: ${prompt}`}
          style={{ width, height }}
          className="rounded-lg object-cover border border-gray-200"
          onError={(e) => {
            console.error('Failed to load image:', imageUrl);
            e.currentTarget.src = '/placeholder-image.png'; // fallback image
          }}
        />
      </div>
      
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Download Image
        </button>
        <button
          onClick={() => action(imageUrl)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Use Image
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
