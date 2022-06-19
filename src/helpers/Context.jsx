import { createContext, Component } from 'react'
import raw from '@/helpers/words.txt';

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
    showInstructions: true,
    dictionary: [],
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

  handleInstructions = async () => {
    const seenInstructions = await window.localStorage.getItem('instructions')
    if (!seenInstructions) {
      await window.localStorage.setItem('instructions', true)
    } else {
      this.setState(prevState => ({
        ...prevState,
        showInstructions: false,
      }))
    }
  }

  handleDictionary = text => {
    const unicodeRegex = /\p{M}/u
    const accentsRegex = /á|é|í|ó|ú/
    const fiveCharactersWords = text.split('\n').filter( word => word.length === 5 )
    const wordsNoUnicode = fiveCharactersWords.filter( word => !unicodeRegex.test(word.normalize('NFD')) )
    const wordsWithSpecial = fiveCharactersWords.filter( word => word.includes('ñ') && !accentsRegex.test(word) )
    const dictionary = [...new Set([...wordsNoUnicode, ...wordsWithSpecial])]
    this.setState(prevState => ({
      ...prevState,
      dictionary,
    }))
  }

  getWords = async () => {
    try {
      const data = await fetch(raw)
      const text = await data.text()
      this.handleDictionary(text)
    } catch (error) {
      console.error('Error getting words, ', error)
    }
  }

  componentDidMount() {
    this.handleInstructions()
    this.getWords()
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