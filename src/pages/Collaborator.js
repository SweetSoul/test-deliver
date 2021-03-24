import { Avatar, Button, Card, Divider, Grid, Backdrop, Fade, Modal, TextField,
    Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { requestApi, requestApi2 } from '../utils/requests';
import FeedbacksTable from '../components/FeedbacksTable/FeedbacksTable';
import { ArrowBack } from '@material-ui/icons';

import { Add } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    lgAvatar: {
        width: '10vw',
        height: '10vw',
        margin: 'auto',
        boxShadow: '0 0 0px 5px rgba(214, 90, 49, 1)',
    },
    gridProfile: {
        borderRight: '2px solid #eeeeee',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginLeft: '20px',
        fontSize: '30px',
        '& + hr': {
            marginTop: '5px',
        },
    },
    divider: {
        height: '4px',
        backgroundColor: '#eee',
        maxWidth: '35%',
        marginLeft: '20px',
    },
    infoCard: {
        borderRadius: '30px',
        boxShadow: '0 5px 15px 5px rgba(255,255,255,.4)',
        padding: '20px',
        margin: 'auto 0',
        maxHeight: '80vh',
        overflow: 'auto',
        backgroundColor: '#222831',
        color: '#eee',
    },
    dataRow: {
        marginTop: '30px',
    },
    dataCol: {
        display: 'flex',
        marginLeft: '10px',
        alignItems: 'center',
        '& hr': {
            margin: '0 10px',
            height: '50%',
        },
    },
    dataCol2: {
        display: 'flex',
        '& button': {
            marginLeft: 'auto',
            marginRight: '50px',
        },
    },
    dataTxt: {
        fontSize: '20px',
    },
    subTitle: {
        fontSize: '18px',
    },
    vertDivider: {
        color: '#eee',
        backgroundColor: '#eee',
    },
    backBtn: {
        margin: '0 10px 20px',
        padding: '5px 20px',
        border: '1px solid #d65a31',
        borderRadius: '100px',
        color: '#fff',
        boxShadow: '0 0 0 0 rgba(214, 90, 49, 0.2)',
        transition: 'transform 300ms, box-shadow 300ms',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 0 5px 10px rgba(214, 90, 49, 0.2)',
        },
        '&:disabled': {
            backgroundColor: 'rgb(180, 180, 180)',
        },
    },
    feedbackBtn: {
        margin: '0 10px 20px',
        padding: '5px 20px',
        backgroundColor: '#d65a31',
        borderRadius: '100px',
        color: '#fff',
        boxShadow: '0 0 0 0 rgba(214, 90, 49, 0.2)',
        transition: 'transform 300ms, box-shadow 300ms',
        '&:hover': {
            backgroundColor: '#d65a31',
            transform: 'scale(1.1)',
            boxShadow: '0 0 5px 10px rgba(214, 90, 49, 0.2)',
        },
        '&:disabled': {
            backgroundColor: 'rgb(180, 180, 180)',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#222831',
        color: '#eee',
        padding: '40px',
        '& > div': {
            margin: '20px 0',
        },
        '& label': {
            color: '#eee!important',
        },
        '& label:disabled': {
            color: '#eee',
        },
        '& input': {
            color: '#eee!important',
        },
        '& fieldset': {
            borderColor: '#eee',
        },
        '& textarea': {
            color: '#eee',
        },
        '& fieldset:hover': {
            borderColor: '#d65a31',
        },
    },
}));

