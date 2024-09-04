'use client'
import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='z-20 fixed inset-0 bg-gray-950 flex justify-center items-center' style={{height: '100vh'}}>
        <div className=''>
        <PuffLoader color="#2997d8"/>
        </div>
    </div>
  )
}