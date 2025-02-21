import React, { useEffect, useRef, useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

function Information(props) {
  const {output,finished}=props
  const [tab,setTab] = useState('transcription')
  const [translation,setTranslation] = useState(null)
  const [toLanguage,setToLanguage] = useState('Select language')
  const [translating,setTranslating] = useState(null)
  console.log(output)

  const worker = useRef()

  useEffect(()=>{
    if(!worker.current){
      worker.current = new Worker(new URL('../utils/translate.worker.js',import.meta.url),{
        type:'module'
      })
    }

    const onMessageRecieved=async(e)=>{
      switch(e.data.status){
        case 'initiate':
          console.log('DOWNLOADING')
          break;
        case 'progress':
          console.log('LOADING')
          break;
        case 'update':
          setTranslation(e.data.output)
          console.log(e.data.output)
          break;
        case 'complete':
          setTranslating(false)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message',onMessageRecieved)
    return ()=>{worker.current.removeEventListener('message',onMessageRecieved)
  
    }


  },[])
  return (
    <main className='flex-1 p-4 flex flex-col justify-center sm:w-96 text-center sm:gap-4 pb-20 w-72 max-w-full mx-auto '>
        <h1 className='font-semibold text-4xl sm:text-4xl md:text-5xl text-purple-300'>Your Transcription</h1>
        <div className='grid grid-cols-2 sm:mx-auto bg-white rounded overflow-hidden items-center p-1 blueShadow border-[2px] border-solid border-blue-300'>
          <button onClick={()=>setTab('transcription')} className={'px-4 rounded duration-200 py-1' + (tab === 'transcription' ? ' bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
          <button onClick={()=>setTab('translation')} className={'px-4 rounded duration-200 py-1' + (tab === 'translation'? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
        </div>
        <div className='my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4'>
          {(!finished || translating) && (
            <div className='grid place-items-center'>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </div>
          )}
          {tab === 'transcription' ? (
            <Transcription {...props} textElement={textElement}/>
          ) :(
            <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation}/>
          )}
        </div>
        <div className='flex items-center gap-4 mx-auto'>
          <button onClick={handleCopy} title="Copy" className='bg-white hover:text-blue-500 duration-200 text-blue-300 px-2 aspect-square grid place-items-center rounded'>
            <i className="fa-solid fa-copy"></i>
          </button>
          <button onClick={handleDownload} title="Download" className='bg-white hover:text-blue-500 duration-200 text-blue-500 px-2 aspect-square grid place-center rounded'>
            <i className='fa-solid fa-copy'></i>
          </button>
        </div>
    </main>
  )
}

export default Information
