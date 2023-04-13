import React, { useEffect } from 'react';
import Footer from '../component/Footer';
import { Avatar, Box } from '@mui/material';
import Navbar from '../component/Navbar';
import { useFormik } from 'formik';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  FirstName: yup
  .string('Enter your FirstName')
  .email('Enter a valid FirstName')
  .required('FirstName is required'),
  LastName: yup
  .string('Enter your LastName')
  .email('Enter a valid LastName')
  .required('LastName is required'),
  email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});



const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector(state => state.userSignUp);
  useEffect(() => {

      if (isAuthenticated) {
          if (userInfo.role === 1) {
              navigate('/admin/dashboard');
          } else {
              navigate('/user/dashboard');
          }
      }

  }, [isAuthenticated, userInfo, navigate]);

  const formik = useFormik({
      initialValues: {
          FirstName: '',
          LastName: '',
          email: '',
          password: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values, actions) => {
          dispatch(userSignUpAction(values));
          actions.resetForm();
      }

  })
  return (
    <>
        <Navbar />
        <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}>


            <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                        <LockClockOutlined />
                    </Avatar>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="FirstName"
                        label="FirstName"
                        name='FirstName'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="FirstName"
                        value={formik.values.FirstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
                        helperText={formik.touched.FirstName && formik.errors.FirstName}
                    />
                     <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="LastName"
                        label="LastName"
                        name='LastName'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="LastName"
                        value={formik.values.LastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.LastName && Boolean(formik.errors.LastName)}
                        helperText={formik.touched.LastName && formik.errors.LastName}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="email"
                        label="E-mail"
                        name='email'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button fullWidth variant="contained" type='submit' >Sign Up</Button>
                </Box>
            </Box>
        </Box>
        <Footer />
    </>
)
}


export default SignUp;