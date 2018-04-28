import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/**
 * 本篇写Context搭配redux使用
 */
const ThemeContext = React.createContext('lighe');
class ThemeContextProvider extends Component {
  state = {
    theme: 'light'
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {
          this.props.children
        }
      </ThemeContext.Provider>
    )
  }
}

const LanguageContext = React.createContext('en');
class LanguageContextProvider extends Component {
  state = {
    language: 'en'
  }
  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        {
          this.props.children
        }
      </LanguageContext.Provider>
    )
  }
}

const initialState = {
  todos: []
}

//reducer
const todos = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: state.todos.concat(action.text)
      }
    default:
      return state;
  }
}

const AppProviders = ({ children }) => {
  const store = createStore(todos, initialState);
  return (
    <Provider store={store}>
      <LanguageContextProvider>
        <ThemeContextProvider>
          {
            children
          }
        </ThemeContextProvider>
      </LanguageContextProvider>
    </Provider>
  )
}

const ThemeAndLanguageConsumer = props => {
  return (
    <LanguageContext.Consumer>
      {
        language => (
          <ThemeContext.Consumer>
            {
              theme => props.children(language, theme)
            }
          </ThemeContext.Consumer>
        )
      }
    </LanguageContext.Consumer>
  )
}

const todosList = props => {
  return (
    <div>
      <div>{props.theme} and {props.language}</div>
      {
        props.todos.map((item, index) => <div key={item + index.toString()}>{item}</div>)
      }
      <button
        onClick={props.handleClick}
      >
        add todo
      </button>
    </div>
  )
}
const mapStateToProps = (state) => ({
  todos: state.todos
})

//action
const mapActionToProps = {
  handleClick: () => ({
    type: 'ADD_TODO',
    text: `hahah ${new Date().getTime()}`
  })
}

const TodoListContainer = connect(mapStateToProps, mapActionToProps)(todosList);

class ContextReduxApp extends Component {
  state = {

  }
  render() {
    return (
      <AppProviders>
        <ThemeAndLanguageConsumer>
          {
            (language, theme) => 
              <TodoListContainer theme={theme} language={language} />
          }
        </ThemeAndLanguageConsumer>
      </AppProviders>
    )
  }
}

export default ContextReduxApp;
