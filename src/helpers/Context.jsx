import { createContext, Component } from 'react'
import raw from '@/helpers/words.txt';
import { keyboard, buildKeyboard } from '@/helpers/index.js'

export const Context = createContext()

class Provider extends Component {

  state = {
    darkTheme: true,
    showInstructions: true,
    showStats: false,
    dictionary: [],
    keyboard: null,
    current: '',
    guesses: [],
    solution: '',
    end: false,
    timer: null,
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
    const { state: { end, dictionary, stats } } = this
    const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)]
    if (stats.words.includes(randomWord)) this.toggleStats()
    if (end) {
      this.setKeyboard()
      clearInterval(this.clock)
      this.clock = setInterval(() => this.tick(), 100)
    }
    this.setState(prevState => ({
      ...prevState,
      showStats: !prevState.showStats,
      current: end ? '' : prevState.current,
      guesses: end ? [] : prevState.guesses,
      end: end ? !end : false,
      solution: end ? randomWord.toUpperCase() : prevState.solution,
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

  handleStats = async () => {
    let stats = await window.localStorage.getItem('stats')
    if (!stats) {
      stats = JSON.stringify({ games: 0, wins: 0, words: [] })
      await window.localStorage.setItem('stats', stats)
    } else {
    }
    this.setState(prevState => ({
      ...prevState,
      stats: JSON.parse(stats),
    }))
  }

  setStats = (solution, win) => {
    const { state: { stats } } = this
    const newStats = {
      games: stats.games + 1,
      wins: win ? stats.wins + 1 : stats.wins,
      words: [...stats.words, solution]
    }
    this.setState(prevState => ({
      ...prevState,
      stats: newStats,
      end: true,
      showStats: true,
    }))
    window.localStorage.setItem('stats', JSON.stringify(newStats))
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
      this.setStats(solution, true)
      clearInterval(this.clock)
    } 
    else if (guesses.length <= 5) {
      lastTry = newGuesses.pop()
      lastTry = lastTry.map((el, idx) => ({ ...el, exist: solution.includes(el.value), position: solution.split('')[idx] === el.value }))
      newGuesses = [...newGuesses, lastTry, []]
      if (newGuesses.length === 6) {
        newGuesses = newGuesses.slice(0, -1)
        this.setStats(solution, false)
        clearInterval(this.clock)
      } 
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
  
  listenKeyboard = e => {
    const { state: { showInstructions, showStats } } = this
    if (showInstructions || showStats ) return
    if (e.keyCode > 64 && e.keyCode < 91 || e.keyCode === 186) {
      this.handleKey(e.key.toUpperCase())
    }
    else if (e.keyCode === 13) {
      this.handleKey('ENTER')
    }
    else if (e.keyCode === 8) {
      this.handleKey('DEL')
    }
    else {
      return
    }
  }

  // Timer
  tick = () => {
    const { state: { solution } } = this
    let d = new Date()
    const seconds = d.getMinutes() * 60 + d.getSeconds()
    const fiveMin = 60 * 5
    const timeleft = fiveMin - seconds % fiveMin
    const result = parseInt(timeleft / 60) + ':' + (timeleft % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping:false })
    if (result === '0:00') {
      this.setStats(solution, false)
      clearInterval(this.clock)
    }
    this.setState(prevState => ({
      ...prevState,
      timer: result,
    }))
  }

  componentDidMount() {
    this.setKeyboard()
    this.handleInstructions()
    this.handleStats()
    this.getWords()
    document.addEventListener('keydown', (e) => this.listenKeyboard(e))
    this.clock = setInterval(() => this.tick(), 500)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.listenKeyboard(e))
    clearInterval(this.clock)
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