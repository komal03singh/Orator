import React from 'react'
import { LANGUAGES } from '../utils/presets'

export default function Translation(props) {
    const { textElement, toLanguage, translating, setToLanguage, generateTranslation } = props
    return (
        <>
            {(textElement && !translating) && (
                <div className='italic text-blue-200'>
                {textElement.map((item, index) => (
                  <p key={index}>{item.translation_text}</p>
                ))}
              </div>
                  
            )}

            {!translating && (<div className='flex flex-col gap-1 mb-4'>
                <p className='text-xs sm:text-sm font-medium text-blue-200 mr-auto m-2'>To language</p>
                <div className='flex items-stretch gap-2 sm:gap-4' >
                    <select value={toLanguage} className='flex-1 outline-none w-full focus:outline-none bg-white text-black duration-200 p-2  rounded-3xl' onChange={(e) => setToLanguage(e.target.value)}>
                        <option value={'Select language'}>Select language</option>
                        {Object.entries(LANGUAGES).map(([key, value]) => {
                            return (
                                <option key={key} value={value}>{key}</option>
                            )
                        })}

                    </select>
                    <button onClick={generateTranslation} className='splBtn px-4 py-2 rounded-2xl text-purple-300 hover:text-purple-400 duration-200 hover:cursor-pointer'>Translate</button>
                </div>
            </div>)}
        </>
    )
}
