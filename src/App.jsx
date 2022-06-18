import { useContext } from 'react'
import { Context }  from '@/context.jsx'
import { dark, light } from '@/styles/helpers.js'

const App = () => {

  const { state, toggleTheme } = useContext(Context)
  const theme = state.darkTheme ? dark : light

  return (
    <div 
      id="app"
      style={ theme }
    >
      <button onClick={() => toggleTheme() }>change</button>
    </div>
  )

}

export default App
