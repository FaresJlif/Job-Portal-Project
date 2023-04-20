import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction, jobLoadSingleAction } from '../../redux/actions/jobAction';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import EditJob from '../EditJob';



const DashJobs = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction())
        dispatch(jobTypeLoadAction())
    }, []);


    const { jobs, loading } = useSelector(state => state.loadJobs);
    let data = [];
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []
    // console.log(data)

    const { jobType } = useSelector(state => state.jobTypeAll);
    let jobTypes = [];
    jobTypes = (jobType !== undefined && jobType.length > 0) ? jobType : []
    // console.log(jobTypes)


    //delete job by Id
    const deleteJobById = (e, id) => {
        console.log(id)
    }

    const jobReducer = useSelector(state => state.singleJob.job);
    const [jobState, setJobState] = useState({})
    useEffect(() => {
        setJobState(jobReducer)
    }, [])
    console.log(jobState)
    const editJobById = (e, info) => {
        console.log(info)
    }
    const getJobById = (id) => {
        dispatch(jobLoadSingleAction(id))
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [edit, setEdit] = React.useState(false);

    const handleChange = (event) => {
        // setJobTypeState(event.target.value);
    };

    const columns = [

        {
            field: '_id',
            headerName: 'Job ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Job name',
            width: 150,
        },
        {
            field: 'jobType',
            headerName: 'Category',
            width: 150,
            valueGetter: (data) => data.row.jobType.jobTypeName
        },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            valueGetter: (data) => data.row.user.firstName
        },
        {
            field: 'available',
            headerName: 'available',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))

        },

        {
            field: 'salary',
            headerName: 'Salary',
            type: Number,
            width: 150,
            renderCell: (values => (
                "$" + values.row.salary
            ))

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    {/* <Button onClick={handleOpen} variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}`}>Edit</Link></ Button> */}
                    <Button onClick={() => { getJobById(values.row._id); handleOpen() }} variant="contained">Edit</Button>
                    <Button onClick={(e) => deleteJobById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TextField id="outlined-basic" label="Job Title" variant="outlined" value={values.row.title} />
                            <TextField id="outlined-basic" label="Job Description" variant="outlined" value={values.row.description} />
                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value=
                                    label="Job Type"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl> */}
                            <Button onClick={(e) => editJobById(e, values.row)} variant="contained">Save</Button>
                        </Box>
                    </Modal>
                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs list
            </Typography>
            
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} >Create Job</Link></Button>
                
            </Box>
            {/* <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper> */}
            {data.map(job => {
                return (
                    <EditJob job={job} />
                )
            })}
        </Box>
    )
}

export default DashJobs