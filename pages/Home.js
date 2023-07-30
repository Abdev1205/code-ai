import { useState } from "react"

const Home = () => {
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (e) => {
    setUserInput(e.target.value);
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  return (
    <>
      <div className="prompt-container">
        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={(e) => onUserChangedText(e)}
        />
        <div className="prompt-buttons">
          <a className="generate-button" onClick={callGenerateEndpoint}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
        </div>
        {/* New code I added here */}
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>

      <div className="prompt-buttons">
        <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
      </div>

    </>
  )
}

export default Home
