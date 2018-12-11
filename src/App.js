import React, { Component } from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
  }
  componentDidMount() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&city={city}", true);
    request.onreadystatechange = () => {
      if (request.readyState !== 4 || request.status !== 200) return;
      var data = JSON.parse(request.responseText);
      this.setState({ data });
    };
    request.send();
  }
  render() {
    let component = null;
    if (!this.state.data) {
      component = <h1>Loading...</h1>;
    } else {
      component = (
        <table className="test-task-table">
        <caption>Таблица с тестовыми данными, подтянутыми с filltext.com</caption>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th>Город</th>
          </tr>
          {this.state.data.map((entry, i) => (
            <tr>
              <td key={i}>{entry.fname}</td>
              <td key={i}>{entry.lname}</td>
              <td key={i}>{entry.tel}</td>
              <td key={i}>{entry.city}</td>
            </tr>
          ))}
        </table>
      );
    }
    return component;
  }
}

export default App;
