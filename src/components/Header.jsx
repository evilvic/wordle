import { useContext } from 'react'
import { Context }  from '@/context.jsx'
import { Question, Stats } from '@/assets/icons.jsx'
import Toggle from '@/components/Toggle.jsx'

const Header = () => {

  const { toggleInstructions } = useContext(Context)

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
        <button className='g__styless-btn'>
          <Stats/>
        </button>
        <Toggle/>
      </div>
    </header>
  )

}

export default Header
