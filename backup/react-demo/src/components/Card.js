import React from 'react';
import { Button } from 'antd';

import './Card.css';

class Card extends React.Component {
  render() {
    const { photoSrc, title, description, likes, onClickLike } = this.props

    return (
      <div className="card">
        <div>
          <img src={photoSrc} alt="Profile" />
        </div>
        <div className="card-content">
          <h1>
            {title}
            <Button
              className="card-button"
              type="primary"
              icon="like"
              shape="circle"
              onClick={onClickLike}
            />
          </h1>
          <h2>{likes} likes</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Card;
