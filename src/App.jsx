import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook 
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback( () => {
    let pass = "";

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numberAllowed){
      str += "0123456789";
    }
    if(charAllowed){
      str += "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";
    }

    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);

  },[password]);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  
  return (
    <>
      
      <div className="w-screen h-screen bg-black p-4 sm:p-6 md:p-10">
  <div className="bg-gray-900 text-white p-4 rounded-md w-full max-w-md md:max-w-lg mx-auto space-y-4">
    <h1 className="text-center text-2xl sm:text-3xl font-semibold">Password Generator</h1>

    <div className="flex flex-col sm:flex-row items-center sm:justify-between border border-gray-700 rounded-md px-2 py-2 space-y-2 sm:space-y-0 sm:space-x-2">
      <input
        type="text"
        value={password}
        readOnly
        ref={passwordRef}
        className="bg-transparent outline-none text-orange-400 w-full font-mono text-base sm:text-lg"
      />
      <button className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
      onClick={copyPasswordToClipboard}
      >
        Copy
      </button>
    </div>

    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-sm text-orange-400">
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="6"
          max="100"
          value={length}
          className="accent-orange-400 cursor-pointer"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <span>Length ({length})</span>
      </div>

      <div className="flex space-x-4 flex-wrap">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="accent-orange-400"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <span>Numbers</span>
        </label>

        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="accent-orange-400"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <span>Characters</span>
        </label>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App
