import { Container, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { requestApi } from '../utils/requests';
import DataTable from '../components/DataTable/DataTable'

import '../styles/Dashboard.css'


export default function Dashboard() {
    const [collaborators, setCollaborators] = useState([{}])

    useEffect(() => {
        requestApi('/')
            .then(data => {
                setCollaborators(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={8}>
                <Container style={{ textAlign: 'center' }}>
                    <Typography variant='h2'>
                        Portal de Feedbacks
                    </Typography>
                    <Typography variant='h5'>
                        Escolha o colaborador para ver mais informações.
                    </Typography>
                </Container>
                {(collaborators.length > 1)
                    ? <DataTable
                        data={collaborators}
                    />
                    : <Typography variant='h4'>Carregando...</Typography>}
            </Grid>

        </Grid>
    )
}