import axios from 'axios';
import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,

} from "../constants/jobconstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}
//deletejob
export const deleteJobByid = (id) => async (dispatch) => {

    try {
        await axios.delete(`/api/job/delete/${id}`);
        dispatch(jobLoadAction())

    } catch (error) {
        console.log(error)

    }
}
// update job
export const editJob = (id, job) => async (dispatch) => {
    try {
        await axios.put(`/api/job/update/${id}`, job)
        dispatch(jobLoadAction())
    } catch (error) {
        console.log(error);
    }
}
// create job
export const createJob = (job) => async (dispatch) => {
    try {
        await axios.post(`/api/job/create`, job)
        dispatch(jobLoadAction())
    } catch (error) {
        console.log(error);
    }
}