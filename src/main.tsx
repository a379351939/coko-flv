import React from 'react'
import ReactDOM from 'react-dom'
import CokoFlv from './index';

ReactDOM.render(
  <React.StrictMode>
    <CokoFlv url='https://1011.hlsplay.aodianyun.com/demo/game.flv' />
  </React.StrictMode>,
  document.getElementById('root')
)
