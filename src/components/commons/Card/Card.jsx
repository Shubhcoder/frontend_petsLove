import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.module.scss'

const Card = ({ history, image, namePet, altImage }) => {
  const verifyText = () => {
    let text
    if (history.length > 110) {
      return (text = `${history.substring(0, 110)}...`)
    } else {
      return (text = history)
    }
  }
    
  return (
    <div className={styles.containerCard}>
      <img className={styles.imgCard} src={image} alt={altImage} />
      <div className={styles.title}>{namePet}</div>
      <div className={styles.textHistory}>{verifyText()}</div>
    </div>
  )
}

Card.propTypes = {}

export default Card