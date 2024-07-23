import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" ,matched:false},
  { "src": "/img/potion-1.png" ,matched:false},
  { "src": "/img/ring-1.png" ,matched:false},
  { "src": "/img/scroll-1.png" ,matched:false},
  { "src": "/img/shield-1.png" ,matched:false},
  { "src": "/img/sword-1.png" ,matched:false},
]
export default function App() {

  const [turns, setTurns] = useState(0)
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }
  const handleChoice = (card) => {
    if( !choiceTwo && !choiceOne){
      setChoiceOne(card)
      
    }
    else if(!choiceTwo){
      if(choiceOne !== card)
        setChoiceTwo(card)
    }
  }
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisable(true)
      if(choiceOne.src===choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])

  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTrun =>prevTrun+1)
    setDisable(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])
  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}> New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched === true}
            disable = {disable}
          />
        ))}
      </div>
      <h3>turn: {turns}</h3>
    </div>
  )
}
