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
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { deleteJobByid } from "../redux/actions/jobAction";
import { editJob } from "../redux/actions/jobAction";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid , gridClasses} from "@mui/x-data-grid";
import { blue } from "@mui/material/colors";


const EditJob = ({ job }) => {
  console.log(job);
  const [edit, setEdit] = React.useState(false);
  const deleteJob = (id) => { dispatch(deleteJobByid(id)) }
  const [editedJob, setEditedJob] = React.useState(job);
  // console.log(editedJob)
  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
  }
  const AddJob = () => {
    const [job, setJob] = useState({ JobName: "", JobDescription: "",JobLocation:"", jobAvailability: "", JobSalary: "$" })
    const handleChanged = (e) => {
      e.preventDefault();
      setJob({ ...job, [e.target.JobName]: e.target.value })
    }
    
  }

 

  const dispatch = useDispatch()
  return (

    <>
<Box>
      {!edit ? (
        <Card sx={{color:blue}}>
          
          <CardActions>
            <Button
              onClick={() => { setEdit(true); }} variant="contained">Edit</Button>

            <Button variant="danger" onClick={() => { dispatch(deleteJob(job._id)) }}>Delete</Button>

          </CardActions>
        </Card>
      ) : (
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
            <TextField
            onChange={handleChange}
            name="Location"
            id="outlined-basic"
            label="Job Location"
            variant="outlined"
            value={editedJob.location}
            />
             <FormControl>
              
                        <FormLabel   name="Job Availability"id="demo-row-radio-buttons-group-label">Job Availability</FormLabel>
                        <RadioGroup 
                            
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={editedJob.available}
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
            
            <Button onClick={() => { dispatch(editJob(editedJob._id, editedJob)); setEdit(false) }} variant="contained">Save</Button>
            <Button onClick={() => { setEdit(false); setEditedJob(job) }} variant="contained">Cancel</Button>
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
        
      )}
      </Box>
    </>
  );
};

export default EditJob;
