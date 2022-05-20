import cx from "classnames";
import { Component } from "react";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  done(key) {
    this.props.done(key);
  }

  createTasks(item) {
    return (
      <li
        onClick={() => this.done(item.key)}
        key={item.key}
        className={cx({ "is-done": item.isDone })}
      >
        {item.text}
      </li>
    );
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTasks);
    return <ul className="theList">{listItems}</ul>;
  }
}

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this);
    this.doneItem = this.doneItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
  }

  saveItems(items) {
    this.setState({
      items: items,
    });
    localStorage.setItem('items', JSON.stringify(items))
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
      };

      this.setState((prevState) => {
        let newItemList = prevState.items.concat(newItem);
        localStorage.setItem('items', JSON.stringify(newItemList))
        return {
          items: newItemList,
        };
      });      

      this._inputElement.value = "";
    }
    console.log(this.state.items);

    e.preventDefault();
  }

  doneItem(key) {
    let newItemList = this.state.items.map((item) => {
      if (item.key === key) {
        item.isDone = true;
      }
      return item;
    });

    this.saveItems(newItemList);
  }

  filterItem() {
    let filteredList = this.state.items.filter((item) => {
      return !item.isDone;
    });

    this.saveItems(filteredList);
  }

  componentDidMount() {
    let items = localStorage.getItem('items');
    items = JSON.parse(items)

    this.setState({
      items: items,
    })
  }

  render() {
    return (
      <>
        <div className="header">
          <h2 className="label-wrapper">Todo List</h2>
          <form onSubmit={this.addItem}>
            <input
              type="text"
              id="new-todo-input"
              className="input"
              name="text"
              autoComplete="off"
              ref={(a) => (this._inputElement = a)}
              placeholder="enter task"
            ></input>

            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>

        <TodoItems entries={this.state.items} done={this.doneItem} />

        <button style={{ margin: "20px" }} onClick={this.filterItem}>
          Clear Completed
        </button>
        <style>
          {`
          .is-done {
              text-decoration: line-through;
          }
          `}
        </style>
      </>
    );
  }
}
