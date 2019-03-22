import React from 'react'
import { connect } from 'react-redux'

import { addTask } from '../actions/task'
import { deleteTask } from '../actions/task'
import { getUserTasks } from '../actions/task'
import TodoInput from '../components/TodoInput'
import TodoItem from '../components/TodoItem'

class ViewTodo extends React.Component {
  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token && token.length > 0){
      this._getUserTasks(token)
    } else {
      console.log('No token in Header Container')
    }
  }
  _getUserTasks(token) {
    this.props.getUserTasks(token)
  }
  _deleteTask(id) {
    this.props.deleteTask(id)
  }
  render() {
    const tasks = this.props.task.tasks
    return(
      <div>
        <ul>
          {
            tasks.map((task) => {
              return <TodoItem task={task}
                               key={task.id}
                               id={task.id}
                               deleteTask={this._deleteTask.bind(this)} />
            })
          }
        </ul>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  task: state.task
})
const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask(id)),
  getUserTasks: (token) => dispatch(getUserTasks(token))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTodo)
