import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import TableList from '../components/Tables/TableList/TableList';
import Spinner from '../components/Spinner/Spinner';

import AuthContext from '../context/auth-context';
import './Tables.css';

class TablesPage extends Component {
  state = {
    creating: false,
    tables: [],
    isLoading: false,
    selectedTable: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.numberElRef = React.createRef();
    this.minCapacityElRef = React.createRef();
    this.maxCapacityElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchTables();
  }

  startCreateTableHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const number = +this.numberElRef.current.value;
    const minCapacity = +this.minCapacityElRef.current.value;
    const maxCapacity = +this.maxCapacityElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      number <= 0 ||
      minCapacity <= 0 ||
      maxCapacity <= 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const table = { number, minCapacity, maxCapacity, description };
    console.log(table);

    const requestBody = {
      query: `
          mutation {
            createTable(tableInput: {number: ${number}, minCapacity: ${minCapacity}, maxCapacity: ${maxCapacity}, description: "${description}" }) {
              _id
              number
              minCapacity
              maxCapacity
              description
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedTables = [...prevState.tables];
          updatedTables.push({
            _id: resData.data.createTable._id,
            number: resData.data.createTable.number,
            minCapacity: resData.data.createTable.minCapacity,
            maxCapacity: resData.data.createTable.maxCapacity,
            description: resData.data.createTable.description,
            creator: {
              _id: this.context.userId
            }
          });
          return { tables: updatedTables };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedTable: null });
  };

  fetchTables() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            tables {
              _id
              number
              minCapacity
              maxCapacity
              description
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const tables = resData.data.tables;
        this.setState({ tables: tables, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  showDetailHandler = tableId => {
    this.setState(prevState => {
      const selectedTable = prevState.tables.find(
        e => e._id === tableId
      );
      return { selectedTable: selectedTable };
    })
  }

  bookTableHandler = () => {

  }

  render() {

    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedTable) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Table"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-content">
                <label htmlFor="number">Number</label>
                <input type="number" id="number" ref={this.numberElRef} />
              </div>
              <div className="form-content">
                <label htmlFor="minCapacity">Minimum Patrons</label>
                <input type="number" id="minCapacity" ref={this.minCapacityElRef} />
              </div>
              <div className="form-content">
                <label htmlFor="maxCapacity">Maximum Patrons</label>
                <input type="number" id="maxCapacity" ref={this.maxCapacityElRef} />
              </div>
              <div className="form-content">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                />
              </div>
            </form>
          </Modal>
        )}

        {this.state.selectedTable && (
          <Modal
            title={this.state.selectedTable.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookTableHandler}
            confirmText="Book"
          >

            <h1>Table #{this.state.selectedTable.number}</h1>
            <h2>
              {this.state.selectedTable.minCapacity} - {this.state.selectedTable.maxCapacity} patrons
            </h2>
            <p>{this.state.selectedTable.description}</p>
          </Modal>
        )}

        {this.context.token && (
          <div className="tables-content">
            <p>Share your own Tables!</p>
            <button className="btn" onClick={this.startCreateTableHandler}>
              Create Table
            </button>
          </div>
        )}

        {this.state.isLoading ?
          <Spinner /> :

          <TableList
            tables={this.state.tables}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        }
      </React.Fragment>
    );
  }
}

export default TablesPage;