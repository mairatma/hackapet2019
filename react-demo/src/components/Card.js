import React from 'react'
import { Button } from 'antd'

import './Card.css'

class Card extends React.Component {
  render() {
    const { title, likes, description, photo, onLikeClick } = this.props

    let button = null
    if (likes < 10) {
      button = (
        <Button
          type="primary"
          shape="circle"
          icon="like"
          onClick={onLikeClick}
        />
      )
    }

    return (
      <div className="card">
        <img src={photo} alt="Joaquim" />
        <div className="card-content">
          <h1>
            {title}
            {button}
          </h1>
          <h2>{likes} likes</h2>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default Card
