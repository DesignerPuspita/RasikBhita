import React from 'react'
import Link from 'next/link';


const RedButton = ({ buttonText , onClick}) => {
  return (
    <>
        
        <div className="hvr-sweep-to-right" onClick={onClick}>
        { buttonText }
        </div>
    </>
  )
}

export default RedButton