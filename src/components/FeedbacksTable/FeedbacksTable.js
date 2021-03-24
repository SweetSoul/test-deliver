import {
    Table, TableBody, TableCell, TableFooter, TableHead, TableRow,
    TablePagination, IconButton,
} from '@material-ui/core';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';


import TablePaginationActions from '../DataTable/Pagination'
import { Delete, ThumbUp } from '@material-ui/icons';
import { requestApi } from '../../utils/requests';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#d65a31',
        color: '#fff',
        boxShadow: '0 0 0 0 rgba(214, 90, 49, 0.2)',
        transition: 'transform 300ms, box-shadow 300ms',
        '&:hover': {
            backgroundColor: '#d65a31',
            transform: 'scale(1.1)',
            boxShadow: '0 0 5px 10px rgba(214, 90, 49, 0.2)',
        }
    },
    likeButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));



export default function FeedbacksTable(props) {
    const { data, onFeedbackChange, collabName, userId } = props;
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(new Array(data.length).fill(0))
    const [timer1, setTimer1] = useState(new Array(data.length).fill(null))





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const dateFormatted = (unformattedDate) => {
        let d = new Date(unformattedDate)
        return d.toLocaleDateString();
    }

    const updateLikes = async (n1, n2, fId, idx) => {
        let newLike = parseInt(n1) + parseInt(n2);
        clearTimeout(timer1[idx])
        setTimer1(timer1.map((timer, index) => (index === idx) ? setTimeout(() =>
            requestApi(`/${userId}/feedback/${fId}`, 'PUT', null, { like: newLike })
                .then(response => console.log(response))
            , 3000) : timer))
    }

    const handleLike = async (value, idx, id) => {
        console.log(count)
        if (idx >= count.length) {
            setCount([...count, 1])
            return updateLikes(count[idx] + 1, value, id, idx)
        }
        setCount(count.map((number, index) => (number === null) ? 1 : (index === idx) ? number += 1 : number))
        return updateLikes(count[idx] + 1, value, id, idx)
    }

    const handleRemove = (date, fId) => {
        let d = new Date(date);
        let now = new Date();
        let diff = now - d;
        let diffMins = Math.floor(diff / 60000);
        if (diffMins < 5) {
            console.log('Not removed ' + diffMins)
        } else {
            requestApi(`/${userId}/feedback/${fId}`, 'DELETE')
                .then(response => {
                    console.log(response)
                    onFeedbackChange(data.filter(i => i.id !== fId))
                })
        }
    }



    return (
        <div style={{ width: "66vw", marginTop: '50px' }}>

            <Table aria-label="tabela responsiva" style={{ alignItems: "flex-start" }}>
                <TableHead>
                    <TableRow key='header'>
                        <TableCell align="center" style={{ borderBottom: "2px solid #eee", backgroundColor: "#d65a31", fontSize: "18px", fontWeight: 600, color: "#fff", padding: "6px 10px" }}>Para</TableCell>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Criado em</TableCell>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Mensagem</TableCell>
                        <TableCell align="center" style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Likes</TableCell>
                        <TableCell align="center" style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * 10, page * 10 + 10).map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell align='center'>
                                <p>{collabName}</p>
                            </TableCell>
                            <TableCell>
                                <p>{dateFormatted(row.createdAt)}</p>
                            </TableCell>
                            <TableCell>
                                <p>{row.message}</p>
                            </TableCell>
                            <TableCell align="center" className={classes.likeButtonContainer} >
                                <p>{(count[idx] === null) ? parseInt(row.like) : parseInt(count[idx]) + parseInt(row.like)}</p>
                                <IconButton onClick={() => handleLike(row.like, idx, row.id)}>
                                    <ThumbUp />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" >
                                <IconButton className={classes.delButton} onClick={() => handleRemove(row.createdAt, row.id)}>
                                    <Delete />
                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow key='footer'>
                        <TablePagination
                            colSpan={12}
                            count={data.length}
                            rowsPerPage={10}
                            page={page}
                            onChangePage={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                            rowsPerPageOptions={[10]}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div >
    )
}