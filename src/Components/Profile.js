import React, { Component } from 'react'

import Timetable from './Timetable'
import { Box, Typography, Stack } from '@mui/material';
import table1 from '../static/images/table1.png'
import table12 from '../static/images/table12.png'
import table2 from '../static/images/table2.png'
import table22 from '../static/images/table22.png'
import '../static/css/profile.css'


export default class Profile extends Component {

    render() {
        const loggedIn = this.props.loggedIn;
        const user = this.props.user;
        
        if (loggedIn) {
            if (user.permission !== 'admin') {
                return (
                    <>
                        <Typography className="neon profile_title" variant="h4" gutterBottom>
                            Новости
                        </Typography>
                        <Box className="table_container" sx={{ flexGrow: 1 }}>
                            <Stack 
                                className="main-stack"
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                justifyContent="space-evenly"
                                alignItems="center"
                                sx={{ width: "80%", height: "100%", left: "10%", position: "relative" }}
                            >
                                <Timetable role={user.permission} />
                                <Stack 
                                    direction="column"
                                    spacing={{ xs: 4, sm: 6, md: 15 }}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    className="tables_stack"
                                >
                                    <Box className="tables">
                                        {user.permission === 'student' 
                                        ? <img className='table1' src={table1} alt="" />  
                                        : <img className='table1' src={table12} alt="" />  
                                        }
                                    </Box>
                                    <Box className="tables">
                                        {user.permission === 'student' 
                                        ? <img className='table2' src={table2} alt="" />  
                                        : <img className='table2' src={table22} alt="" />  
                                        }   
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                    </>
                )
            } else {
                return (
                    <>
                        <Typography className="neon profile_title" variant="h4" gutterBottom>
                            Новости
                        </Typography>
                        <Box className="admin_table table_first">
                            <Timetable role="student" admin={true}/>
                        </Box>
                        <Box className="admin_table">
                            <Timetable role="teacher" admin={true} />
                        </Box>
                    </>
                )
            }
        } else {
            return window.location.href = '/';
        }
    }
}
