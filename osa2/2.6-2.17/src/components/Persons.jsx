
const Persons = ({ persons, filter, handleDelete}) => {
    const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person =>
                    <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>
                )}
            </ul>
        </div>
    )
}



export default Persons;
