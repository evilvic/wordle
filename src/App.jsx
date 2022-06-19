import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { dark, light } from '@/styles/helpers.js'
import Instructions from '@/components/Instructions.jsx' 
import Header from '@/components/Header.jsx'
import Keyboard from '@/components/Keyboard.jsx' 

const App = () => {

  const { state } = useContext(Context)
  const { darkTheme, showInstructions } = state
  const theme = darkTheme ? dark : light

  return (
    <div 
      id="app"
      style={ theme }
    >
      { showInstructions && <Instructions/> }
      <Header/>
      <Keyboard/>
    </div>
  )

}

export default App
