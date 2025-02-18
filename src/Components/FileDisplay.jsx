import React,{useState,useEffect,useRef} from 'react'

export default function FileDisplay(props) {
    const {handleAudioReset,file,audioStream,handleFormSubmission} = props
    const audioRef=useRef()

    useEffect(()=>{
        if(!file && !audioStream){return}
        if(file){
            console.log('HERE FILE',file)
            audioRef.current.src=URL.createObjectURL(file)
        } else{
            console.log('HERE AUDIO',audioStream)
            audioRef.current.src=URL.createObjectURL(audioStream)
        }

    },[file,audioStream])

   
    return (
    <main className="flex-1 p-4 flex flex-col justify-center text-center gap-3 sm:gap-4 md:gap-5 pb-20">
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-purple-300'>Your File</h1>
        <div className=' flex flex-col justify-center items-center text-left my-4'>
              <h3 className='font-semibold'>Name</h3>
              <p className='text-blue-200 truncate'>{file ? file?.name : 'Custom audio'}</p>
        </div>
        <div className=' justify-center items-center flex flex-col mb-2'>
                <audio ref={audioRef} className=' w-1/2 h-10 mb-4' controls>
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className='flex items-center justify-center gap-4'>
                <button onClick={handleAudioReset} className='text-blue-200 hover:text-purple-300 duration-200 mx-4'>Reset</button>
                <button onClick={handleFormSubmission} className='splBtn px-3 p-2 rounded-xl text-purple-300 flex items-center gap-2 font-medium mx-4 '>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
    </main>
  )
}