export default function Collaborator() {
    let { id } = useParams();
    let history = useHistory();
    const [collabInfo, setCollabInfo] = useState({ id: '', name: '', createdAt: '', company: '', role: '', avatar: '' });
    const [pictureSrc, setPictureSrc] = useState('');
    const [feedbacksData, setFeedbacksData] = useState([{ data: 'none' }])
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const [newFeedback, setNewFeedback] = useState({ collaboratorId: '', message: '', like: 1 })

    const handleOpen = () => {
        setOpen(true);
        setNewFeedback({ ...newFeedback, collaboratorId: id });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddFeedback = () => {
        requestApi(`/${id}/feedback`, 'POST', null, newFeedback)
            .then(response => { 
                console.log(response)
                setFeedbacksData([...feedbacksData, response]) 
            })
            .catch(error => console.log(error));
        handleClose();
    }

    useEffect(() => {
        requestApi(`/${id}`)
            .then(data => setCollabInfo(data))
            .catch(error => console.log(error))

        requestApi(`/${id}/feedback`)
            .then(feedData => setFeedbacksData(feedData))
            .catch(error => console.log(error))

        requestApi2('/', 'GET', {inc: 'picture'})
        .then(imgData => {
            setPictureSrc(imgData.results[0].picture.large)
        })
        .catch(error => console.log(error))
    }, [id])



    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems='center'
            style={{ minHeight: '100vh', maxWidth: '100vw', padding: '25px' }}
        >
            <Card className={classes.infoCard}>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    style={{ minHeight: '80vh', width: '90vw' }}
                >
                    <Grid item xs={2} className={classes.gridProfile}>
                        <Avatar alt={collabInfo.name} src={pictureSrc} className={classes.lgAvatar} />
                    </Grid>
                    <Grid item xs={10} className={classes.gridTxt}>
                        <Typography className={classes.title} variant='h3'>{collabInfo.name} - ID: {collabInfo.id}</Typography>
                        <Divider className={classes.divider} />
                        <Grid container spacing={0} direction='row' className={classes.dataRow}>
                            <Grid item xs={3} className={classes.dataCol}>
                                <Typography className={classes.subTitle} variant='h5'>Empresa</Typography>
                                <Divider orientation='vertical' className={classes.vertDivider} />
                                <Typography className={classes.dataTxt} variant='h5'>{(collabInfo.company === '') ? 'Carregando...' : collabInfo.company}</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.dataCol}>
                                <Typography className={classes.subTitle} variant='h5'>Cargo</Typography>
                                <Divider orientation='vertical' className={classes.vertDivider} />
                                <Typography className={classes.dataTxt} variant='h5'>{(collabInfo.role === '') ? 'Carregando...' : collabInfo.role}</Typography>
                            </Grid>
                            <Grid item xs={5} className={classes.dataCol2}>
                                <Button className={classes.feedbackBtn} onClick={handleOpen} endIcon={<Add />}>
                                    Novo Feedback
                                </Button>
                                <Button className={classes.backBtn}
                                    variant='outlined'
                                    onClick={() => history.push('/')}
                                    startIcon={<ArrowBack />}
                                >
                                    Voltar para painel
                                </Button>
                            </Grid>
                        </Grid>
                        {(feedbacksData.data !== 'none')
                            ? <FeedbacksTable
                                data={feedbacksData}
                                collabName={collabInfo.name}
                                userId={id}
                                onFeedbackChange={setFeedbacksData}
                            />
                            : <Typography variant='h5'>Carregando ...</Typography>
                        }
                    </Grid>
                </Grid>
            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}>
                <Fade in={open}>
                    <div className={classes.modalContainer}>
                        <Typography variant='h4'>Adicionar feedback</Typography>
                        <TextField fullWidth variant='outlined' label='Para' defaultValue={collabInfo.name} disabled />
                        <TextField fullWidth variant='outlined' label='Mensagem' multiline rows={3}
                            onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                        />
                        <TextField fullWidth variant='outlined' label='Likes' type='number' value={newFeedback.like}
                            onChange={(e) => setNewFeedback({ ...newFeedback, like: parseInt(e.target.value) })}
                        />
                        <Button onClick={() => handleAddFeedback()}>Enviar Feedback</Button>
                    </div>
                </Fade>
            </Modal>
        </Grid>

    )
}