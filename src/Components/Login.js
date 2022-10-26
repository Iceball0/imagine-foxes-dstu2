import React, { Component } from 'react'
import axios from 'axios'
import { Alert, Card, CardContent, List, InputAdornment, IconButton, ListItem, FormGroup, FormControlLabel, Checkbox, Button, TextField, RadioGroup, Radio, FormControl, FormLabel } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../static/css/login.css'

import { ReactSession }  from 'react-client-session';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,

        login: '',
        name: '',
        permission: '',
        password: '',
        password2: '',
        remember: false,
        showPassword: false,

        password2Error: false,
        usernameError: false,
        errorMsg: ''
    }
  }

  // Check if authorized
  componentDidMount() {
    const sess_token = ReactSession.get('user');
    const cookie_token = cookies.get('user');;

    if ( sess_token || cookie_token ) {
        window.location.href = '/';
    }

    this.setState({ isLoaded: true });
  }

  // Change input values in state
  inputChange = (prop) => (event) => {
    this.setState({
        [prop]: event.target.value 
    });
  };

  // Change remember checkbox state
  checkboxChange = (event) => {
    this.setState({
        remember: event.target.checked
    });
  };

  // Show password button
  showPasswordFunc = () => {
    this.setState(state => ({
        showPassword: !state.showPassword
    }))
  }

  // Set Error message
  setError = (msg) => {
    this.setState({
        errorMsg: msg
    })
  }

  // Submit form
  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.signup) {
        
        // Signup user
        if ( this.state.name.split(' ').length !== 2) {
            this.setState({ password2Error: false, 
                            usernameError: true });

        } else if (this.state.password !== this.state.password2) {
            this.setState({ password2Error: true,
                            usernameError: false });

        } else {
            this.setState({ password2Error: false,
                            usernameError: false });

            axios.post('https://imf-dstu2-server.tk/api/signup', {
                login: this.state.login,
                surname: this.state.name.split(' ')[1],
                name: this.state.name.split(' ')[0],
                permission: this.state.permission,
                password: this.state.password,
                remember: this.state.remember
            }).then((res) => {
                
                this.setError('');
                window.location.href = '/';
            }).catch((error) => {
                this.setError(error.response.data.msg);
            });

        }
    
    } else {

        // Login user
        axios.post('https://imf-dstu2-server.tk/api/login', {
            login: this.state.login,
            password: this.state.password,
            remember: this.state.remember
        }).then((res) => {

            this.setError('');

            ReactSession.set('user', res.data.token, {path: '/'})
            
            if (res.data.remember) {
                cookies.set('user', res.data.token, {path: '/', maxAge: 604800})
            }

            window.location.href = '/';
            
        }).catch((error) => {
            this.setError(error.response.data.msg);
        });
    }
  };


  render() {
    if (!this.state.isLoaded) {
        return null
    }
    return (
        <>
            <div className="bg"></div>
            <div className="bg2"></div>
            {this.state.errorMsg ? <Alert severity="error" className='error' onClose={() => {this.setError('');}}>{this.state.errorMsg}</Alert> : null}
            <Card className="card" sx={{ width: {xs: "90%", sm: "70%", md: "40%"}, left: {xs: "5%", sm: "15%", md: "30%"}}}>
                <CardContent>
                    <h1 className="form_title">
                        {!this.props.signup ? ('Авторизация') : ('Регистрация')}
                    </h1>
    
                    <form method="POST" onSubmit={this.onSubmit}>
                        <List>
                            {!this.props.signup ? (
                            <>
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Логин"
                                        id="login"
                                        type="text"
                                        value={this.state.login}
                                        onChange={this.inputChange('login')}
                                        variant="standard"
                                    />
                                </ListItem>
    
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Пароль"
                                        id="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.inputChange('password')}
                                        variant="standard"
    
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={this.showPasswordFunc}>
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </ListItem>
                            </>
                            ) : (
                            <>
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Логин"
                                        id="login"
                                        type="text"
                                        value={this.state.login}
                                        onChange={this.inputChange('login')}
                                        variant="standard"
                                    />
                                </ListItem>
    
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Имя Фамилия"
                                        id="name"
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.inputChange('name')}
                                        variant="standard"

                                        error={this.state.usernameError}
                                        helperText={this.state.usernameError ? "Неправильный формат имени" : ""}
                                    />
                                </ListItem>

                                <ListItem className="inputs radio_item" disablePadding>
                                <FormControl>
                                    <FormLabel id="radio-group-label">Роль</FormLabel>
                                    <RadioGroup name="radio-group" value={this.state.permission} onChange={this.inputChange('permission')}>
                                        <FormControlLabel value="student" control={<Radio />} label="Студент" />
                                        <FormControlLabel value="teacher" control={<Radio />} label="Преподаватель" />
                                        <FormControlLabel value="stuff" control={<Radio />} label="Сотрудник" />
                                    </RadioGroup>
                                    </FormControl>
                                </ListItem>
    
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Пароль"
                                        id="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.inputChange('password')}
                                        variant="standard"
    
                                        error={this.state.password2Error}
                                        helperText={this.state.password2Error ? "Пароли не совпадают" : ""}
    
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={this.showPasswordFunc}>
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </ListItem>
    
                                <ListItem className="inputs" disablePadding> 
                                    <TextField
                                        required
                                        label="Повторите пароль"
                                        id="password2"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password2}
                                        onChange={this.inputChange('password2')}
                                        variant="standard"
    
                                        error={this.state.password2Error}
                                        helperText={this.state.password2Error ? "Пароли не совпадают" : ""}
                                    />
                                </ListItem>
                            </>
                            )}
                            <ListItem className="inputs" disablePadding>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={this.state.remember} onChange={this.checkboxChange} />} label="Запомнить меня" />
                                </FormGroup>
                            </ListItem>
                        </List>
                        <Button variant="contained" className="inp_button" type="submit">Войти</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
  }
}