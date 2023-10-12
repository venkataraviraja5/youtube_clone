import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h1>OOPS!!!!!</h1>
      <h2>Somehting went wrong</h2>
      <Link to="/"><p>Back to Home</p></Link>
    </div>
  )
}

export default Error
