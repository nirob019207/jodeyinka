import React from 'react'

export const CommentSection = () => {
  return (
    <div><div className="lg:w-[360px] animate-pulse">
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-6 max-h-[500px] overflow-y-auto slim-scroll">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="mt-6">
      <div className="w-full h-20 border-b border-gray-300 rounded-md p-3 "></div>
      <div className="flex justify-end mt-4 gap-2">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          <div className="h-5 bg-gray-200 rounded"></div>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          <div className="h-5 bg-gray-200 rounded"></div>
        </button>
      </div>
    </div>
  </div></div>
  )
}
