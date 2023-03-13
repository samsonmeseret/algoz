import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// console.log(cookies.get("myCat"));
const Login = () => (
  <div>
    <h1>Sign In</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email Address id Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email Address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        axios
          .post("http://localhost:5000/login", values)
          .then((res) => {
            console.log(res.data.token);
            cookies.set("jwt", res.data.token, { path: "/" });
            setSubmitting(false);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          {/* <TextField fullWidth id="fullWidth" label="Email" type="email" name='email' variant="outlined" /> */}

          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          {/* <TextField fullWidth id="fullWidth" type={"password"} label="Password" variant="outlined" />  */}

          <ErrorMessage name="password" component="div" />
          {/* <Button variant="contained" type='submit' disabled={isSubmitting}>Sign In</Button> */}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
