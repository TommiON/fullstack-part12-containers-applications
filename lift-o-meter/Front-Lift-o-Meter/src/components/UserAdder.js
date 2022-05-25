import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

// import { StandardButton } from '../styles/Buttons'
// import { Input} from '../styles/styles'
//import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

const UserAdder = ({ visible, notificationCallback }) => {

    const [userdata, setUserdata] = useState({
        username: '',
        password: '',
        bestSquat: '',
        bestBenchpress: '',
        bestRow: '',
        bestOverheadpress: '',
        bestDeadlift: ''
    })

    const [passwordConfirmation, setPasswordConfirmation] = useState(null)
    const [errors, setErrors] = useState({})
   
    const validateForErrors = () => {
        const {username, password, bestSquat, bestBenchpress, bestRow, bestOverheadpress, bestDeadlift} = userdata
        const newErrors = {}

        if (!username || username.length < 3) newErrors.username = 'Käyttäjätunnuksen pitää olla vähintään 3 merkkiä'
        if (username.length > 20) newErrors.username = 'Käyttäjätunnus saa olla enintään 20 merkkiä'

        if (!password || password.length < 5) newErrors.password = 'Salasanan pitää olla vähintään 5 merkkiä'
        if (password.length > 20) newErrors.password = 'Salasana saa olla enintään 20 merkkiä'
        if (password !== passwordConfirmation && password) newErrors.passwordConfirmation = 'Salasana ja sen varmistus eroavat'

        if (!bestSquat || bestSquat === '') newErrors.bestSquat = 'Puuttuu'
        if (bestSquat && bestSquat < 20) newErrors.bestSquat = 'Epärealistisen pieni'
        if (bestSquat > 300) newErrors.bestSquat = 'Epärealistisen suuri'
       
        if (!bestBenchpress || bestBenchpress === '') newErrors.bestBenchpress = 'Puuttuu'
        if (bestBenchpress && bestBenchpress < 10) newErrors.bestBenchpress = 'Epärealistisen pieni'
        if (bestBenchpress > 200) newErrors.bestBenchPress = 'Epärealistisen suuri'

        if (!bestRow || bestRow === '') newErrors.bestRow = 'Puuttuu'
        if (bestRow && bestRow < 10) newErrors.bestRow = 'Epärealistisen pieni'
        if (bestRow > 200) newErrors.bestRow = 'Epärealistisen suuri'

        if (!bestOverheadpress || bestOverheadpress === '') newErrors.bestOverheadpress = 'Puuttuu'
        if (bestRow && bestRow < 10) newErrors.bestRow = 'Epärealistisen pieni'
        if (bestRow > 200) newErrors.bestRow = 'Epärealistisen suuri'

        if (!bestDeadlift || bestDeadlift === '') newErrors.bestDeadlift = 'Puuttuu'
        if (bestDeadlift && bestDeadlift < 20) newErrors.bestDeadlift = 'Epärealistisen pieni'
        if (bestDeadlift > 300) newErrors.bestDeadlift = 'Epärealistisen suuri'

        return newErrors
    }
    
    const handleChange = (event) => {
        event.preventDefault()
        const field = event.target.name
        const value = event.target.value

        if(field === 'password2') {
            setPasswordConfirmation(value)
        } else {
            setUserdata({
                ...userdata, [field]:value
            })
            if (!!errors[field]) {
                setErrors({
                    ...errors,
                    [field]: null
                })
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = validateForErrors()
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            UserService
                .postNew(userdata)
                .then(response => {
                    console.log('** UserAdder, handleSubmit, lisätään: ', response)
                    notificationCallback(`Käyttäjätili lisätty. Kirjaudu sisään, ${userdata.username}!`, false)
                })
                .catch(error => {
                    console.log('** UserAdder, handleSubmit, virhe: ', error.response)
                    if(error.response.status === 400) {
                        notificationCallback('Käyttäjätunnus on jo varattu!', true)
                    }
                })
            setUserdata({
                username: '',
                password: '',
                bestSquat: '',
                bestBenchpress: '',
                bestRow: '',
                bestOverheadpress: '',
                bestDeadlift: ''
            })
            setPasswordConfirmation('')
        }
    }

    /*
    if(!visible) {
        return null
    }
    */

    return(
        <div>
            <h3>Lisää uusi käyttäjä</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Käyttäjätunnus</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='text'
                            name='username'
                            value={userdata.username}
                            placeholder='3-20 merkkiä'
                            onChange={handleChange}
                            isInvalid={ !!errors.username }/>
                        <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Salasana</Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type='password'
                            name='password'
                            value={userdata.password}
                            placeholder='5-20 merkkiä'
                            onChange={handleChange}
                            isInvalid={ !!errors.password }/>
                        <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}></Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='password'
                            name='password2'
                            value={passwordConfirmation}
                            placeholder='salasana uudelleen'
                            onChange={handleChange}
                            isInvalid={ !!errors.passwordConfirmation }/>
                        <Form.Control.Feedback type='invalid'>{ errors.passwordConfirmation }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={10}>
                        <Form.Control
                            plaintext
                            readOnly
                            defaultValue="Maksimitulos seuraavissa klassisissa voimailuliikkeissä" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Kyykky</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            name='bestSquat'
                            value={userdata.bestSquat}
                            placeholder='kg'
                            onChange={handleChange}
                            isInvalid={ !!errors.bestSquat }/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestSquat }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Penkkipunnerrus</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            name='bestBenchpress'
                            value={userdata.bestBenchpress}
                            placeholder='kg'
                            onChange={handleChange}
                            isInvalid={ !!errors.bestBenchpress}/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestBenchpress }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Kulmasoutu</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            name='bestRow'
                            value={userdata.bestRow}
                            placeholder='kg'
                            onChange={handleChange}
                            isInvalid={ !!errors.bestRow}/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestRow }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Pystypunnerrus</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            name='bestOverheadpress'
                            value={userdata.bestOverheadpress}
                            placeholder='kg'
                            onChange={handleChange}
                            isInvalid={ !!errors.bestOverheadpress}/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestOverheadpress }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Maastaveto</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            name='bestDeadlift'
                            value={userdata.bestDeadlift}
                            placeholder='kg'
                            onChange={handleChange}
                            isInvalid={ !!errors.bestDeadlift}/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestDeadlift }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Button type='submit'>Rekisteröidy</Button>
                <Button>Peruuta</Button>
            </Form>
        </div>
    )
}

export default UserAdder