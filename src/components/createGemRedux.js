import React, {useState} from 'react'

import {connect} from "react-redux"


import { postGem } from '../actions/index copy'

function CreateGem (props) {
    const [newGem, setNewGem ] = useState({
            title: '',
            longitude: '',
            latitude: '',
            difficulty: '',
            description: ''
    })

    const handleChanges = e =>{
        setNewGem({
            ...newGem,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e =>{
        e.preventDefault()
        props.postGem(newGem)
        setNewGem({
            title: '',
            longitude: '',
            latitude: '',
            difficulty: '',
            description: ''
        })
    }

    
    return(
        <form onSubmit={handleSubmit}>
            <input
            name='title'
            placeholder='Title'
            value={newGem.name}
            onChange={(e)=>{
                setNewGem({
                    ...newGem,
            [e.target.name]:e.target.value
        })
            }}
            />
            <input
            name='longitude'
            placeholder='Logitude.'
            value={newGem.longitude}
            onChange={handleChanges}
            />
            <input
            name='latitude'
            placeholder='Latitude.'
            value={newGem.latitude}
            onChange={handleChanges}
            />
            <input
            name='difficulty'
            placeholder='Dificulty. 1-5'
            value={newGem.difficulty}
            onChange={handleChanges}
            />
            <input
            name='description'
            placeholder='Description.'
            value={newGem.description}
            onChange={handleChanges}
            />
            <button type='submit'>Add Gem!</button>
        </form>
    )
}
const mapStateToProps = state => {
    return{}

}

export default connect(mapStateToProps, 
    { postGem }
    )(CreateGem)
