import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            setShowText(true);
        }, 2500);
        setTimeout(() => {
            setShowButtons(true);
        }, 5000);
        setTimeout(() => {
            setShowBrand(true);
        }, 5500);

    }, []);

    const [showButtons, setShowButtons] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showBrand, setShowBrand] = useState(false);

    const variants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    };

  return (
    <>
    <div>
        <img className='hidden md:block absolute h-[150vh] md:w-[100vw] w-[50rem] opacity-50 -top-[50vh]' src="/dotted_grid.png" alt="bg" />
        <img className='md:hidden absolute h-[100vh] w-[100vw] top-0 bottom-0' src="/dotted_grid.png" alt="bg" />
    </div>
    <div className="bg-gray-950 h-[100vh] text-white">
        <motion.div initial= {variants.hidden} animate= {variants.visible} exit= {variants.exit}>
        <div className='h-[40vh] flex justify-center items-center'>
            <motion.h1 className="rajdhani-semibold text-5xl font-bold text-center" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 2 }}>
            Welcome to the world of <span className='text-cyan-500'>AI</span>
            </motion.h1>
        </div>
        <div className='h-[20vh] flex justify-center items-center'>
            {showText && (
                <motion.h1 className="rajdhani-semibold text-2xl font-bold text-center" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 2 }}>
                Choose an <span className='text-3xl text-gray-400'>AI</span> model to get started
                </motion.h1>
            )}
        </div>
        <div className='h-[40vh] flex justify-center items-center'>
            {showButtons && (
            <div className="flex justify-center items-center gap-4 md:gap-16 font-semibold">
                <motion.button onClick={() => navigate('/image_prediction')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="z-10 hover:scale-110 transition-all duration-300 bg-cyan-600 shadow-2xl shadow-cyan-400 hover:bg-cyan-500 text-white px-4 md:px-8 py-2 rounded-md">
                    Image AI
                </motion.button>
                <motion.button onClick={() => navigate('/vision_detector')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.5 }} className="z-10 hover:scale-110 transition-all duration-300 bg-cyan-600 shadow-2xl shadow-cyan-400 hover:bg-cyan-500 text-white px-4 md:px-8 py-2 rounded-md">
                    Vision AI
                </motion.button>
            </div>
            )}
        </div>
        {showBrand && (
            <motion.h1 className="absolute bottom-1 left-1 flex gap-1 items-center rajdhani-semibold text-sm font-bold text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
            Made with <FaHeart className='text-cyan-500'/> by Prashant
            </motion.h1>
        )}


    </motion.div>
    </div>
    </>
  )
}

export default Home