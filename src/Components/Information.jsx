import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'


export default function Information(props) {
    const { output, finished } = props
    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState([])
    const [toLanguage, setToLanguage] = useState('Select language')
    const [translating, setTranslating] = useState(null)
    console.log(output)

    const worker = useRef()
      

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }

        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    console.log("Chunk received:", e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    setTranslation(e.data.output)
                    console.log("DONE")
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageReceived)

        return () => worker.current.removeEventListener('message', onMessageReceived)
    })

    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || '' 



    function handleCopy() {
        navigator.clipboard.writeText(textElement)
    }

    function handleDownload() {
        const element = document.createElement("a")
        const file = new Blob([textElement], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `Orator_transcription${new Date().toString()}.txt`
        document.body.appendChild(element)
        element.click()
    }

    async function generateTranslation() {
        if (translating || toLanguage === 'Select language') return;
    
        setTranslating(true)
    
        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })
        
    }
    
    return (
        <main className='flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto'>
            {tab === 'transcription' ? (
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-purple-300 m-6'>Transcription</h1>
                ) : (
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-purple-300 m-6'>Translation</h1>
            )}

            <div className='grid grid-cols-2 sm:mx-auto bg-white  rounded-3xl overflow-hidden items-center p-1 blueShadow border-[2px] border-solid border-purple-500'>
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-purple-400 text-white rounded-3xl' : ' text-purple-400 hover:text-purple-500 hover:cursor-pointer')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-purple-400 text-white rounded-3xl' : ' text-purple-400 hover:text-purple-600 hover:cursor-pointer')}>Translation</button>
            </div>
            <div className='my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4'>
                {(!finished || translating) && (
                    <div className='grid place-items-center'>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    </div>
                )}
                {tab === 'transcription' ? (
                    <Transcription {...props} textElement={textElement} />
                ) : (
                    <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation} />
                )}
            </div>
            <div className='flex items-center gap-4 mx-auto '>
                <button onClick={handleCopy} title="Copy" className='px-4 rounded'>
                <i className="text-2xl hover:cursor-pointer hover:text-purple-300 fa-solid fa-copy"></i>
                </button>
                <button onClick={handleDownload} title="Download" className='px-4 rounded'>
                    <i className="text-2xl fa-solid fa-download hover:cursor-pointer hover:text-purple-300"></i>
                </button>
            </div>
        </main>
    )
}