import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

const store = configureStore();
render (
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
