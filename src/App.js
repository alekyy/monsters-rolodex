import { useEffect, useState } from "react";
import "./App.css";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  const onSearchChange = (event) => {
    setSearchField(event.target.value.toLocaleLowerCase());
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(searchField)
    );

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>

      <SearchBox
        className="monster-box"
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

// componentDidMount() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((users) => this.setState({ monsters: users }));
// }

//   onSearchChange = (event) => {
//     this.setState({
//       searchField: event.target.value.toLocaleLowerCase(),
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) =>
//       monster.name.toLocaleLowerCase().includes(searchField)
//     );

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>

//         <SearchBox
//           className="search-box"
//           placeholder="search monsters"
//           onChangeHandler={onSearchChange}
//         />

//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
