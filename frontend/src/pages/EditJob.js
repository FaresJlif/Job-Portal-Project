import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import React from 'react'

const EditJob = ({job}) => {
  const [edit, setEdit] = React.useState(false);
  return (
    <>
      {!edit ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h5" component="div">
              {job.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => { setEdit(true) }} variant="contained">Edit</Button>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={job.title} />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={job.description} />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => { setEdit(false) }} variant="contained">Save</Button>
          </CardActions>
        </Card>
      )}

    </>
  )
}

export default EditJob