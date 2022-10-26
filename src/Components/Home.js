import React, { Component } from 'react'
import { Box, Typography, Stack, Button } from '@mui/material';
import '../static/css/home.css';
import arrow from '../static/images/arrow.png'
import axios from 'axios'
import NewsBlock from './NewsBlock'

export default class Home extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isLoaded: false,
            news1: [],
            news2: [],
            news3: [],
            news4: []
        }
    }
    
    componentDidMount() {
        axios.get(`https://imf-dstu2-server.tk/api/news`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                news1: res.data.news[0],
                news2: res.data.news[1],
                news3: res.data.news[2],
                news4: res.data.news[3],
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
    const news1 = this.state.news1
    const news2 = this.state.news2
    const news3 = this.state.news3
    const news4 = this.state.news4

    if (this.state.isLoaded) {
        return (
            <>
                <div className="main-bg"></div>
                <Box sx={{ width: {xs: "90%", sm: "70%", md: "40%"}, left: {xs: "5%", sm: "15%", md: "30%"}}}>
                    <Typography className="neon main-title" variant="h1" gutterBottom>
                        Информатика и Вычислительная Техника
                    </Typography>
                    <div className="decor">
                        <img className="arrow-img" src={arrow} alt=""></img>
                    </div>
                    <Typography className="neon news-title" variant="h4" gutterBottom>
                        Новости
                    </Typography>
                    <Box className="main-news-container">
                        <Stack alignItems="center" justifyContent="center" className="news-stack" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 4, md: 6}}>
                            <Box className="news-block">{news1 ? <NewsBlock news={news1} /> : null}</Box>
                            <Box className="news-block">{news2 ? <NewsBlock news={news2} /> : null}</Box>
                        </Stack>

                        <Stack alignItems="center" justifyContent="center" className="news-stack2" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 4, md: 6 }}>
                            <Box className="news-block">{news3 ? <NewsBlock news={news3} /> : null}</Box>
                            <Box className="news-block">{news4 ? <NewsBlock news={news4} /> : null}</Box>
                        </Stack>
                        <Button className="all_news_button" variant="contained" onClick={() => {window.location.href = '/news';}}>Все новости</Button>
                    </Box>
                </Box>
            </>
        )
    }
    
  }
}
