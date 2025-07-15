import React from 'react'

function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4 px-8 pt-4 mt-2'>
            <a href="/"><h1 className='font-medium text-white bold text-2xl'>Orator</h1>
            <h6 className='font-medium text-xs text-purple-300'>Convert spoken words into text</h6>
            </a>
            
            <div className='gap-4 flex items-center '>
                <a href="/" className='flex items-center gap-2 text-sm splBtn px-3 py-2 rounded-xl text-purple-300'>
                    <p>New</p>
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>
        </header>
  )
}

export default Header
