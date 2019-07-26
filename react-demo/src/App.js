import React from 'react';

import Card from './components/Card'

import joaquimPhoto from './images/joaquim.jpg'
import mairaPhoto from './images/maira.jpg'

import './App.css';
import 'antd/dist/antd.css'

// Dados que usamos antes de passar a chamar a CatApi.
const people = [
  {
    id: 123,
    name: 'Joaquim Bello',
    photo: joaquimPhoto,
    status: 'Filho de Maíra Bello.'
  },
  {
    id: 456,
    name: 'Maíra Bello',
    photo: mairaPhoto,
    status: 'Mãe de Joaquim Bello.'
  }
]

class App extends React.Component {
  state = {
    cats: [],
    likesById: {}
  }

  componentDidMount() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=20&page=10&order=Desc')
      .then(function(result) {
        return result.json()
      })
      .then((result) => {
        this.setState({
          cats: result
        })
      })
  }

  render() {
    const { cats, likesById } = this.state
    if (cats.length === 0) {
      return <div>Loading...</div>
    }

    const cards = []
    for (let i = 0; i < cats.length; i++) {
      cards.push(
        <Card
          key={cats[i].id}
          photo={cats[i].url}
          title={'Cat #' + i}
          description={cats[i].status}
          likes={likesById[cats[i].id] || 0}
          onLikeClick={() => this.handleLikeClick(cats[i].id)}
        />
      )
    }

    return (
      <div className="App">
        {cards}
      </div>
    );
  }

  handleLikeClick = (id) => {
    this.state.likesById[id] = (this.state.likesById[id] || 0) + 1
    this.setState({
      likesById: this.state.likesById
    })
  }
}

export default App;
