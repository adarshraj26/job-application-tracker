import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Job Application Tracker</h1>
        <p className="text-gray-600 mb-2">Welcome to your job search companion!</p>
        <p className="text-sm text-gray-500">React + TypeScript + Vite is working!</p>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Current time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default App
