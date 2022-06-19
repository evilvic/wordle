export const keyboard = [
  {
    value: 'A',
    row: 2,
    position: 1,
  },
  {
    value: 'B',
    row: 3,
    position: 6,
  },
  {
    value: 'C',
    row: 3,
    position: 4,
  },
  {
    value: 'D',
    row: 2,
    position: 3,
  },
  {
    value: 'E',
    row: 1,
    position: 3,
  },
  {
    value: 'F',
    row: 2,
    position: 4,
  },
  {
    value: 'G',
    row: 2,
    position: 5,
  },
  {
    value: 'H',
    row: 2,
    position: 6,
  },
  {
    value: 'I',
    row: 1,
    position: 8,
  },
  {
    value: 'J',
    row: 2,
    position: 7,
  },
  {
    value: 'K',
    row: 2,
    position: 8,
  },
  {
    value: 'L',
    row: 2,
    position: 9,
  },
  {
    value: 'M',
    row: 3,
    position: 8,
  },
  {
    value: 'N',
    row: 3,
    position: 7,
  },
  {
    value: 'Ñ',
    row: 2,
    position: 10,
  },
  {
    value: 'O',
    row: 1,
    position: 9,
  },
  {
    value: 'P',
    row: 1,
    position: 10,
  },
  {
    value: 'Q',
    row: 1,
    position: 1,
  },
  {
    value: 'R',
    row: 1,
    position: 4,
  },
  {
    value: 'S',
    row: 2,
    position: 2,
  },
  {
    value: 'T',
    row: 1,
    position: 5,
  },
  {
    value: 'U',
    row: 1,
    position: 7,
  },
  {
    value: 'V',
    row: 3,
    position: 5,
  },
  {
    value: 'W',
    row: 1,
    position: 2,
  },
  {
    value: 'X',
    row: 3,
    position: 3,
  },
  {
    value: 'Y',
    row: 1,
    position: 6,
  },
  {
    value: 'Z',
    row: 3,
    position: 2,
  },
  {
    value: 'DEL',
    row: 3,
    position: 9,
  },
  {
    value: 'ENTER',
    row: 3,
    position: 1,
  },
]

export const buildKeyboard = keyboard => {
  const firstRow = buildRow(keyboard, 1)
  const secondRow = buildRow(keyboard, 2)
  const thirdRow = buildRow(keyboard, 3)
  return [ firstRow, secondRow, thirdRow ]
}

const buildRow = (keyboard, row) => keyboard
  .filter(key => key.row === row)
  .sort((a, b) => a.position - b.position)