import { useContext } from 'react'
import { Context }  from '@/context.jsx'

const Switch = () => {

  const { toggleTheme } = useContext(Context)

  return (
    <button
      className='g__styless-btn'
      onClick={ () => toggleTheme() }
    >change</button>
  )
  
}

export default Switch