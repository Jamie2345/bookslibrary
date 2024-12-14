export default function Navbar() {
  return (
    <header>
      <div className="px-8 py-4 bg-base-200 fixed top-0 left-0 w-full z-10 flex items-center border-b-[1px] border-base-300 justify-between navbar">
        <div className="navbar-start">
          <a href="/" className="text-lg font-bold text-base-content">
            Jamie's Library
          </a>
        </div>
        <div className="navbar-center hidden px-2 mr-2 lg:flex">
          <ul className="menu menu-horizontal px-1 mr-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <input placeholder="Enter search" className="rounded-md border-[1px] border-primary p-2 w-full max-w-64 mr-2"></input>
          <button className="bg-primary text-primary-content shadow-md rounded-md p-2 h-[42px] w-full max-w-16 text-sm font-semibold">Search</button>
        </div>
      </div>
    </header>
  );
}
