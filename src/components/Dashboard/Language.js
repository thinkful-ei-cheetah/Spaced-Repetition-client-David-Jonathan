import React from 'react'

export default function Language({language}) {
  return (
    <div >
      <h2 className="text-center bg-teal-100 px-4 py-2 m-2">{language.name}</h2>
      <h2 className="text-center bg-gray-200 px-4 py-2 m-2">Total Correct Answers: {language.total_score}</h2>
    </div>
  )
}
