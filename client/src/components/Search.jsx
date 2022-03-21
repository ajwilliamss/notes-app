import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const { setSearch } = useContext(SearchContext);

  return (
    <div className="search-bar">
      <FaSearch style={{ fontSize: "1.15rem" }} />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Type to search..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default Search;
