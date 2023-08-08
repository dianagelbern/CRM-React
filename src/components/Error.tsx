import React from 'react'

const Error: React.FC<{ mensaje?: any }> = (props) => {
  return (
    <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
        {props.mensaje}
    </div>
  )
}

export default Error