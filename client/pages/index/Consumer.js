import React, { Component } from 'react';
import { ThemeContext } from './Theme';

/**
 * 本例展示了一个组件如何接受Provider提供的数据
 */
class Div extends Component {
  componentDidMount() {
    // this.props.theme访问
  }
  componentDidUpdate(prevProps, prevState) {
    // previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }
  render() {
    const { theme, text, ...rest } = this.props;
    return <div style={theme} {...rest}>{text}</div>
  }
}
// 这里跟redux的connect作用类似
export default React.forwardRef((props, ref) => (
  <ThemeContext.Consumer>
    {(theme) => <Div {...props} theme={theme} ref={ref}/>}
  </ThemeContext.Consumer>
));

// export default props => (
//   <ThemeContext.Consumer>
//     {(theme) => <Div {...props} theme={theme} />}
//   </ThemeContext.Consumer>
// ) 
