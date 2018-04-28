import React, { Component } from 'react';


/**
 * 本篇是利用context代替redux, 后面会有一篇context + redux 配合使用的
 */
const initialState = {
  theme: 'dark',
  color: 'blue'
}

const GlobalStoreContext = React.createContext({ ...initialState });

class GlobalStoreContextProvider extends Component {
  state = {
    ...initialState
  };

  //reducer
  handleContextChange = action => {
    switch (action.type) {
      case 'UPDATE_THEME':
        return this.setState({
          theme: action.theme
        });
      case 'UPDATE_COLOR':
        return this.setState({
          color: action.color
        });
      case 'UPDATE_THEME_THEN_COLOR':
        return new Promise(resolve => {
          resolve(action.theme);
        })
          .then(theme => {
            this.setState({
              theme
            });
            return action.color;
          })
          .then(color => {
            this.setState({
              color
            });
          });
      default:

    }
  }
  render() {
    return (
      <GlobalStoreContext.Provider
        value={{
          dispatch: this.handleContextChange,
          theme: this.state.theme,
          color: this.state.color
        }}>
        {this.props.children}
      </GlobalStoreContext.Provider>
    )
  }
}

const SubComponent = props => (
  <div>
    <button
      onClick={() =>
        props.dispatch({
          type: 'UPDATE_THEME',
          theme: 'light'
        })
      }
    >
      change theme
    </button>
    <div>{props.theme}</div>
    <button
      onClick={() =>
        props.dispatch({
          type: 'UPDATE_COLOR',
          color: 'red'
        })
      }
    >
      change color
    </button>
    <div>{props.color}</div>
    <button
      onClick={() =>
        props.dispatch({
          type: 'UPDATE_THEME_THEN_COLOR',
          theme: 'monokai',
          color: 'purple'
        })
      }
    >
      change theme then color
    </button>
    <div>{props.theme} {props.color}</div>
  </div>
)

class ContexReplacetRedux extends Component {
  render() {
    return (
      <GlobalStoreContextProvider>
        <GlobalStoreContext.Consumer>
          {
            value => (
              <SubComponent theme={value.theme} color={value.color} dispatch={value.dispatch} />
            )
          }
        </GlobalStoreContext.Consumer>
      </GlobalStoreContextProvider>
    )
  }
}
export default ContexReplacetRedux;
