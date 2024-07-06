/* Dependencies */
import Search from "./components/Search";
import Title from "./components/Title";
import GitHubIcon from "./components/GithubIcon";

const App: React.FC = () => {
  return (
    <>
      <GitHubIcon />
      <Title />
      <Search />
    </>
  );
};

export default App;
