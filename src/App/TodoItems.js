import cx from "classnames";
import { Component } from "react";

export default class TodoItems extends Component {

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
        return <ul className="the-list">{listItems}</ul>;
    }

}