export default function SearchInput({ onChangeFunction, value, setValue }) {
  return (
    <form className="form outline outline-1 outline-gray-400 mx-auto w-1/3 min-w-64">
      <label htmlFor="search">
        <input
          required
          autoComplete="off"
          placeholder="search products here"
          id="search"
          type="text"
          value={value}
          onChange={onChangeFunction}
        />
        <div className="icon">
          <svg
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <button type="reset" className="close-btn" onClick={() => setValue("")}>
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}
