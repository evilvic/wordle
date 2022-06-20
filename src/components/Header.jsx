import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { Question, Stats } from '@/assets/Icons.jsx'
import Toggle from '@/components/Toggle.jsx'

const Header = () => {

  const { toggleInstructions, toggleStats } = useContext(Context)

  return (
    <header className='header'>
      <button 
        className='g__styless-btn'
        onClick={ () => toggleInstructions() }
      >
        <Question/>
      </button>
      <h1>WORDLE</h1>
      <div className='header__right'>
        <button 
          className='g__styless-btn'
          onClick={ () => toggleStats() }
        >
          <Stats/>
        </button>
        <Toggle/>
      </div>
    </header>
  )

}

export default Header
