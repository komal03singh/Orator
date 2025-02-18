import React from 'react'

function Transcribing(props) {
  const {downloading} = props
  return (
    <div className='flex flex-col items-center flex-1 justify-center gap-10 md:gap-14 py-24 p-4 text-center'>
      <div className='flex flex-col gap-2 sm:gap-4'>
      <h1 className='font-semibold text-4xl sm:text-4xl md:text-5xl text-purple-300'>Transcribing</h1>
      <p>{!downloading? 'Transcribing audio...' : 'Audio transcribed'}</p>
      </div>
      <div className='flex flex-col gap-2 sm:gap-4 max-w-[500px] mx-auto w-full'>
        {[0,1,2].map(val=>{
          return (
            <div key={val} className={'rounded-full h-2 sm:h-3 bg-blue-200 loading '+`loading${val}`}></div>
          )
        })
        }

      </div>
    </div>
  )
}

export default Transcribing
