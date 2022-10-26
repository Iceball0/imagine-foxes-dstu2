import React, { Component } from 'react'
import { IconButton, Dialog, DialogTitle, Button, DialogActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'


export default class NewsEditModal extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         open: false
      }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClickClose = () => {
        this.setState({ open: false });
    }

    onButClick = (event) => {
        this.setState({ open: false });

        axios.delete(`https://imf-dstu2-server.tk/api/news/${this.props.id}`)
        .then((res) => {
            window.location.href = '/news';
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <>
                <IconButton className="news_action-buttons2" onClick={this.handleClickOpen} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="news_delete_alert"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Вы уверены, что хотите удалить эту новость?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClickClose}>Несогласен</Button>
                        <Button onClick={this.onButClick} autoFocus>Согласен</Button>
                    </DialogActions>
                </Dialog>
            </>
            
        )
        
    }
}
