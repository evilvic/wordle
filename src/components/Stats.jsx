import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'

const Stats = () => {

  const { toggleStats } = useContext(Context)

  return (
    <>
      <div 
        className='g__dialog-back'
        onClick={ () => toggleStats() }
      />
      <div className='g__dialog stats'>
        <h2 className='stats__title'>Estadísticas</h2>
        <div className='stats__score'>
          <div className='stats__score-item'>
            <em>8</em>
            <p>Jugadas</p>
          </div>
          <div className='stats__score-item'>
            <em>2</em>
            <p>Victorias</p>
          </div>
        </div>
        <p className='stats__word'>La palabra era: <b>PERRO</b></p>
        <p>SIGUIENTE PALABRA</p>
        <p className='stats__time'><b>04:10</b></p>
        <button 
          className='g__dialog-btn'
          onClick={ () => toggleStats() }
        >
          Aceptar
        </button>
      </div>
    </>
  )
}

export default Stats