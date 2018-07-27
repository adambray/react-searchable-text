import React, { Component } from 'react';
import './App.css';
import SearchableText from './SearchableText';
import {longText} from './sampleText';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      matches: [],
      currentMatch: 1,
    };

    this.registerMatch = this.registerMatch.bind(this);
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
      matches: [],
      currentMatch: 1,
    });
  }

  registerMatch(match) {
    if (match) {
      this.state.matches.push(match);
    }
  }

  nextMatch = () => {
    const {matches, currentMatch} = this.state;
    const nextMatch = (currentMatch % matches.length) + 1;
    this.setState({
      currentMatch: nextMatch,
    })
  }

  scrollToNextMatch = () => {
    const {matches, currentMatch} = this.state;

    if(matches.length === 0) {
      return;
    }

    this.nextMatch();
    matches[currentMatch - 1].scrollIntoView();
  }

  render() {
    const {searchText} = this.state;
    return (
      <div className="app">
        <div className="search-form">
          <input value={searchText} onChange={this.updateSearchText} />
          <button onClick={this.scrollToNextMatch}>Next</button>
        </div>
        <div>
          <SearchableText text={longText}
                          searchText={searchText}
                          registerMatch={this.registerMatch}/>
          <SearchableText text={"Oh hello, this is too much tuna!"}
                          searchText={searchText}
                          registerMatch={this.registerMatch}/>
        </div>
      </div>
    );
  }
}

export default App;
