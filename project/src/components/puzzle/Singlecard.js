import React from 'react'
import './Singlecard.css'
const Singlecard = ({card , handleChoice, flipped}) => {
console.log(card.src)
    const handleClick = () => {
        handleChoice(card)
    }

  return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
            <img  className="front" src={card.src} alt='card front'/>
            <img className='back' src='/img/cover.png' 
            onClick={handleClick} alt='card-back'/>
        </div>
    </div>
  )
}

export default Singlecard