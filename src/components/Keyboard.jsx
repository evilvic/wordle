import { useContext, useState, useEffect } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { Delete } from '@/assets/Icons.jsx'

const Keyboard = () => {

  const { state, handleKey } = useContext(Context)
  const { keyboard } = state

  return (
    <div className="keyboard">
      { keyboard && keyboard.map((row, idx) => (
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
                  ${key.exist && key.position ? 'keyboard__key--green' :
                    key.exist && !key.position ? 'keyboard__key--yellow' : 
                    key.exist !== undefined && !key.exist && !key.position ? 'keyboard__key--gray' : ''
                  }
                `}
                onClick={ () => handleKey(key.value) }
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