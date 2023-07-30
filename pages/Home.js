import React, { useState } from "react";
import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Home = () => {
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [prompt, setPrompt] = useState(false);

  const onUserChangedText = (e) => {
    setUserInput(e.target.value);
  };

  const callGenerateEndpoint = async () => {
    if (prompt == false && apiOutput) {
      setPrompt(true)
    }
    setIsGenerating(true);

    console.log("Calling server-side API...");
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const { output } = data;
      console.log("API response received...", output);

      setApiOutput(output);
      console.log(output) // Assuming 'output' is a string received from the API
    } catch (error) {
      console.error('Error while calling the API:', error);
      setApiOutput('Error while generating text. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className={` ${prompt ? "h-auto" : "h-[100vh]"}  flex flex-col justify-center  overflow-clip bg-black relative  `}>
        <Image
          src={'/assets/circle.svg'}
          alt={'right-tick'} height={500} width={500}
          className=' w-[100%] absolute top-[10%] z-[1] '
        />
        <Image
          src={'/assets/pattern.svg'}
          alt={'right-tick'} height={500} width={500}
          className=' w-[8rem] opacity-50 absolute left-[-2rem] bottom-[1rem] '
        />
        <div className="w-[40rem] mx-auto bg-[#191919] z-[10]  border-[.1px] border-[#7b7b7b]   shadow-md rounded-lg p-[.5rem]">
          <textarea
            placeholder="Write your Prompt here"
            className="prompt-box p-4 resize-none rounded-md text-white border-none w-full bg-[#191919] h-[10rem] focus:outline-none outline-none "
            value={userInput}
            onChange={(e) => onUserChangedText(e)}
          />
          <div className="mt-4">
            <button
              className={`generate-button ${isGenerating ? "loading" : ""
                } px-4 py-2 w-[8rem] bg-[#ff4a02] text-white rounded-md focus:outline-none`}
              onClick={callGenerateEndpoint}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="loader">
                  <CircularProgress color="inherit" />
                </span>
              ) : (
                <span>Generate</span>
              )}
            </button>
          </div>
          {apiOutput && (
            <div className="output mt-4 bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Website Code</h3>
              <SyntaxHighlighter language="html" style={dark}>
                {apiOutput.text}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
