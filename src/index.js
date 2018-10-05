import {createStore,applyMiddleware} from 'redux';
import Login from './container/Login/login.js';
import Register from './container/Register/register.js';
import AuthRouter from './component/AuthRoute/AuthRoute.js';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import combineReducers from './reducer.js';
import BossINFO from './container/Boss/boss.js';
import GeniusINFO from './container/Genius/genius.js';
import Genius from './component/Genius/Genius.js';
import Boss from './component/Boss/Boss.js';
import Dashboard from './component/Dashboard/dashboard.js';
import Chat from './component/Chat/chat.js';
import './config';

// index is used as the pointing to the following url

const store = createStore(combineReducers, applyMiddleware(thunk));

function render(){
	ReactDom.render(
		(<Provider store={store}>
		<BrowserRouter>
		<div>
		<AuthRouter/>
		<Switch>
		<Route path='/boss/info' component={BossINFO} />
		<Route path='/genius/info' component={GeniusINFO} />
		<Route path='/login' component={Login} />
		<Route path='/register' component={Register} />
		<Route path='/chat/:user' component={Chat} />
		<Route component={Dashboard} />
		</Switch>
		</div>
		</BrowserRouter>
		</Provider>),
		document.getElementById("root"));
}

render();




