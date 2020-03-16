import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {connect} from "react-redux"
import {postGem} from '../actions/index copy'

const FormContainer = styled.div`
max-width: 400px;
min-width: 400px;
max-height: 87.5vh;
background-color: #30364A;
border-left: 3px solid black;
overflow-y: auto;
`

const Form = styled.form`
max-width: 99%;
margin: 0px;
padding-top: 30px;
`

const Input = styled.input`
    width: 300px;
    padding-left: 10px;
    font-size: .9rem;
    border: none;
    height: 44px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 15px auto;
    background-color: #3E4958;
    outline: none;
    color: white;
    
    `

const Button = styled.button`
    width: 350px;
    height: 50px;
    border-radius: 15px;
    outline: none;
   
   background-color: #C66DB2;
   border: none;
   color: white;
   text-align: center;
   font-size: 20px;
   margin: 40px 0px 40px 25px;
   transition: 0.3s;
   text-decoration: none;
   cursor: pointer;
   transition: opacity .55s ease-in-out;
   -moz-transition: opacity .55s ease-in-out;
   -webkit-transition: opacity .55s ease-in-out;

   :hover {
       opacity: 1.0;
       transition: opacity .55s ease-in-out;
       -moz-transition: opacity .55s ease-in-out;
       -webkit-transition: opacity .55s ease-in-out;
       background-color: #FF69B4;
       border: 2px solid black;
   }
   `
const ButtonContainer = styled.button`
      background-color: #30364A;
      border: 1px solid #30364A;
      width: 99%;
      display: flex;
      justify-content: center;
   `

const CoordButton = styled.button`
width: 230px;
height: 50px;
border-radius: 15px;
outline: none;

background-color: #C66DB2;
border: none;
color: white;
text-align: center;
font-size: 20px;
margin: 20px 0px 35px 0px;
transition: 0.3s;
text-decoration: none;
cursor: pointer;
transition: opacity .55s ease-in-out;
-moz-transition: opacity .55s ease-in-out;
-webkit-transition: opacity .55s ease-in-out;

:hover {
   opacity: 1.0;
   transition: opacity .55s ease-in-out;
   -moz-transition: opacity .55s ease-in-out;
   -webkit-transition: opacity .55s ease-in-out;
   background-color: #FF69B4;
   border: 2px solid black;
}
`

const Label = styled.label`
       margin-left: 10%;
       color: white;
   `
