import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { deleteJobByid } from "../redux/actions/jobAction";

const EditJob = ({ job }) => {
  const [edit, setEdit] = React.useState(false);
  const dispatch = useDispatch()
  const [Available] = React.useState(true);
  const deleteJob =(id)=>{ dispatch(deleteJobByid(id))}
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
              onClick={() => {
                setEdit(true);}}variant="contained">Edit</Button>
            
            <Button variant="danger" onClick={()=> {dispatch(deleteJob(job._id))}}>delete</Button>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Job Name"
              variant="outlined"
              value={job.title}
            />
            <TextField
              id="outlined-basic"
              label="Job Description"
              variant="outlined"
              value={job.description}
            />
            <TextField
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
                    defaultValue={Available}
                    label="Job Type"
                    //onChange={handleChange}
                  >
                    <MenuItem value={true}>Available</MenuItem>
                    <MenuItem value={false}>Unavailable</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            <TextField
              id="outlined-basic"
              label="Job Salary"
              variant="outlined"
              value={job.salary}
            />
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                setEdit(false);
              }}
              variant="contained"
            >
              Save
            </Button>
          
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default EditJob;
