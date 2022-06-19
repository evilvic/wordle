
const Keyboard = () => {
  const first = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const second = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
  const third = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  return (
    <div className="keyboard">
      <div className="keyboard__row-1">
        { first.map(letter => (
          <button 
            key={ letter }
            className="keyboard__key"
          >
            { letter }
          </button>
        ))}
      </div>
      <div className="keyboard__row-2">
      { second.map(letter => (
          <button 
            key={ letter }
            className="keyboard__key"
          >
            { letter }
          </button>
        ))}
      </div>
      <div className="keyboard__row-3">
      { third.map(letter => (
          <button 
            key={ letter }
            className="keyboard__key"
          >
            { letter }
          </button>
        ))}
      </div>
    </div>
  )
}

export default Keyboard