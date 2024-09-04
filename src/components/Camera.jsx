import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { MdOutlineCamera } from "react-icons/md";

const videoConstraints = {
    width: 540,
    facingMode: "environment"
}

const Camera = ({url, setUrl}) => {

    const webCamRef = useRef(null)

    const capture = useCallback(async () => {
        const imageSrc = webCamRef.current.getScreenshot()
        setUrl(imageSrc)
    }, [webCamRef])

    const onUserMedia = (e) => {
        console.log('onUserMedia', e);
    }

  return (
    <>
      <div className='flex justify-center items-center'>
        <Webcam className='rounded-lg' ref={webCamRef} audio={false} screenshotFormat={'image/jpeg' || 'image/png'} videoConstraints={videoConstraints} onUserMedia={onUserMedia} mirrored={false} screenshotQuality={1}/>
      </div>
      <div className='flex flex-col justify-center items-center mt-5'>
        <p className='text-gray-400 font-semibold text-[0.75rem] mb-1'>SEARCH AI</p>
        <button className='spin' onClick={capture}><MdOutlineCamera size={50} className='bg-gray-950 text-cyan-500 rounded-full p-1 hover:bg-gray-800 '/></button>
      </div>

    </>
  )
}

export default Camera