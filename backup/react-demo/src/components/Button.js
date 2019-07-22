import React from 'react'

import './Button.css'

function Button(props) {
  return (
    <button className="button">{props.children}</button>
  )
}

export default Button
