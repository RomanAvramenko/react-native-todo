import React, { useReducer, useContext } from 'react'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { ScreenContext } from '../screen/screenContext'
import { Alert } from 'react-native'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [{ id: '1', title: 'test' }]
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({ type: ADD_TODO, title: title })

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Removing Item',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        },
      ],
      { cancelable: false },
    )
  }

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      addTodo,
      updateTodo,
      removeTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}
