import './App.scss'
import Header from './layouts/Header'
import Body from './layouts/Body'
import Footer from './layouts/Footer'
import { useGlobal, useGlobalMaker, useModifier } from 'react-simplify'
import { User } from './models/User'
import axios from 'axios'

function App() {
    const store: User[] = [];

    useGlobalMaker({
        name: 'cards',
        initialState: store,
        modifiers: {
            append: (state, value) => state.push(value),
            update: (state, value) => value
        }
    });

    return (
        <div className="app">
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

export default App
