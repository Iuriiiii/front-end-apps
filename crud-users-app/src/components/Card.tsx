import React from 'react'
import { User } from '../models/User'

// interface Props { }

const Card = (props: User) => {
    return (
        <div className='card'>
            <p>{JSON.stringify(props)}</p>
        </div>
    )
}

export default Card