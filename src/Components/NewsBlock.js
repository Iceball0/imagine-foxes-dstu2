import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material'
import React from 'react'
import '../static/css/news_block.css'

export default function NewsBlock(props) {

    return (
        <Card className="news_card">
            <Chip className="news_chip" label={props.news.mark} color="primary" variant="outlined" />
            <CardMedia 
                className="news_image"
                component="img"
                height="140"
                src={process.env.PUBLIC_URL + '/images/' + props.news.image}
                alt=""
            />

            <CardContent className="news_content">
                <Typography className="news_title" variant="h5" component="div">
                    {props.news.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.news.date}
                </Typography>
                <Typography className="news_text" variant="body2" color="text.secondary">
                    {props.news.content}
                </Typography>
            </CardContent>
        </Card>
    )
}
