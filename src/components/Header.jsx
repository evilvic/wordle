import { Question, Stats } from '@/assets/icons.jsx'
import Toggle from '@/components/Toggle.jsx'

const Header = () => {

  return (
    <header className='header'>
      <button className='g__styless-btn'>
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
