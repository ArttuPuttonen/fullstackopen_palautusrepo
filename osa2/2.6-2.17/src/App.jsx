import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const success = "success"
  const error = "error"

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')




  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };


        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
            setSuccessMessage(`${newName} has been updated successfully`);
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setSuccessMessage("")
            }, 5000)
          })

          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setErrorMessage("")
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`${newName} has been added successfully`);
          setTimeout(() => {
            setSuccessMessage("")
          }, 5000)
        })
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`${name} has been deleted successfully`)
        })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type={success}/>
      <Notification message={errorMessage} type={error}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App