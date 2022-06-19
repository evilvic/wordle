import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { buildKeyboard } from '@/helpers/index.js'
import { Delete } from '@/assets/Icons.jsx'

const Keyboard = () => {
  const { state } = useContext(Context)
  const { keyboard } = state

  const newKeyboard = buildKeyboard(keyboard)
  

  return (
    <div className="keyboard">
      { newKeyboard.map((row, idx) => (
        <div
          key={ 'row' + idx } 
          className={`
            keyboard__row 
            keyboard__row--${idx+1}
          `}>
            { row.map(key => (
              <button
                key={ 'key' + key.value }
                className={`
                  keyboard__key 
                  ${key.value === 'ENTER' ? 'keyboard__key--enter' : key.value === 'DEL' ? 'keyboard__key--del' : ''}
                `}
              >
                { key.value === 'DEL' ? <Delete/> : key.value }
              </button>
            ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard