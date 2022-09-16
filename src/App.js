import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

  const [searchTerm, setSearchTerm] = useSemiPermanentState('search', 'React');
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleChange}/>
      <hr />
      <p>Searched for <strong>{searchTerm}</strong></p>
      <hr />
      <List list={searchedStories}/>
    </>
  );
};

const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch}/>
  </>
);

const List = ({ list }) => (
  <ul>
    {list.map(({objectID, ...item}) => (
      <Item id={objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ url, title, author, num_comments, points }) => (
  <li>
    <span><a href={url}>{title}</a></span>
    <span> {author} </span>
    <span>{num_comments} </span>
    <span>{points}</span>
  </li>
);

const useSemiPermanentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState)

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default App;
