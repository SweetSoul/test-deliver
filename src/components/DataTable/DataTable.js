import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TablePagination } from '@material-ui/core';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import TablePaginationActions from './Pagination'
import { useHistory } from 'react-router-dom';

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
}));



export default function DataTable(props) {
    let history = useHistory();
    const classes = useStyles();
    const [page, setPage] = useState(0);

    const { data } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ width: "66vw", marginTop: '50px' }}>
            <Table aria-label="tabela responsiva" style={{ alignItems: "flex-start" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#d65a31", fontSize: "18px", fontWeight: 600, color: "#fff", padding: "6px 10px" }}>Nome</TableCell>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Empresa</TableCell>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px" }}>Cargo</TableCell>
                        <TableCell style={{ borderBottom: "2px solid #eee", backgroundColor: "#222831", fontSize: "18px", fontWeight: 600, padding: "6px 10px", textAlign: 'center' }}>Feedbacks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * 10, page * 10 + 10).map(row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <p>{row.name}</p>
                            </TableCell>
                            <TableCell align="left">
                                <p>{row.company}</p>
                            </TableCell>
                            <TableCell align="left">
                                <p>{row.role}</p>
                            </TableCell>
                            <TableCell style={{ padding: "10px", textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push(`/Collaborator/${row.id}`)}
                                >
                                    Ver mais
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
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