import React from 'react'
import { connect } from 'react-redux'

import { addTask } from '../actions/task'
import TodoInput from '../components/TodoInput'

class AddTodo extends React.Component {
  render() {
    return(
      <div>
        <TodoInput todoText=""
                   addTask={this._addTask.bind(this)} />
      </div>
    )
  }
  _addTask(text){
    this.props.addTask(text)
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTask: (text) => dispatch(addTask(text))
})
export default connect(
  null,
  mapDispatchToProps
)(AddTodo)
