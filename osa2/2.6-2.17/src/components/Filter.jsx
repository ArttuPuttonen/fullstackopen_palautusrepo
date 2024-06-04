const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
        filter shown contacts with <input value={filter} onChange={handleFilterChange} />
        </div>
    )
    }

export default Filter;