import React, { Componet } from 'react';

/**
 * 加入我们需要些一些组件，但是这个组件加载前可能需要loading, 但是为每个组件都写一个loading有些浪费 
 */
const List = ({ data }) => (
  <ul>
    {
      data.map(item => <li key={data.name}>{item.name}</li>)
    }
  </ul>
)
const withLoading = (BaseComponent) => {
  return ({ isLoading, ...otherProps }) => (
    isLoading ?
      <div>正在加载</div> :
      <BaseComponent {...otherProps} />
  )
}

const loadingList = withLoading(List);

loadingList({
  isLoading: true,
  data: [{ name: 'fet' }, { name: 'lx' }]
});