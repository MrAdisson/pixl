import React from 'react';
import './App.css';
import Editor from './components/Editor/Editor';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Editor />
      </div>
    </Provider>
  );
};

export default App;
