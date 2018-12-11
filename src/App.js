import React from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
  }

  componentDidMount() {
    async function getData() {
      let response = await fetch(
        "http://www.filltext.com/?rows=1000&fname={firstName}&lname={lastName}&tel={phone|format}&city={city}"
      );
      let data = await response.json();
      return data;
    }
    getData().then(data => this.setState({ data }));
  }

  render() {
    let component = null;
    const columns = [
      {
        Header: "Имя",
        accessor: "fname"
      },
      {
        Header: "Фамилия",
        accessor: "lname"
      },
      {
        Header: "Телефон",
        accessor: "tel"
      },
      {
        Header: "Город",
        accessor: "city"
      }
    ];
    if (!this.state.data) {
      component = <h1>Loading...</h1>;
    } else {
      component = <ReactTable data={this.state.data} columns={columns} />;
    }
    return component;
  }
}

export default App;
