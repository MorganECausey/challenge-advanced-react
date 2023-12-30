import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  formValue: yup
    .string()
    .email('Ouch: email must be a valid email')
    .required('Ouch: email is required')
    .notOneOf(['foo@bar.baz'], 'foo@bar.baz failure #71')
})
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2

export default function AppFunctional(props) {
  const [x, setX] = useState(initialX)
  const [y, setY] = useState(initialY)
  const [xy, setXY] = useState(initialIndex)
  const [moves, setMoves] = useState(0)
  const [messages, setMessages] = useState(initialMessage)
  const [formValue, setFormValue] = useState('')
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    return (`(${x},${y})`)
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function reset() {
    setMoves(0)
    setXY(initialIndex)
    setX(initialX)
    setY(initialY)
    setMessages(initialMessage)
    setFormValue('')
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left'){
      if(x - 1 === 0){
        setMessages("You can't go left")
        return xy
      }
      setX(x-1)
      setXY(xy-1)
      setMoves(moves + 1)
      setMessages(initialMessage)
    }
    if(direction === 'down'){
      if(y + 1 === 4){
        setMessages("You can't go down")
        return xy
      }
      setY(y+1)
      setXY(xy+3)
      setMoves(moves + 1)
      setMessages(initialMessage)
    }
    if(direction === 'right'){
      if(x + 1 === 4){
        setMessages("You can't go right")
        return xy
      }
      setX(x+1)
      setXY(xy + 1)
      setMoves(moves + 1)
      setMessages(initialMessage)
    }
    if(direction === 'up'){
      if(y -1 === 0){
      setMessages("You can't go up")
      return xy
      }
      setY(y - 1)
      setXY(xy - 3)
      setMoves(moves + 1)
      setMessages(initialMessage)
    }

  }

  function move(evt) {
    getNextIndex(evt)
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setFormValue(evt.target.value)
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
