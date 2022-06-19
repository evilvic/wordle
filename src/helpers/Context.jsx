import { createContext, Component } from 'react'
import raw from '@/helpers/words.txt';
import { keyboard } from '@/helpers/index.js'

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
    showInstructions: true,
    dictionary: [],
    keyboard: keyboard,
    current: '',
    guesses: [],
    solution: 'MADRE'
  }

  // Theme
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

  // Instructions
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

  // Dictionary
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

  // Game
  handleKey = value => {
    const { state: { current } } = this
    let newCurrent
    if (value === 'ENTER' && current.length === 5) {
      this.handleTry(current)
      return
    }
    else if (value === 'DEL' && current.length > 0) {
      newCurrent = current.split('').slice(0, -1).join('')
    } 
    else if (current.length < 5 && value !== 'DEL' && value !== 'ENTER') {
      newCurrent = current + value
    }
    else {
      return
    }
    this.setState(prevState => ({
      ...prevState,
      current: newCurrent,
    }))
    this.handleGuesses(newCurrent)
  }

  handleGuesses = current => {
    const { state: { guesses } } = this
    let newGuesses = []
    if (
      guesses.length === 0 ||
      guesses.length === 1 && current.length <= 5
    ) {
      newGuesses = [current.split('').map(letter => ({ value: letter }))]
    }
    this.setState(prevState => ({
      ...prevState,
      guesses: newGuesses,
    }))
  }

  handleTry = current => {
    const { state: { solution, guesses } } = this
    let newGuesses = guesses
    if (current === solution) {
      let lastTry = newGuesses.pop()
      lastTry = lastTry.map(el => ({ ...el, exist: true, position: true }))
      newGuesses = [...newGuesses.slice(0, -1), lastTry]
      // TODO: Build win logic
    } 
    else if (guesses.length <= 5) {
      let lastTry = newGuesses.pop()
      lastTry = lastTry.map((el, idx) => ({ ...el, exist: solution.includes(el.value), position: solution.split('')[idx] === el.value }))
      newGuesses = [...newGuesses.slice(0, -1), lastTry, []]
    }
    this.setState(prevState => ({
      ...prevState,
      guesses: newGuesses,
    }))
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
      handleKey,
    } = this

    return (
      <Context.Provider 
        value={{ 
          state, 
          toggleTheme, 
          toggleInstructions,
          handleKey,
        }}>
        { this.props.children }
      </Context.Provider>
    )

  }

}
 
export default Provider