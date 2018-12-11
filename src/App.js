import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
  }

  componentDidMount() {
    async function getData() {
      let response = await fetch(
        "http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&city={city}"
      );
      let data = await response.json();
      return data;
    }
    getData().then(data => this.setState({ data }));
  }

  render() {
    let component = null;
    if (!this.state.data) {
      component = <h1>Loading...</h1>;
    } else {
      component = (
        <table className="test-task-table">
          <caption>
            Таблица с тестовыми данными, подтянутыми с filltext.com
          </caption>
          <tbody>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Город</th>
            </tr>
            {this.state.data.map((entry, i) => (
              <tr key={i}>
                <td key={entry.id}>{entry.fname}</td>
                <td key={entry.id}>{entry.lname}</td>
                <td key={entry.id}>{entry.tel}</td>
                <td key={entry.id}>{entry.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return component;
  }
}

export default App;
