import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'

const Instructions = () => {

  const { toggleInstructions } = useContext(Context)

  return (
    <>
      <div 
        className='g__dialog-back'
        onClick={ () => toggleInstructions() }
      />
      <div className='g__dialog instructions'>
        <h2 className='instructions__title'>Cómo jugar</h2>
        <p>Adivina la palabra oculta en cinco intentos.</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>
          Después de cada intento el color de las letras cambia 
          para mostrar qué tan cerca estás de acertar la palabra.
        </p>
        <h3>Ejemplos</h3>
        <div className='board__row'>
          <div className='board__box board__box--green'>G</div>
          <div className='board__box board__box--border'>A</div>
          <div className='board__box board__box--border'>T</div>
          <div className='board__box board__box--border'>O</div>
          <div className='board__box board__box--border'>S</div>
        </div>
        <p>
          La letra <b>G</b> está en la palabra y en la posición 
          correcta.
        </p>
        <div className='board__row'>
          <div className='board__box board__box--border'>V</div>
          <div className='board__box board__box--border'>O</div>
          <div className='board__box board__box--yellow'>C</div>
          <div className='board__box board__box--border'>A</div>
          <div className='board__box board__box--border'>L</div>
        </div>
        <p>
          La letra <b>C</b> está en la palabra pero en la 
          posición incorrecta.
        </p>
        <div className='board__row'>
          <div className='board__box board__box--border'>C</div>
          <div className='board__box board__box--border'>A</div>
          <div className='board__box board__box--border'>N</div>
          <div className='board__box board__box--border'>T</div>
          <div className='board__box board__box--gray'>O</div>
        </div>
        <p>La letra <b>O</b> no está en la palabra.</p>
        <p>
          Puede haber letras repetidas. Las pistas son 
          independientes para cada letra.
        </p>
        <p className='instructions__time'>¡Una palabra nueva cada 5 minutos!</p>
        <button 
          className='g__dialog-btn'
          onClick={ () => toggleInstructions() }
        >
          !JUGAR¡
        </button>
      </div>
    </>
  )
}

export default Instructions