import { createContext, Component } from 'react'

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      ...prevState,
      darkTheme: !prevState.darkTheme,
    }))
  }

  render() { 

    const { state, toggleTheme } = this

    return (
      <Context.Provider value={{ state, toggleTheme }}>
        { this.props.children }
      </Context.Provider>
    )

  }

}
 
export default Provider