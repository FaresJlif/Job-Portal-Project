import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { deleteJobByid } from "../redux/actions/jobAction";
import { editJob } from "../redux/actions/jobAction";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


const EditJob = ({ job }) => {
  const [edit, setEdit] = React.useState(false);
  
  const [Available] = React.useState(true);
  const deleteJob =(id)=>{ dispatch(deleteJobByid(id))}
  const [editedJob, setEditedJob] = React.useState(job);
  console.log(editedJob)
  const handleChange = (e) => {
    e.preventDefault();
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
  }
  const AddJob=()=>{
    const [job,setJob]=useState({JobName: "",JobDescription:"",jobAvailability:"",JobSalary:"$" })
    const handleChanged =(e)=>{
      e.preventDefault();
        setJob({...job,[e.target.JobName]: e.target.value})
  }
  
  
  }
  const dispatch = useDispatch()
  return (
    
    <>
 
      {!edit ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
         
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {job.title}
            </Typography>
            <Typography variant="h5" component="div">
              {job.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {setEdit(true);}}variant="contained">Edit</Button>
            
            <Button variant="danger" onClick={()=> {dispatch(deleteJob(job._id))}}>delete</Button>
            
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TextField
            onChange={handleChange}
            name="title"
              id="outlined-basic"
              label="Job Name"
              variant="outlined"
              value={editedJob.title}
            />
            <TextField
            name="description"
              id="outlined-basic"
              label="Job Description"
              variant="outlined"
              value={editedJob.description}
            />
            <TextField
            onChange={handleChange}
            name="job Availability"
              id="outlined-basic"
              label="Job Availability"
              variant="outlined"
              value={
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Job Type
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    
                    label="Job Type"
                    
                  >
                    <MenuItem >Available</MenuItem>
                    <MenuItem >Unavailable</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            <TextField
            onChange={handleChange}
            name="salary"
              id="outlined-basic"
              label="Job Salary"
              variant="outlined"
              value={editedJob.salary}
            />
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => { dispatch(editJob(editedJob._id, editedJob)); setEdit(false) }} variant="contained">Save</Button>
          </CardActions>
          
        </Card>
      )}
    </>
  );
};

export default EditJob;
