import React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Tabs, Tab, IconButton, ListItemIcon } from '@mui/material';
import { Link, useLocation, matchPath } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


function UseRouteMatch(patterns) {
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

export default function Menu(props) {
  const [isOpened, setOpen] = React.useState(false);
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  

  const toggleMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setOpen(open);
  }

  const list = () => {

    const routeMatch = UseRouteMatch(props.pages.map(([text, path]) => path));
    var currentTab = routeMatch?.pattern?.path;

    currentTab = (typeof currentTab !== 'undefined') ? currentTab : false;

    if (matches) {
        return (
            <Box
                className="menu"
                role="presentation"
                onClick={toggleMenu(false)}
                onKeyDown={toggleMenu(false)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={toggleMenu(false)}>
                            <ListItemIcon>
                                <CloseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Закрыть" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <Tabs className="verticTab" value={currentTab} orientation="vertical" sx={{ borderRight: 1, borderColor: 'divider' }}>
                    {props.pages.map(([text, path]) => (
                        <Tab label={text} key={path} value={path} to={path} className="tabs_menu" component={Link} />
                    ))}
                </Tabs>
                <Divider />
                <List>
                    <ListItem disablePadding>
                    {props.loggedIn 
                        ? (
                            <ListItemButton to="/logout" component={Link}>
                                <ListItemText primary="Выход" />
                            </ListItemButton>
                        )
                        : (
                            <ListItemButton to="/login" component={Link}>
                                <ListItemText primary="Вход" />
                            </ListItemButton>
                        )
                    }
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton to="/signup" component={Link}>
                            <ListItemText primary="Регистрация" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        )
    }

    return null;
  }

  return (
    <>
        <Box edge="start" className="avatar">
            <IconButton
                className="menuButton"
                edge="start"
                onClick={toggleMenu(true)}
            >
                <MenuIcon />
            </IconButton> 
        </Box>
        <Drawer
            anchor='left'
            open={isOpened}
            onClose={toggleMenu(false)}  
            className="drawer"  
        >
            {list()}
        </Drawer>
    </>
  )
}
