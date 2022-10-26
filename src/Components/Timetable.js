import React, { Component } from 'react'
import axios from 'axios'
import { Card, Divider, Paper, List, ListItem, CardContent, Stack, Box, FormControl, Select, MenuItem, Typography, Button, IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import * as xlsx from 'xlsx';
import '../static/css/timetable.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Profile extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            data: [{Время: '8:30 - 10:05', Понедельник: ''}],
            currentTab: "Понедельник",
            isLoaded: false
        }
    }

    componentDidMount() {   
        var id = 0

        if (this.props.role === "student") {
            id = 1;
        } else if (this.props.role === "teacher") {
            id = 2;
        }

        axios.get(`https://imf-dstu2-server.tk/api/timetable/${id}`)
        .then((res) => {
            this.setState({ data: res.data.table,
                            isLoaded: true})
            cookies.set('table', {role: this.props.role, json: res.data.table}, {path: '/', maxAge: 604800})
        })
        .catch((error) => {
            this.setState({ isLoaded: true})
        });
    }

    handleChange = (event) => {
        this.setState({ currentTab: event.target.value  })
    }

    checkColor = (subject) => {
        if (subject) {
            const type = subject.split(' ')[0]

            switch(type) {
                case 'фв.': 
                    return '#65B8CA'
                case 'лек.': 
                    return '#65CA6F'
                case 'пр.': 
                    return '#CA9B65'
                case 'лаб.': 
                    return '#BC65CA'
                default:
                    return '#e6e2e2'
            }
        }

        return '#e6e2e2'
    }

    readUploadFile = (role) => (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                this.setState({ data: json });

                axios.post('https://imf-dstu2-server.tk/api/timetable', {
                    table: json,
                    role: role
                });

            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }


    render() {
        const currentTab = this.state.currentTab

        const admin = this.props.admin;

        if (this.state.isLoaded) {
            return (
                <>
                    <div>{this.state.data[0]["Понедельник"]}</div>
    
                    <Card className="table_card">
                        <CardContent>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Typography variant="h6" className="title_table">Расписание</Typography>
                                <FormControl className="select">
                                    <Select
                                        value={this.state.currentTab}
                                        onChange={this.handleChange}
                                        sx={{ width: { xs: "160px", md: "120px", lg: "160px"  } }}
                                    >
                                        <MenuItem value={"Понедельник"}>Понедельник</MenuItem>
                                        <MenuItem value={"Вторник"}>Вторник</MenuItem>
                                        <MenuItem value={"Среда"}>Среда</MenuItem>
                                        <MenuItem value={"Четверг"}>Четверг</MenuItem>
                                        <MenuItem value={"Пятница"}>Пятница</MenuItem>
                                        <MenuItem value={"Суббота"}>Суббота</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Divider className="divider"/>
                            <List>
                                { this.state.data.map((item) => (
                                     <ListItem className="subject-item" disablePadding key={this.state.data.indexOf(item)} >
                                        <Stack className="time-stack" direction="row" spacing={2}>
                                            <Paper className="time-paper">
                                                {item["Время"].split(' - ')[0]}
                                                <Divider className="time-divider" />
                                                {item["Время"].split(' - ')[1]}
                                            </Paper>
                                            <Box className="subject" 
                                                sx={{ backgroundColor: this.checkColor(item[currentTab]) }}
                                            >
                                                <Typography noWrap className="sbj-title" variant="h6" component="h2">{item[currentTab] ? item[currentTab].split(' / ')[0] : null}</Typography>
                                                <Typography className="sbj-subtitle" >{item[currentTab] ? item[currentTab].split(' / ')[1] : null}</Typography>
                                            </Box>
                                        </Stack>
                                    </ListItem>
                                ))}
                                </List>
                                {admin ? (
                                    <Box className="upload">
                                        <Button variant="contained" component="label">
                                            Загрузить
                                            <input hidden type="file" onChange={this.readUploadFile("teacher")} />
                                        </Button>
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden type="file" onChange={this.readUploadFile("teacher")} />
                                            <AttachFileIcon />
                                        </IconButton>
                                    </Box>
                                ) : null}
                        </CardContent>
                    </Card>
                </>
            );   
        }
    }
}