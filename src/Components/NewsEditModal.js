import React, { Component } from 'react'
import { IconButton, Card, CardContent, Box, Button, Modal, List, ListItem, TextField, InputLabel, Select, MenuItem, FormControl, TextareaAutosize } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'


export default class NewsEditModal extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            open: false,
            isLoaded: false,
            
            title: "",
            date: "",
            mark: "Социальная жизнь",
            content: "",
            image: '',
            news: ''
        }
    }

    componentDidMount() {
        axios.get(`https://imf-dstu2-server.tk/api/news/${this.props.id}`)
        .then((res) => {
            this.setState({
                news: res.data.news,

                title: res.data.news.title,
                date: res.data.news.date,
                mark: res.data.news.mark,
                content: res.data.news.content,

                isLoaded: true
            })
        }).catch((error) => {
            console.log(error)
            this.setState({
                isLoaded: true
            })
        });
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    inputChange = (prop) => (event) => {
        this.setState({
            [prop]: event.target.value 
        });
    };

    inputChangeImage = (event) => {
        console.log(event.target.files[0].name)
        this.setState({ image: event.target.files[0].name });
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.image) {
            axios.put(`https://imf-dstu2-server.tk/api/news/${this.props.id}`, {
                title: this.state.title,
                date: this.state.date,
                image: this.state.image,
                mark: this.state.mark,
                content: this.state.content
            }).then((res) => {
                window.location.href = '/news';
            }).catch((error) => {
                console.log(error)
            });
        } else {
            axios.put(`https://imf-dstu2-server.tk/api/news/${this.props.id}`, {
                title: this.state.title,
                date: this.state.date,
                mark: this.state.mark,
                content: this.state.content
            }).then((res) => {
                window.location.href = '/news';
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <IconButton className="news_action-buttons" onClick={this.handleOpen} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <Modal
                        disablePortal
                        disableEnforceFocus
                        disableAutoFocus
                        open={this.state.open}
                        onClose={this.handleClose}
                        className="add_modal"
                    >
                        <Card className="modal_card" sx={{ width: {xs: "90%", sm: "70%", md: "40%"}, left: {xs: "5%", sm: "15%", md: "30%"}}}>
                            <CardContent className="modal_content" >
                                <h1 className="modal_form_title">
                                    Добавление
                                </h1>
    
                                <form method="POST" onSubmit={this.onSubmit}>
                                    <List>
                                        <ListItem className="modal_inputs" disablePadding> 
                                            <TextField
                                                required
                                                label="Заголовок"
                                                id="title"
                                                type="text"
                                                value={this.state.title}
                                                onChange={this.inputChange('title')}
                                                variant="standard"
                                            />
                                        </ListItem>
    
                                        <ListItem className="modal_inputs" disablePadding> 
                                            <TextField
                                                required
                                                label="Дата"
                                                id="date"
                                                type="text"
                                                value={this.state.date}
                                                onChange={this.inputChange('date')}
                                                variant="standard"
                                            />
                                        </ListItem>
    
                                        <ListItem className="modal_inputs modal_radio_item" disablePadding>
                                            <FormControl fullWidth variant="standard">
                                                <InputLabel id="demo-simple-select-label">Маркер</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={this.state.mark}
                                                    onChange={this.inputChange("mark")}
                                                    label="Метка"
                                                    
                                                >
                                                    <MenuItem value={'Социальная жизнь'}>Социальная жизнь</MenuItem>
                                                    <MenuItem value={'Учебные новости'}>Учебные новости</MenuItem>
                                                    <MenuItem value={'Жизнь ВУЗа'}>Жизнь ВУЗа</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </ListItem>
                                        <ListItem className="modal_inputs" disablePadding>
                                            <TextareaAutosize
                                                minRows={3}
                                                placeholder="Описание"
                                                style={{ width: "60%" }}
                                                value={this.state.content}
                                                onChange={this.inputChange('content')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Box className="photo_button">
                                                <Button variant="contained" component="label">
                                                    Загрузить
                                                    <input hidden accept="image/*" onChange={this.inputChangeImage} multiple type="file" />
                                                </Button>
                                                <IconButton color="primary" aria-label="upload picture" component="label">
                                                    <input hidden accept="image/*" onChange={this.inputChangeImage} type="file" />
                                                    <PhotoCamera />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                    </List>
                                    <Button variant="contained" className="modal_inp_button" type="submit">Сохранить</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Modal>
                </>
            )
        }
        
    }
}
