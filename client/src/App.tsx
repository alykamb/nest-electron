// import logo from './logo.svg?url'
import './App.css'

import React, { useEffect, useState } from 'react'

const logo = new URL('./logo.svg', import.meta.url)
function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // (window as any).ipcRenderer.on('asynchronous-reply', (event, arg) => {
        //     console.log(arg) // prints "pong"
        //   })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo.href} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((c) => c + 1)}>
                        count is: {count}
                    </button>
                    {/* <button onClick={() => ipcRenderer.send('asynchronous-message', 'ping')}>teste</button> */}
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
                <h1>Hello World!</h1>
                We are using Node.js <span id="node-version" />, Chromium{' '}
                <span id="chrome-version" />, and Electron <span id="electron-version" />.
            </header>
        </div>
    )
}

export default App
