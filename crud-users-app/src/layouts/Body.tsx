import axios from 'axios';
import React, { useEffect } from 'react'
import { useGlobal, useModifier } from 'react-simplify';
import Card from '../components/Card';
import Form from '../components/Form'
import { User } from '../models/User';

interface Props { }

const Body = (props: Props) => {
    const [cards, setCards] = useGlobal<User[]>('cards');

    useEffect(() => {
        axios.get<User[]>(import.meta.env.VITE_API_READ_URI)
            .then(res => setCards(useModifier('update'), res.data))
            .catch(console.error);
    }, []);


    return (
        <main>
            <Form />
            {cards.map(card => <Card {...card} />)}
        </main>
    )
}

export default Body