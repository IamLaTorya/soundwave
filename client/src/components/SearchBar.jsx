export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Search by artist</label>
      <div className="search-row">
        <input
          id="search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="nirv"
        />
        {value && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onChange('')}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
