import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { dark, light } from '@/styles/helpers.js'
import Instructions from '@/components/Instructions.jsx'
import Stats from '@/components/Stats.jsx' 
import Header from '@/components/Header.jsx'
import Board from '@/components/Board.jsx'
import Keyboard from '@/components/Keyboard.jsx' 

const App = () => {

  const { state } = useContext(Context)
  const { darkTheme, showInstructions, showStats } = state
  const theme = darkTheme ? dark : light

  return (
    <div 
      id="app"
      style={ theme }
    >
      { showInstructions && <Instructions/> }
      { showStats && <Stats/> }
      <Header/>
      <Board/>
      <Keyboard/>
    </div>
  )

}

export default App
