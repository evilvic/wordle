import { useContext } from 'react'
import { Context }  from '@/context.jsx'
import { Question } from '@/assets/icons.jsx'

const Header = () => {

  const { toggleTheme } = useContext(Context)

  return (
    <header className='header'>
      <Question/>
      <h1>WORDLE</h1>
      <button onClick={() => toggleTheme() }>change</button>
    </header>
  )
}

export default Header