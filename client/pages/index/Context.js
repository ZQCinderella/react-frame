import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ThemeContext, themes } from './Theme';
import Div from './Consumer';

/**
 * 旧版本的context受限于， 当一个顶层容器的 shouldComponentUpdate返回了false之后，其他子组件也无法更新
 */
const withTheme = (Component) => {
  // return (props) => {
  //   //高阶组件不能传递ref,因为ref不属于props。所以如果我们对ThemeButton添加ref， 那么实际上是添加到了匿名函数上了
  //   return (
  //     <ThemeContext.Consumer>
  //       {(theme) => <Component {...props} theme={theme} />}
  //     </ThemeContext.Consumer>
  //   )
  // }
  //可使用如下方式传递ref
  return React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {(theme) => <Component {...props} theme={theme} forwardedRef={ref} />}
    </ThemeContext.Consumer>
  ))
}
const Button = ({ theme, text, forwardedRef, ...rest }) => {
  return (
    <button {...rest} style={theme} ref={forwardedRef}>{text}</button>
  )
}

const ThemeButton = withTheme(Button);

class App extends Component {
  state = {
    theme: themes.light
  }
  changeTheme = () => {
    this.setState({
      theme: this.state.theme === themes.dark ? themes.light : themes.dark
    });
  }
  render() {
    // 如果Provider的 value使用 {{ name: 'fet'}} 这种形式，那么Provider每次re-render都会导致consumers  re-render
    return (
      <React.Fragment>
        <ThemeContext.Provider value={this.state.theme}>
          <ThemeButton onClick={this.changeTheme} text="哈哈" />
          <Div onClick={this.changeTheme} text="哈哈" />
        </ThemeContext.Provider>
      </React.Fragment>
    )
  }
}
export default App;
