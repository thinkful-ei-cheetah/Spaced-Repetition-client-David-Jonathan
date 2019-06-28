import React from 'react'

export default function Wordlist({words}) {
  return (
    <div>
    <h3 className="text-center bg-blue-400 text-1xl text-white font-bold py-2 px-4 rounded px-4 py-2 m-2 mt-6 border border-gray-500">Words to learn</h3>
    <div>
    <ul>
      {words.map((word, index) => (
        <li key={index}>
          <div className="bg-gray-100 clearfix">
            <div className="float-left text-gray-700 text-center bg-gray-200 px-4 py-2 m-2">
            {word.original}
            </div>
            <div className="float-right text-gray-700 text-center bg-green-200 px-4 py-2 m-2">
            {word.correct_count}
            </div>
            <div className="float-right text-gray-700 text-center bg-red-200 px-4 py-2 m-2">
            {word.incorrect_count}
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
    </div>
  )
}
