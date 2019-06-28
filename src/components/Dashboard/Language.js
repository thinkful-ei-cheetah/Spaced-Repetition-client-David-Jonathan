import React from 'react'

export default function Language({language}) {
  return (
    <div >
      <h2 className="text-center bg-blue-400 text-3xl text-white font-bold py-2 px-4 rounded px-4 py-2 m-2 border border-gray-500">{language.name}</h2>
      <h2 className="text-center bg-gray-200 rounded px-4 py-2 m-2 border border-gray-300">Total Correct Answers: {language.total_score}</h2>
    </div>
  )
}
