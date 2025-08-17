import ImageCard from "@/components/common/ImageCard";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!resp.ok) {
        console.error('Failed to generate image:', resp.statusText);
        setIsLoading(false);
        return;
      }

      const data = await resp.json();
      
      // Set the image URL from the API response
      if (data.imageUrl || data.url || data.image) {
        setImageUrl(data.imageUrl || data.url || data.image);
      } else {
        console.error('No image URL in response:', data);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {
              isLoading ? "Loading..." : "Generate Image"
            }
          </button>
        </div>

        {imageUrl && <ImageCard action={() => setImageUrl(imageUrl)} imageUrl={imageUrl} prompt={prompt} />}
      </div>
    </div>
  );
};

export default Home;