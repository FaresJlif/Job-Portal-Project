import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import Navbar from '../component/Navbar'
import { jobLoadSingleAction } from '../redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../redux/actions/userAction'


const SingleJob = () => {
    const dispatch = useDispatch();
    const { job, loading } = useSelector(state => state.singleJob)
    const { id } = useParams();
    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [dispatch, id]);

    const applyForAJob = () => {
        dispatch(userApplyJobAction({
            title: job && job.title,
            description: job && job.description,
            salary: job && job.salary,
            location: job && job.location
        }))
    }

    return (
        <>

            <Box sx={{ bgcolor: "#fafafa" }}>

                <Navbar />
                <Box sx={{ height: '85vh' }}>
                    <Container sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>

                                {
                                    loading ? <LoadingBox /> :

                                        <Card>
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {job && job.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: ${job && job.salary}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {job && job.jobType ? job.jobType.jobTypeName : "No category"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {job && job.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    {/* <h3>Job description:</h3> */}
                                                    {job && job.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2 }}>
                                    <Button onClick={applyForAJob} sx={{ fontSize: "13px" }} variant='contained'>Apply for this Job</Button>
                                </Card>
                            </Box>

                        </Stack>

                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export default SingleJob