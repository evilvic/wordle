import { useContext } from 'react'
import { Context }  from '@/context.jsx'
import { dark, light } from '@/styles/helpers.js'
import Header from '@/components/Header.jsx' 

const App = () => {

  const { state } = useContext(Context)
  const theme = state.darkTheme ? dark : light

  return (
    <div 
      id="app"
      style={ theme }
    >
      <Header/>
    </div>
  )

}

export default App
