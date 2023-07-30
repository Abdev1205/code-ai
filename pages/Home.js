// pages/index.js (Home.js)

import React, { useState } from "react";

const Home = () => {
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onUserChangedText = (e) => {
    setUserInput(e.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling server-side API...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const { output } = data;
      console.log("API response received...", output.text);

      setApiOutput(`${output.text}`);
    } catch (error) {
      console.error("Error while calling the API:", error);
      setApiOutput("Error while generating text. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
        <textarea
          placeholder="Start typing here"
          className="prompt-box p-4 border border-gray-300 rounded-md w-full h-40 focus:outline-none focus:ring focus:border-blue-300"
          value={userInput}
          onChange={(e) => onUserChangedText(e)}
        />
        <div className="mt-4">
          <button
            className={`generate-button ${isGenerating ? "loading" : ""
              } px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none`}
            onClick={callGenerateEndpoint}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="loader"></span>
            ) : (
              <span>Generate</span>
            )}
          </button>
        </div>
        {apiOutput && (
          <div className="output mt-4 bg-gray-50 p-4 rounded-md">
            <h3 className="font-bold mb-2">Output</h3>
            <p>{apiOutput}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