//////////////////////////////////////////////////////////////////////////////
function CreateGem (props) {

    const [newGem, setNewGem] = useState({
        title: '',
        longitude: '',
        latitude: '',
    })

    const [address, setAddress] = useState('')
    const handleAddressChanges = e => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleChanges = e => {
        setNewGem({
            ...newGem,
            [e.target.name]: e.target.value
        })
    }

    const handleGeocodeSubmit = e => {
        e.preventDefault()
        function geocode (address) {
            axios
                .get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${ address.address }&outFields=Match_addr,Addr_type`)
                .then(res => {
                    console.log(res, '********get req********************')
                    setNewGem(
                        {
                            ...newGem,
                            longitude: res.data.candidates[0].location.x,
                            latitude: res.data.candidates[0].location.y
                        }
                    )
                })
                .catch(err => {
                    console.log("***********************gecode err********************************", err)
                })
        }
        geocode(address)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.postGem(newGem)
        setTimeout(() => {
            props.setRefresh(!props.refresh)
            props.updatePosition(Number(newGem.latitude), Number(newGem.longitude))
            props.history.push('/')
        }, 1000)
    }

    useEffect(() => {
        props.setRegLogRendered(false)
    }, [])

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>


                {/* <input
            name='created_by_user'
            placeholder='created_by_user'
            value={}
            onChange={(e)=>{
                setForm({
                    ...form,
            [e.target.name]:e.target.value
        })
            }}
            /> */}
                <Label>TITLE</Label>
                <Input
                    className='input'
                    name='title'
                    placeholder='Title'
                    value={newGem.name}
                    onChange={handleChanges}
                />


                {/* <GeocodingRedux/> */}
                <Label>ADDRESS</Label>
                <Input
                    name='address'
                    placeholder='Enter an address'
                    onChange={handleAddressChanges}
                />
                {console.log('address state', address)}
                <ButtonContainer>
                    <CoordButton onClick={handleGeocodeSubmit}> Get your Coordinates</CoordButton>
                </ButtonContainer>

                <Label>LATITUDE</Label>
                <Input value={newGem.latitude} name='latitude' onChange={handleChanges} placeholder='Enter a Latitude coordinate' />
                <Label>LONGITUDE</Label>
                <Input value={newGem.longitude} name='longitude' onChange={handleChanges} placeholder='Enter a Longitude coordinate' />

                <Label>DIFFICULTY</Label>
                <Input
                    className='input'
                    name='difficulty'
                    placeholder='Choose 1-5 for difficulty '
                    value={newGem.name}
                    onChange={handleChanges}
                />
                <Label>DESCRIPTION</Label>
                <Input
                    className='input'
                    name='description'
                    placeholder='Describe or give clues to find your gem.'
                    value={newGem.name}
                    onChange={handleChanges}
                />

                <ButtonContainer>
                    <Button type='submit'>Create Gem!</Button>
                </ButtonContainer>
            </Form>
        </FormContainer>
    )
}

const mapStateToProps = (state) => {

    return {
        longitude: state.longitude,
        latitude: state.latitude,
        title: state.title,
        difficulty: state.difficulty,
        description: state.description

    }
}


export default connect(mapStateToProps,
    {postGem}
)(CreateGem)











/////////////////// MY REDUX CODE COPY ///////////////////////


// function CreateGem (props) {



//     const [newGem, setNewGem ] = useState({
//             title: '',
//             longitude: '',
//             latitude: '',
//             difficulty: '',
//             description: ''
//     })

//     const handleChanges = e =>{
//         setNewGem({
//             ...newGem,
//             [e.target.name]: e.target.value
//         })
//     }
//     const handleSubmit = e =>{
//         e.preventDefault()
//         // props.postGem(newGem)
//         setNewGem({
//             title: '',
//             longitude: '',
//             latitude: '',
//             difficulty: '',
//             description: ''
//         })
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <input
//             name='title'
//             placeholder='Title'
//             value={newGem.name}
//             onChange={handleChanges}
//             />

//             <GeocodingRedux/>

//             <input
//             name='difficulty'
//             placeholder='Dificulty. 1-5'
//             value={newGem.difficulty}
//             onChange={handleChanges}
//             />
//             <input
//             name='description'
//             placeholder='Description.'
//             value={newGem.description}
//             onChange={handleChanges}
//             />
//             <button type='submit'>Add Gem!</button>
//         </form>
//     )
// }
// const mapStateToProps = state => {
//     return{
//         state
//     }

// }

// export default connect(mapStateToProps, 
//     { postGem }
//     )(CreateGem)





///////////copy of form before changes for address
//     <form onSubmit={handleSubmit}>
//     <input
//     name='title'
//     placeholder='Title'
//     value={newGem.name}
//     onChange={(e)=>{
//         setNewGem({
//             ...newGem,
//     [e.target.name]:e.target.value
// })
//     }}
//     />
//     <input
//     name='longitude'
//     placeholder='Logitude.'
//     value={newGem.longitude}
//     onChange={handleChanges}
//     />
//     <input
//     name='latitude'
//     placeholder='Latitude.'
//     value={newGem.latitude}
//     onChange={handleChanges}
//     />
//     <input
//     name='difficulty'
//     placeholder='Dificulty. 1-5'
//     value={newGem.difficulty}
//     onChange={handleChanges}
//     />
//     <input
//     name='description'
//     placeholder='Description.'
//     value={newGem.description}
//     onChange={handleChanges}
//     />
//     <button type='submit'>Add Gem!</button>
// </form>