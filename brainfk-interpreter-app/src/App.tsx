import './App.scss'
import { useEffect, useRef } from 'react';
import highlight from 'highlight.js';

const brainfuckTest =
    `++++++++++
[              Bucle para iniciar las memorias (se repite diez veces)
   >+++++++>++++++++++>+++++++++++>+++>+<<<<<-
      70        100       110      30  10
]
>++.              imprime 'H'   (72) 1
>>+.              imprime 'o'  (111) 3
---.                      'l'  (108) 3
<---.                     'a'   (97) 2
>>++.                   espacio (32) 4
<+.                       'm'  (109) 3
++++++++.                 'u'  (117) 3
-------.                  'n'  (110) 3
<+++.                     'd'  (100) 2
>+.                       'o'  (111) 3
>+.                       '!'   (33) 4
>.                        '\\n' (10) 5`;

function doBrainfuck(code: string, input: string = ''): string {
    const stack: number[] = [];
    let pointer = 0;
    let output: string[] = [], char: string;
    const chars = code.split('');
    let i = 0;
    let whileInits: Array<[number, number, boolean]> = [];
    let inputCodeKeys = input.split('').map(c => c.charCodeAt(0));
    let inputLoc = 0;

    for (i = 0; i < chars.length; i++) {
        char = chars[i];
        stack[pointer] ||= 0;

        switch (char) {
            case '>':
                pointer++;
                break;
            case '<':
                pointer--;
                break;
            case '+':
            case '-':
                stack[pointer] = (stack[pointer] + (char === '+' ? 1 : 255)) % 256;
                break;
            case '.':
                output.push(String.fromCharCode(stack[pointer]));
                break;
            case ',':
                stack[pointer] = inputCodeKeys[inputLoc++];
                break;
            case '[':
                whileInits.push([i, pointer, stack[pointer] === 0] || (whileInits.length > 0 && whileInits.at(-1)![2]));
                break;
            case ']':
                if (whileInits.length === 0)
                    return `Invalid character at ${i}`;

                const whileInit = whileInits.at(-1)!;

                if (whileInit[2] === true)
                    break;

                if (stack[pointer] === 0)
                    whileInits.pop();
                else
                    i = whileInit[0]; //;[whileInits.length-1][0];

                break;
        }
    }

    return output.join('');
}

function App() {
    const outputRef = useRef<HTMLTextAreaElement>(null);
    const codeRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    function onExecute(e: React.MouseEvent<HTMLButtonElement>) {
        outputRef.current!.value = doBrainfuck(codeRef.current!.value, inputRef.current!.value);
    }

    return (
        <div className="App">
            <header className='header'>
                <h1>BrainFk</h1>
            </header>
            <div className='card-container'>
                <div className='code-container'>
                    <textarea ref={codeRef}>
                        {brainfuckTest}
                    </textarea>
                </div><br />
                <div className='input-container'>
                    <textarea ref={outputRef}></textarea>
                    <textarea ref={inputRef}></textarea>
                </div>
                <button className='button' type='button' onClick={onExecute}>Execute</button>
            </div>
        </div>
    )
}

export default App
