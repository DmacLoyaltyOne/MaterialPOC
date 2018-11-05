import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx'
import CourseList from './components/CourseList.tsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CourseList />
      </div>
    );
  }
}

export default App;
