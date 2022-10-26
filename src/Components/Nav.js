import React from 'react'
import { AppBar, Avatar, Toolbar, Typography, Box, Button, Tab, Tabs } from '@mui/material'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../static/css/nav.css'
import avatar from '../static/images/avatar.png'
import Menu from './Menu'


const Pages = [['Главная', '/'], ['Профиль', '/profile'], ['Новости', '/news'], ['Чат', '/chat']];

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);

        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function PageTabs() {

    const routeMatch = useRouteMatch(Pages.map(([text, path]) => path));
    var currentTab = routeMatch?.pattern?.path;

    currentTab = (typeof currentTab !== 'undefined') ? currentTab : false;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    if (matches) {
        return (
            <Tabs className="horizTab" value={currentTab} sx={{ flexGrow: 1 }} centered >
                {Pages.map(([text, path]) => (
                    <Tab label={text} key={path} className="tabs" value={path} to={path} component={Link} />
                ))}
            </Tabs>
        )
    }

    return null;
}

export default function Nav(props) {
  return (
    <AppBar className="bar" sx={{ padding: {lg: "0 5%"} }}>
        <Toolbar className="toolbar" sx={{ display: {xs: "none", md: "flex"} }}>
            <Box sx={{ marginRight: "20px" }}>
                <Typography variant="h6" className="title">ДГТУ</Typography>
            </Box>
            <PageTabs />
            <Box mr={3}>
                {props.loggedIn 
                    ? <Button color="inherit" variant="standart" to="/logout" component={Link}>{props.user.surname} {props.user.name}</Button>
                    : <Button color="inherit" variant="standart" to="/login" component={Link}>Вход</Button>
                }
            </Box>
            {props.loggedIn ? (
                <Box ende="end">
                    <Avatar src={avatar} />
                </Box>
            ) : null }
            {!props.loggedIn ? <Button variant="standart" to="/signup" component={Link}>Регистрация</Button> : null}
        </Toolbar>
        <Toolbar className="toolbar" sx={{ display: {xs: "flex", md: "none"} }}>
            <Menu pages={Pages} loggedIn={props.loggedIn} />
            <Typography variant="h6" className="title mobile">ДГТУ</Typography>
        </Toolbar>    
    </AppBar>
  )
}
