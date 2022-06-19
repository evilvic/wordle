import { createContext, Component } from 'react'
import raw from '@/helpers/words.txt';
import { keyboard, buildKeyboard } from '@/helpers/index.js'

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
    showInstructions: true,
    showStats: true,
    dictionary: [],
    keyboard: null,
    current: '',
    guesses: [],
    solution: ''
  }

  // Theme
  toggleTheme = () => {
    this.setState(prevState => ({
      ...prevState,
      darkTheme: !prevState.darkTheme,
    }))
  }

  // Modals
  toggleInstructions = () => {
    this.setState(prevState => ({
      ...prevState,
      showInstructions: !prevState.showInstructions,
    }))
  }

  toggleStats = () => {
    this.setState(prevState => ({
      ...prevState,
      showStats: !prevState.showStats,
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
    const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)]
    this.setState(prevState => ({
      ...prevState,
      dictionary,
      solution: randomWord.toUpperCase()
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
    let newGuesses = guesses
    if (
      guesses.length === 0 ||
      guesses.length === 1 && current.length <= 5
    ) {
      newGuesses = [current.split('').map(letter => ({ value: letter }))]
    }
    else {
      newGuesses = [...newGuesses.slice(0, -1), current.split('').map(letter => ({ value: letter }))]
    }
    this.setState(prevState => ({
      ...prevState,
      guesses: newGuesses,
    }))
  }

  handleTry = current => {
    const { state: { solution, guesses, keyboard: oldKeyboard } } = this
    let newGuesses = guesses
    let lastTry
    if (current === solution) {
      lastTry = newGuesses.pop()
      lastTry = lastTry.map(el => ({ ...el, exist: true, position: true }))
      newGuesses = [...newGuesses, lastTry]
      // TODO: Build win logic
    } 
    else if (guesses.length <= 5) {
      lastTry = newGuesses.pop()
      lastTry = lastTry.map((el, idx) => ({ ...el, exist: solution.includes(el.value), position: solution.split('')[idx] === el.value }))
      newGuesses = [...newGuesses, lastTry, []]
      if (newGuesses.length === 6) newGuesses = newGuesses.slice(0, -1) // TODO: Loose game 
    }
    let newKeyboard = this.handleKeyboard([...oldKeyboard[0], ...oldKeyboard[1], ...oldKeyboard[2]], lastTry)
    newKeyboard = buildKeyboard(newKeyboard)
    this.setState(prevState => ({
      ...prevState,
      guesses: newGuesses,
      current: '',
      keyboard: newKeyboard
    }))
  }

  // Keyboard
  setKeyboard = () => {
    const newKeyboard = buildKeyboard(keyboard)
    this.setState(prevState => ({
      ...prevState,
      keyboard: newKeyboard
    }))
  }

  handleKeyboard = (keyboard, lastTry) => keyboard.map(key => {
    const element = lastTry.filter(el => el.value === key.value)[0]
    return element ? {...key, ...element} : {...key, exist: key.exist && undefined, position: key.position && undefined}
  })
  

  componentDidMount() {
    this.setKeyboard()
    this.handleInstructions()
    this.getWords()
  }

  render() { 

    const { 
      state, 
      toggleTheme, 
      toggleInstructions,
      toggleStats,
      handleKey,
    } = this

    return (
      <Context.Provider 
        value={{ 
          state, 
          toggleTheme, 
          toggleInstructions,
          toggleStats,
          handleKey,
        }}>
        { this.props.children }
      </Context.Provider>
    )

  }

}
 
export default Provider