import { createContext, Component } from 'react'

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
    showInstructions: true,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      ...prevState,
      darkTheme: !prevState.darkTheme,
    }))
  }

  toggleInstructions = () => {
    this.setState(prevState => ({
      ...prevState,
      showInstructions: !prevState.showInstructions,
    }))
  }

  async componentDidMount() {
    const seenInstructions = await window.localStorage.getItem('instructions')
    if (!seenInstructions) {
      window.localStorage.setItem('instructions', true)
    } else {
      this.setState(prevState => ({
        ...prevState,
        showInstructions: false,
      }))
    }
  }

  render() { 

    const { 
      state, 
      toggleTheme, 
      toggleInstructions, 
    } = this

    return (
      <Context.Provider 
        value={{ 
          state, 
          toggleTheme, 
          toggleInstructions,
        }}>
        { this.props.children }
      </Context.Provider>
    )

  }

}
 
export default Provider