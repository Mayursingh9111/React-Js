import React, { useState } from "react";
import axios from "axios";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const UNSPLASH_ACCESS_KEY = "kQRg505Kf9s6OLZ_CJYcSTBGqXkIn6JAXSvnHx4Gnn0"; // Replace with your Unsplash Access Key

  const generateImage = async () => {
    setLoading(true);
    setError("");
    setImageUrl(null); // Clear previous image

    const endpoint = `https://api.unsplash.com/search/photos?query=${prompt}&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await axios.get(endpoint);

      if (response.data.results.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        setImageUrl(response.data.results[randomIndex].urls.regular); // Get a random image URL
      } else {
        setError("No images found. Please try a different search term.");
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      setError("Failed to fetch image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4">AI Image Generator</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          placeholder="Enter a description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={generateImage}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Image:</h2>
          <img
            src={imageUrl}
            alt="Generated AI"
            className="rounded shadow-lg border-2 border-gray-600"
            width="700px"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
