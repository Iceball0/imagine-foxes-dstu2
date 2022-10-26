import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Profile from './Profile';
import News from './News'
import Login from './Login';
import Logout from './Logout';
import jwt from 'jwt-decode';
import { ReactSession } from 'react-client-session';
import Cookies from 'universal-cookie';

ReactSession.setStoreType("sessionStorage");
const cookies = new Cookies();


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        loggedIn: false,
        user: null
    }
  }

  componentDidMount() {

    // Check for user session or cookie
    const sess_token = ReactSession.get('user');
    var token = cookies.get('user');

    if (sess_token) {
        token = sess_token;
    }
    
    if (token !== undefined) {
        this.setState({
            loggedIn: true,
            user: jwt(token)
        })
    }
  }    

    render() {
        const loggedIn = this.state.loggedIn;
        const user = this.state.user;

        return (
            <Router>
                <Nav loggedIn={loggedIn} user={user} />
                <Routes>
                    <Route path="/" element={<Home loggedIn={loggedIn} user={user} />}></Route>
                    <Route path="/profile" element={<Profile loggedIn={loggedIn} user={user} />}></Route>
                    <Route path="/news" element={<News loggedIn={loggedIn} user={user} />}></Route>
                    <Route path="/login" element={<Login loggedIn={loggedIn} />}></Route>
                    <Route path="/signup" element={<Login loggedIn={loggedIn} signup={true} />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                </Routes>
            </Router>
        );
    }
}
