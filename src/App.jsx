import { useState,useEffect,useRef } from "react";
import Header from "./Components/Header";
import HomePage from "./Components/Homepage";
import FileDisplay from "./Components/FileDisplay";
import Transcribing from "./Components/Transcribing";
export default function App() {
  const [file,setFile] = useState(null)
  const [audioStream,setAudioStream] = useState(null)
  const[output,setOutput] = useState(true)
  const [loading,setLoading] = useState(false)

  const isAudioAvailable=file || audioStream

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  } 

  useEffect(() => {
    console.log(audioStream)
  }, [audioStream])



  return (
    <div className="flex flex-col">
      <section className="min-h-screen flex flex-col">
      <Header/>
      {output?(
        <Information/>
      ):loading?(
        <Transcribing/>
      ): isAudioAvailable ? (
        <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={audioStream}/>
      ):(
        <HomePage setFile={setFile} setAudioStream={setAudioStream}/>
      )
    }
      </section>

    </div>
   );
}
