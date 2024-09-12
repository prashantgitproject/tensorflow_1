import React, { useEffect, useRef, useState } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import Camera from '../components/Camera';
import Loader from '../components/Loader';
import AnimatedCounter from '../components/AnimatedCounter';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AiLoader from '../components/AILoader';

const ImagePrediction = () => {

  const navigate = useNavigate();

  const imageRef = useRef(null);
  const [url, setUrl] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let [predictionNumbers, setPredictionNumbers] = useState([]);
  let [predictionDecimals, setPredictionDecimals] = useState([]);

  const runMobilenet = async () => {
    setIsLoading(true);
    const modal = await mobilenet.load();
    console.log('Mobilenet model loaded.');
    try {
      const predictions = await modal.classify(imageRef.current);
      console.log('Predictions: ');
      console.log(predictions );
      predictions.forEach((prediction) => {
        const number = (prediction.probability * 100).toFixed(2).toString();
        console.log('Number: ', number);
        predictionNumbers.push(Number(number.split('.')[0]));
        predictionDecimals.push(Number(number.split('.')[1]));
      });
      console.log('Prediction Numbers: ', predictionNumbers);
      console.log('Prediction Decimals: ', predictionDecimals);
      setPredictions(predictions);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(url){
      runMobilenet();
    }
    console.log(imageRef.current);
  }, [url])

  const reload = () => {
    setPredictionNumbers([]);
    setPredictionDecimals([]);
    setUrl(null);
    setPredictions(null);
  }


  return (
    <div className='bg-gray-900'>
    {url && <img className='hidden' src={url} alt="image" ref={imageRef} />}
    {isLoading ? <AiLoader/> : (
      <>
            {predictions ? (
              <div className='md:h-screen bg-gray-900'>
                <div className='flex justify-center items-center p-2'>
                 <img className='rounded-lg' src={url} alt="image" />
                </div>
                <h3 className='text-center text-xl font-semibold text-white my-2'>PREDICTIONS:</h3>
                <div className='w-[95vw] md:w-[40vw] mx-auto flex flex-col gap-2 justify-end items-center text-xl my-8'>
                  {predictions && predictions.map((prediction, index) => (
                    <div key={index} className='flex justify-between items-center w-full'>
                      <p className='text-white rajdhani-semibold'>{prediction.className}</p>
                      <p className='text-gray-400 text-2xl'>{<AnimatedCounter from={0} to={predictionNumbers[index]}/>}.{<AnimatedCounter from={0} to={predictionDecimals[index]}/>}%</p>
                    </div>
                  ))}
                </div>
                <div className='flex justify-center items-center mt-2'>
                  <button className='p-2 text-white font-semibold bg-cyan-500 hover:bg-cyan-400 rounded-lg' onClick={reload}>Try Again</button>
                </div>
              </div>
          ) : (
            <div className='h-screen bg-gray-900'>
              <div className='h-[60vh] p-2'>
              <Camera url={url} setUrl={setUrl} imageRef={imageRef}/>
              </div>
              
            </div>
            )
          }
      </>
    )}
    <div className='md:hidden flex justify-end p-2 items-center mt-16'>
      <button onClick={() => navigate('/vision_detector')} className='flex justify-center items-center gap-2 p-1 px-2 text-white font-semibold bottom-4 right-4 rounded-full bg-cyan-700 hover:bg-cyan-600 shadow-md shadow-cyan-500/50'>Try Vision AI <FaArrowAltCircleRight /></button>
    </div>
      <button onClick={() => navigate('/vision_detector')} className='hidden md:absolute md:flex justify-center items-center gap-2 p-1 px-2 text-white font-semibold bottom-4 right-4 rounded-full bg-cyan-700 hover:bg-cyan-600 shadow-md shadow-cyan-500/50'>Try Vision AI <FaArrowAltCircleRight /></button>
    </div>
  )
}

export default ImagePrediction