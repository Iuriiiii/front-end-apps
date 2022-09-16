import axios from 'axios';
import React, { FormEvent } from 'react'
import { useGlobal, useModifier } from 'react-simplify';
import { User } from '../models/User';

interface Props { }

const Form = (props: Props) => {
    const [cards, setCards] = useGlobal<User[]>('cards');

    function onSubmit(e: FormEvent) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            firstname: HTMLInputElement,
            lastname: HTMLInputElement,
            email: HTMLInputElement,
            website: HTMLInputElement
        };

        const firstname = target.firstname;
        const lastname = target.lastname;
        const email = target.email;
        const website = target.website;

        console.log((firstname.validity.valid ||
            lastname.validity.valid ||
            email.validity.valid ||
            website.validity.valid));

        if (!(firstname.validity.valid ||
            lastname.validity.valid ||
            email.validity.valid ||
            website.validity.valid))
            return;

        axios.post<User>(import.meta.env.VITE_API_CREATE_URI, {
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
            website: website.value
        })
            .then(res => setCards(useModifier('append'), res.data))
            .catch(console.error);
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>New User Information</h3>
            <label><input type='text' name='firstname' placeholder='First Name' maxLength={15} pattern='\w+' /></label>
            <label><input type='text' name='lastname' placeholder='Last Name' maxLength={15} pattern='\w+' /></label>
            <label><input type='email' name='email' placeholder='Email' maxLength={35} /></label>
            <label><input type='url' name='website' placeholder='Website' /></label>
            <button type='submit'>Create</button>
        </form>
    )
}

export default Form