import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'
import NewsBlock from './NewsBlock'
import axios from 'axios'
import NewsAddModal from './NewsAddModal'
import NewsEditModal from './NewsEditModal'
import NewsDeleteButton from './NewsDeleteButton'
import '../static/css/news_page.css'
import '../static/css/modal.css'


export default class News extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            news: [],
            isLoaded: false,
            open: false,
            
            title: "",
            date: "",
            mark: "Социальная жизнь",
            content: ""
        }
    }

    componentDidMount() {
        axios.get(`https://imf-dstu2-server.tk/api/news`)
        .then((res) => {
            this.setState({
                news: res.data.news,
                isLoaded: true
            })
        })
        .catch((error) => {
            this.setState({
                isLoaded: true
            })
            console.log(error);
        });
    }    


    render() {
        const user = this.props.user;
        var permission = '';

        if (user) {
            permission = user.permission;
        }

        if (this.state.isLoaded) {

            const news = this.state.news;

            return (
                <>
                    <Typography className="neon news_page_title" variant="h4" gutterBottom>
                        Новости
                    </Typography>
                    <Box className="news_container">
                    {news.map((item) => (
                        <>
                            <Box className="box" sx={{ width: { xs: "60%", sm: "70%", md: "80%" }, height: {xs: "60%", sm: "15%", md: "10%"} }} key={this.state.news.indexOf(item)}>
                                <NewsBlock news={item} />
                            </Box>
                            {permission === 'admin' ? (
                                <Box className="action-box">
                                    <NewsEditModal id={item.id} />
                                    <NewsDeleteButton id={item.id} />
                                </Box>
                            ) : null}
                        </>
                    ))}
                    {permission === 'admin' ? <NewsAddModal /> : null }
                    </Box>
                </>
            )
        }
    }
}
