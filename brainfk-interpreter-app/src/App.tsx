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
        <div className='relative container mx-auto h-screen bg-red-500 font-mono text-white flex flex-col'>
            <header className='bg-red-800 text-center py-4'>
                <h1 className='text-3xl '>BrainFk</h1>
            </header>
            <main className='grid grid-cols-2 grid-rows-3 h-full w-full text-slate-700'>

                <textarea placeholder='Brainf*ck code' className='col-start-1 col-end-2 row-start-1 row-end-4' ref={codeRef}>
                    {brainfuckTest}
                </textarea>

                <textarea placeholder='Input' ref={inputRef}></textarea>
                <textarea placeholder='Output' ref={outputRef}></textarea>
                <button className='text-white font-bold' type='button' onClick={onExecute}>Execute</button>

            </main>
            <footer className='bg-red-800 w-full text-center py-5'>
                <h2>Contact</h2>
                <div className='space-x-10'>
                    <a href='https://alexdeveloper.me/'>Iuri<i className="fa-brands fa-linkedin"></i></a>
                    <a href='https://www.linkedin.com/in/mart%C3%ADn-vergara-529527245/'>Reyalic<i className="fa-brands fa-linkedin"></i></a>
                </div>
            </footer>
        </div>
    )
}

export default App
