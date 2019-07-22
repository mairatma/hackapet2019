import React from 'react';
import { Button, Input } from 'antd';

import './App.css';
import 'antd/dist/antd.css'

import joaquimPhoto from './images/joaquim.jpg'
import mairaPhoto from './images/maira.jpg'

import Card from './components/Card'

const people = [
  {
    id: 1,
    name: 'Joaquim Bello',
    photoUrl: joaquimPhoto,
    status: 'Mamãe ama tanto que só falta explodir.'
  },

  {
    id: 2,
    name: 'Maira Bello',
    photoUrl: mairaPhoto,
    status: 'Apaixonada pelo filhote, Joaquim Bello.'
  }
]

const CAT_URI = 'https://api.thecatapi.com/v1/images/search?limit=20&page=10&order=Desc'

class App extends React.Component {
  state = {
    reversed: false,
    likesById: {}
  }

  componentDidMount() {
    fetch(CAT_URI)
      .then(result => result.json())
      .then(result => {
        this.setState({ cats: result })
      })
  }

  render() {
    const { cats, likesById } = this.state
    const orderedItems = (this.state.reversed ? cats.concat().reverse() : cats) || []
    const finalItems = orderedItems.filter((item) => {
      return !this.state.searchTerm || item.name.match(this.state.searchTerm)
    })

    let totalLikes = 0
    if (cats) {
      for (let index = 0; index < cats.length; index++) {
        totalLikes += likesById[cats[index].id] || 0
      }
    }

    return (
      <div className="app">
        <div className="app-controls">
          <Input placeholder="Search" onChange={this.handleSearchChange} />
          <Button onClick={this.handleReverseButtonClick}>Inverter ordem</Button>
        </div>
        <div>
          Total de likes: {totalLikes}.
        </div>
        {finalItems.map((item, index) => {
          return (
            <Card
              key={item.id}
              photoSrc={item.url}
              title={'Cat ' + index}
              description={item.breeds.length > 0 ? item.breeds[0].name : 'Unknown breed.'}
              likes={likesById[item.id] || 0}
              onClickLike={() => this.handleIncrementLike(item.id)}
            />
          )
        })}
      </div>
    );
  }

  handleReverseButtonClick = () => {
    this.setState({ reversed: !this.state.reversed })
  }

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  handleIncrementLike = id => {
    const { likesById } = this.state
    likesById[id] = (likesById[id] || 0) + 1
    this.setState({ likesById: likesById })
  }
}

export default App;
