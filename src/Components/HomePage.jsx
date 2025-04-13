import React from 'react'
import { useState,useEffect,useRef } from 'react'
import VoiceGif from '../asset/voice2.gif'

function HomePage(props) {
  const {setFile,setAudioStream} = props

  const [recordingStatus,setRecordingStatus] = useState('inactive')
  const[audioChuncks,setAudioChuncks] = useState([])
  const[duration,setDuration] = useState(0)

  const mediaRecorder = useRef(null)

  const mimeType='audio/webm'

  async function startRecording(){
      let tempStream

      console.log('start recording')

      try{
          const streamData=await navigator.mediaDevices.getUserMedia({
              audio:true,
              video:false
          })
          tempStream=streamData

      } catch(err){
          console.log(err.message)
          return
      }
      setRecordingStatus('recording')

      //create new Media recorder instance using the stream
      const media=new MediaRecorder(tempStream,{type:mimeType})
      mediaRecorder.current=media

      mediaRecorder.current.start()
      let localAudioChuncks=[]
        mediaRecorder.current.ondataavailable=(e)=>{
          if (typeof e.data === 'undefined') {return}
          if(e.data.size ===0) {return}
          localAudioChuncks.push(e.data)
        }
        setAudioChuncks(localAudioChuncks)
  }
      

  async function stopRecording(){
    setRecordingStatus('inactive')
    console.log('stop recording')

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop=()=>{
      const audioBlob=new Blob(audioChuncks,{type:mimeType})
      setAudioStream(audioBlob)
      setAudioChuncks([])
      setDuration(0)
    }
  }

  useEffect(()=>{
    if(recordingStatus === 'inactive') {return}
    const interval=setInterval(()=>{
      setDuration(curr=>curr+1)
    },1000)

    return ()=> clearInterval(interval)
  })

  return (
    <main className="flex-1 p-4 flex flex-row justify-between text-center gap-3 sm:gap-4 md:gap-5 pb-20">
      <div className='flex-1 flex flex-col justify-center items-center'>
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl mb-2'>Orator</h1>
        <h3 className='font-medium md:text-lg mb-4'>Record <span className='text-purple-300'>&rarr;</span> Transcribe <span className='text-purple-300'>&rarr;</span> Translate</h3>
        <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex splBtn px-4 py-2 rounded-2xl items-center text-base justify-between gap-4 mx-auto w-80 max-w-full my-4 mb-8'>
          <p className='text-purple-300'>{recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}</p>
          <div className='flex items-center gap-2'>
                    {duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )}
          <i className={"fa-solid duration-200 fa-microphone "+(recordingStatus === 'recording'?'text-rose-300':"")}></i>
          </div>
        </button>
        <p className='text-base mb-2'>Or <label className='text-purple-300 cursor-pointer hover:text-purple-300 duration-200'>upload 
          <input onChange={(e)=>{
            const tempFile=e.target.files[0]
            setFile(tempFile)}} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
        <p className='italic text-blue-200'>Fast. Accurate. Effortless.</p>
      </div>
      <div>
        <img className='rounded-4xl h-xl w-xl m-4' src={VoiceGif} alt="voice" />
      </div>
    </main>
  )
}

export default HomePage
