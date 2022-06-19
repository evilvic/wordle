import { useContext } from 'react'
import { Context }  from '@/context.jsx'
import dark from '@/assets/dark.png'
import light from '@/assets/light.png'

const Toggle = () => {

  const { state, toggleTheme } = useContext(Context)
  const background = state.darkTheme ? dark : light

  return (
    <button
      className='g__styless-btn toggle'
      onClick={ () => toggleTheme() }
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={ state.darkTheme ? 'toggle__switch' : 'toggle__switch toggle__switch--sun' }/>
    </button>
  )

}

export default Toggle