import React from 'react'

import './TodoItem.css'

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="todoWrapper">
        <button className="removeTodo"
                onClick={(e)=>this.deleteTask(this.props.id)}>
          Remove
        </button>
        {this.props.task.content}
      </div>
    )
  }
  deleteTask(id) {
    this.props.deleteTask(id)
  }
}
