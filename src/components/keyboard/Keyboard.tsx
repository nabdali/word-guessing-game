import {KeyValue} from '../../lib/keyboard'
import {getStatuses} from '../../lib/statuses'
import {Key} from './Key'
import {useEffect} from 'react'
import {ENTER_TEXT, DELETE_TEXT} from '../../constants/strings'

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    guesses: string[]
    keyboardName: string
}

type KeyboardType = {
    name: string,
    content: Array<Array<KeyValue>>
}

const keyboards: KeyboardType[] = [{
    name: 'azerty',
    content: [
        ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
        ["ENTER", "W", "X", "C", "V", "B", "N", "DELETE"],
    ],
},
{
    name: 'qwerty',
    content: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
    ]
}];

export const Keyboard = ({onChar, onDelete, onEnter, guesses, keyboardName}: Props) => {
    const charStatuses = getStatuses(guesses)

    const onClick = (value: KeyValue) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                onEnter()
            } else if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key.toUpperCase()
                if (key.length === 1 && key >= 'A' && key <= 'Z') {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onEnter, onDelete, onChar])

    return (
        <div>
            {keyboards.find(keyboard => keyboard.name === keyboardName)?.content.map((keysLine, key) =>
                <>
                    {key <= 1 &&
                      <div className="flex justify-center mb-1">
                          {keysLine.map(key =>
                              <Key value={key} onClick={onClick} status={charStatuses[key]}/>
                          )}
                      </div>}
                    {key === 2 &&
                      <div className="flex justify-center mb-1">
                          {keysLine.map(key =>
                              key.length > 1 ?
                                  <Key width={65.4} value={key} onClick={onClick}>
                                      {key}
                                  </Key> :
                                  <Key value={key} onClick={onClick} status={charStatuses[key]}/>
                          )}
                      </div>}
                </>
            )}
        </div>
    )
}
