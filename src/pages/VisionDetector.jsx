import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utility/drawRect";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VisionDetector = () => {

  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWebCam, setShowWebCam] = useState(false);
  const [loadModel, setLoadModel] = useState(false);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    setLoadModel(true);
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

  const videoConstraints = {
    width: 540,
    facingMode: "environment"
}

  return (
    <div className="md:h-screen bg-gray-900">
      {showWebCam && (
        <div className="h-[70vh] md:h-[50vh] flex justify-center items-center">
          <Webcam className="absolute z-10 left-1 right-1 top-2 mx-auto text-center w-[95vw] h-[70vh] md:w-fit md:h-[60vh] rounded-lg" 
            ref={webcamRef}
            muted={true} 
            videoConstraints={videoConstraints}
          />

          <canvas className="absolute z-20 left-1 right-1 top-2 mx-auto text-center w-[95vw] h-[65vh] md:w-fit md:h-[60vh] rounded-lg"
            ref={canvasRef}
          />

          <h2 className="rajdhani-medium text-sm text-gray-500 text-center my-2">{loadModel ? 'Model Loaded!' : 'Please wait model is being loaded...'}</h2>
        </div>
      )}


      <div className="h-[30vh] flex flex-col justify-center items-center">
      {!showWebCam && (
        <h2 className="text-center text-lg text-gray-500 rajdhani-semibold mb-1">Turn on the Cam to start Detecting!</h2>
      )}
        <button onClick={()=>setShowWebCam(!showWebCam)} className="z-30 rounded-lg bg-cyan-500 hover:bg-cyan-400 p-2 font-semibold">{showWebCam ? 'Turn Off' : 'Turn On'}</button>
      </div>
      {!showWebCam && (
        <div className="md:hidden h-[50vh]"/>
      )}
      <div className='md:hidden h-[20vh] flex justify-end p-2 items-end '>
        <button onClick={() => navigate('/image_prediction')} className='flex justify-center items-center gap-2 p-1 px-2 text-white font-semibold rounded-full bg-cyan-700 hover:bg-cyan-600 shadow-md shadow-cyan-500/50'>Try Image AI <FaArrowAltCircleRight /></button>
      </div>
      
      <button onClick={() => navigate('/image_prediction')} className='hidden absolute md:flex justify-center items-center gap-2 p-1 px-2 text-white font-semibold bottom-2 md:bottom-4 right-4 rounded-full bg-cyan-700 hover:bg-cyan-600 shadow-md shadow-cyan-500/50'>Try Image AI <FaArrowAltCircleRight /></button>

    </div>
  );
}

export default VisionDetector