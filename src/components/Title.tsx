/* Dependencies */
import { MdOutlineManageSearch } from "react-icons/md";

const Title: React.FC = () => (
  <h1 className="title">
    <a href="https://github.com/sebilune/character-lookup">
      Anime Character Lookup
    </a>
    <MdOutlineManageSearch className="search-icon" />
  </h1>
);

export default Title;
