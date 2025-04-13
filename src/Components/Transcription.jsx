import React from 'react'

export default function Transcription(props) {
    const { textElement } = props

    return (
        <div className='mb-2 break-after-all italic text-blue-200'>{textElement}</div>
    )
}
