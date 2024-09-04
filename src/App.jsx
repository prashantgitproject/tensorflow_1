import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const ImagePrediction = lazy(() => import('./pages/ImagePrediction'))
const VisionDetector = lazy(() => import('./pages/VisionDetector'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/image_prediction" element={<ImagePrediction/>} />
          <Route path="/vision_detector" element={<VisionDetector/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App