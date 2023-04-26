import React, { useEffect, useState } from 'react'
import { createJob, jobLoadAction, jobLoadSingleAction } from '../../redux/actions/jobAction';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { deleteJobByid } from "../../redux/actions/jobAction";
import { Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';




const DashJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction())
        dispatch(jobTypeLoadAction())
    }, []);


    const { jobs, loading } = useSelector(state => state.loadJobs);
    let data = [];
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []

    const { jobType } = useSelector(state => state.jobTypeAll);
    let jobTypes = [];
    jobTypes = (jobType !== undefined && jobType.length > 0) ? jobType : []
    // console.log(jobTypes)


    //delete job by Id
    // const deleteJobById = (e, id) => {
    //     console.log(id)
    // }

    const jobReducer = useSelector(state => state.singleJob.job);
    const [jobState, setJobState] = useState({})
    useEffect(() => {
        setJobState(jobReducer)
    }, [])
    const deleteJob = (id) => { dispatch(deleteJobByid(id)) }
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

    const columns = [

      
        {
            field: 'title',
            headerName: 'Job name',
            width: 150,
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
            field: 'Location',
            headerName: 'Location',
            type: Number,
            width: 150,
            renderCell: (values => (
                "" + values.row.location
            ))

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (

                
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}` } >Edit</Link></ Button>
                < Button onClick={(e) => dispatch(deleteJob(values.row._id)) } variant="contained" color="error">Delete</ Button>
            </Box>
            )
        }
    ];

    const [newJob, setNewJob] = useState({title:"", salary:"", location:"", available:true })
    const handleChange = (e) => {
        setNewJob({...newJob, [e.target.name]: e.target.value})
    }
    

    return (
        <Box
         >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField onChange={handleChange} name='title' label="Job Title" variant="outlined" value={newJob.title} />
                    <TextField onChange={handleChange} name='description' label="Job Description" variant="outlined" value={newJob.description} />
                    <TextField onChange={handleChange} name='salary' label="Job Salary" variant="outlined" value={newJob.salary} />
                    <TextField onChange={handleChange} name='location' label="Job Location" variant="outlined" value={newJob.location} />
                    
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Job Availability</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="available"
                            value={newJob.available}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={(e) => { dispatch(createJob(newJob)); handleClose(); setNewJob({title:"", description:"", salary:"", location:"", available:true}) }} variant="contained">Save</Button>
                    <Button onClick={(e) => { handleClose(); setNewJob({title:"", description:"", salary:"", location:"", available:true}) }} variant="contained">Cancel</Button>
                </Box>
            </Modal>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs list
            </Typography>

            <Box sx={{  pb: 2 ,display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />} onClick={handleOpen}>Create Job</Button>
                
            </Box>
            
           
            { <Paper sx={{ bgcolor: "secondary.midNightBlue" }} 
            >
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
            },
            height:400
        }}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
    />
</Paper> }
        
    

         
        </Box>
        
    )
}

export default DashJobs