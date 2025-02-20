import React from 'react'
import { div } from 'three/tsl'

function Information() {
  const [tab,setTab] = useState('transcription')
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
    </main>
  )
}

export default Information
