import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,

  Box,
  TextField,
  Typography,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Paper,
  fabClasses,
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {  jobLoadSingleAction } from "../redux/actions/jobAction";
import { editJob } from "../redux/actions/jobAction";
import {  useParams } from "react-router-dom";
import { useEffect } from "react";


const EditJob = () => {
  const [job,setJob]= useState({ JobName: "", JobDescription: "",JobLocation:"", jobAvailability: "", JobSalary: "$" });
 

  const dispatch = useDispatch();

  const{id} = useParams();
  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
   
}, [id]);


const fetchedJob  = useSelector(state =>{return state.singleJob} );
let data= fetchedJob.job;
const [editedJob, setEditedJob] = React.useState( fetchedJob.job);
 
const handleChange = (e) => {
  setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
}


 

  return (

    <>
<Box>
      {
        <Card sx={{height:500}}>
          <CardContent>
            <TextField
              onChange={handleChange}
              name="title"
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              value={editedJob.title}
            />
            <TextField
              onChange={handleChange}
              name="description"
              id="outlined-basic"
              label="Job Description"
              variant="outlined"
              value={editedJob.description}
            />
            <TextField
              onChange={handleChange}
              name="salary"
              id="outlined-basic"
              label="Job Salary"
              variant="outlined"
              value={editedJob.salary}
            />
         <TextField onChange={handleChange} name='location' label="Job Location" variant="outlined" value={editedJob.location} />
             <FormControl>
              
                        <FormLabel   name="Job Availability"id="demo-row-radio-buttons-group-label">Job Availability</FormLabel>
                        <RadioGroup 
                            
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="available"
                            value={editedJob.available}
                            onChange={handleChange}
                        >
                            <FormControlLabel onChange={handleChange} value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel onChange={handleChange} value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                        </FormControl>
            <Typography  color="text.secondary"></Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            
            <Button onClick={() => { dispatch(editJob(editedJob._id, editedJob)); setJob(false) }} variant="contained">Save</Button>
            <Button onClick={() => {setJob(false);setEditedJob(job) }} variant="contained">Cancel</Button>
             {/* <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, length:600, width: '100%' }}>
                 
                    <DataGrid
                        rows={job.value}
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
                       
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        
                    />
                </Box>
            </Paper>  */}
          </CardActions>

        </Card>
        
      }
      </Box>
    </>
  );
};

export default EditJob;
