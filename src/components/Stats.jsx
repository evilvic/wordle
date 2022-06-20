import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'

const Stats = () => {

  const { state, toggleStats } = useContext(Context)
  const { stats, solution, end, timer } = state

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
            <em>{ stats.games }</em>
            <p>Jugadas</p>
          </div>
          <div className='stats__score-item'>
            <em>{ stats.wins }</em>
            <p>Victorias</p>
          </div>
        </div>
        { end && <p className='stats__word'>La palabra era: <b>{ solution }</b></p> }
        <p>SIGUIENTE PALABRA</p>
        <p className='stats__time'><b>{ timer }</b></p>
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