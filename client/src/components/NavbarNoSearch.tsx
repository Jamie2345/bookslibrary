import axios from "axios";

export default function NavbarNoSearch() {
  const handleRandom = async () => {
    try {
      const response = await axios.get(`/api/randombook`);

      const data = response.data;
      console.log(data);

      if (data.length <= 0) {
        console.log("No results found");
        alert("No results found");
        return;
      }

      if (data._id) {
        window.location.href = `/book/${data._id}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <div className="px-8 py-4 bg-base-100 fixed top-0 left-0 w-full z-10 flex items-center border-b-[1px] border-base-200 justify-between">
        <div className="flex items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/search">Search</a>
              </li>
              <li>
                <a href="/theme">Theme</a>
              </li>
              <li>
                <button onClick={handleRandom}>Random</button>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="text-lg font-bold text-base-content btn btn-ghost flex"
          >
            Jamie's Library
          </a>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="hidden ml-6 lg:flex">
            <ul className="menu menu-horizontal px-1 mr-2">
              <li>
                <a href="/search">Search</a>
              </li>
              <li>
                <a href="/theme">Theme</a>
              </li>
              <li>
                <button onClick={handleRandom}>Random</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
