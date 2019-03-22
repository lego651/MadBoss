import React from 'react'

import AddTodo from '../../containers/AddTodo'
import ViewTodo from '../../containers/ViewTodo'
import ProfileNav from '../../containers/ProfileNav'

export default class Tasks extends React.Component {
  render() {
    return(
      <div>
        <ProfileNav />
        <AddTodo />
        <ViewTodo />
      </div>
    )
  }
}
