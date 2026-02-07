export default function NavBar({onOpen, onSearch, onDeleteAll}){
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };


    return(
        <>
          <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
              <a className="btn btn-ghost text-xl">Clients</a>

            </div>
            <div className="navbar-center">
              <label className="input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
              </g>
              </svg>
              <input type="text" required placeholder="Search" onChange={handleSearchChange}/>
              </label>
            </div>
              <div className="navbar-end gap-2">
                <button className="btn btn-error text-white"
                  onClick={onDeleteAll}>
                  Delete All
                </button>
                <button className="btn btn-primary text-white"
                  onClick={onOpen}>
                  Add Client
                </button>
              </div>
          </div>
        </>
    )
}