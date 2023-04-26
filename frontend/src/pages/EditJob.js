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
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {  jobLoadSingleAction } from "../redux/actions/jobAction";
import { editJob } from "../redux/actions/jobAction";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


const EditJob = () => {
  const [job,setJob]= useState({ JobName: "", JobDescription: "",JobLocation:"", jobAvailability: "", JobSalary: "$" });
  const [editedJob, setEditedJob] = React.useState( null);
const navigate=useNavigate()
  const dispatch = useDispatch();
  const fetchedJob  = useSelector(state =>{return state.singleJob} );
  const{id} = useParams();
  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
   
}, [dispatch,id]);


useEffect(
() =>{
  if(fetchedJob.job!=null && fetchedJob.job._id==id)
  {let data = fetchedJob.job;
    setEditedJob(data);
  }
}
  ,[dispatch, fetchedJob.job])

 
const handleChange = (e) => {
  setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
}


 

  if (editedJob)
  {return (

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
                            value={editedJob.available?editedJob.available:true}
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
            
            <Button onClick={() => { dispatch(editJob(editedJob._id, editedJob));navigate("/admin/jobs") }} variant="contained">Save</Button>
            <Button onClick={() => {setEditedJob(job);navigate("/admin/jobs") }} variant="contained">Cancel</Button>
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
}else{
  return null;
}}

export default EditJob;
