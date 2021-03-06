import { Grid, TextField, Divider, Typography, makeStyles, Container, Button, LinearProgress, TextareaAutosize, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { Alert, Autocomplete } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { authMiddleWare } from '../utils/auth';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10
    }
}));

const SubmitComplaint = () => {
    const classes = useStyles();
    const history = useHistory();
    const [policeStations, setPoliceStations] = useState([]);
    const [formData, setFormData] = useState({
        title: null,
        stationId: null,
        fullAddress: null,
        fullDetails: null,
        userId: null
    });
    const [responseValues, setResponseValues] = useState({
        success: false,
        failed: false,
        loading: false
    });

    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return
        }
        setResponseValues({...responseValues, success: false, failed: false});
    }

    const handleSubmit = (event) => {
        setResponseValues({...responseValues, loading: true});
        event.preventDefault();
        const newComplaint = {
			title: formData.title,
			stationId: formData.stationId,
			fullDetails: formData.fullDetails,
			fullAddress: formData.fullAddress,
		};
        Axios.post(`${AppConstants.apiEndpoint}/me/complaints`, newComplaint, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status === 200) {
                setResponseValues({...responseValues, success: true, loading: false});
            } else {
                setResponseValues({...responseValues, failed: true, loading: false});
            }
        })
        .catch(err => {
            setResponseValues({...responseValues, failed: true, loading: false});
            console.log(err);
        });
    };

    const getAllPoliceStations = () => {
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/police-stations`, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            const stations = [];
            res.data.forEach(station => {
                stations.push({
                    title: `${station.name} - ${station.city}`,
                    id: station.id
                });
            });
            setPoliceStations(stations);
            setResponseValues({...responseValues, loading: false});
        })
        .catch(error => {
            setResponseValues({...responseValues, loading: false});
            console.log(error);
        })
    }

    useEffect(() => {
        authMiddleWare(history);
        getAllPoliceStations();
    }, []);

    return (
        <div>
            <React.Fragment>
                <Snackbar open={responseValues.success} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="success" onClose={handleCloseSnackbar}>Success</Alert>
                </Snackbar>
                <Snackbar open={responseValues.failed} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="error" onClose={handleCloseSnackbar}>Failed</Alert>
                </Snackbar>
            </React.Fragment>
            <MainNav />
            <Container>
            <Typography variant="h5" className={classes.subTitle}>SUBMIT COMPLAINT</Typography>
            <Divider />
            <br />
            {responseValues.loading ? <LinearProgress /> : <div></div>}
            <form>
                    <Grid container spacing={3}>
                        <Grid item lg={6}>
                        <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                size="small"
                                type="text"
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={policeStations}
                                getOptionLabel={option => option.title}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, stationId: value.id})}
                                renderInput={params => <TextField {...params} label="Police Station" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <TextareaAutosize placeholder="Full Address" style={{width: '100%', height: '50%'}} onChange={(e) => setFormData({...formData, fullAddress: e.target.value})} />
                            <br />
                            <br />
                            <TextareaAutosize placeholder="Full Details" style={{width: '100%', height: '50%'}} onChange={(e) => setFormData({...formData, fullDetails: e.target.value})} />
                            <br />
                            <br />
                            <Button variant="contained" color="primary" disabled={responseValues.loading} onClick={handleSubmit}>Submit</Button>{'      '}
                            <Button variant="contained" color="primary" disabled={responseValues.loading}>Reset</Button>
                        </Grid>
                        <Grid item lg={6}>
                            
                        </Grid>
                    </Grid>
            </form>
            </Container>
        </div>
    );
};

export default SubmitComplaint;