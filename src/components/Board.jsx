import { useContext } from 'react'
import { Context }  from '@/helpers/Context.jsx'
import { buildBoard } from '@/helpers/index.js'

const Board = () => {

  const { state } = useContext(Context)
  const { guesses } = state

  const newBoard = buildBoard(guesses)

  return (
    <div className='board'>
      { newBoard.map((row, idx) => (
        <div
          key={ 'row' + idx } 
          className='board__row'
        >
          { row.map((box, i) => (
              <div
                key={ 'box' + idx + i }
                className={`
                  board__box
                  ${box.exist && box.position ? 'board__box--green' :
                    box.exist && !box.position ? 'board__box--yellow' : 
                    box.value !== undefined ? 'board__box--border' : 
                    box.value && !box.exist && !box.position ? 'board__box--gray' : ''
                  }
                `}
              >
                { box.value }
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default Board