import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import FormikTemplate from "../../layouts/AddForm";
import Wrapper from "../../layouts/wrapper";

export default function Add() {
  const router = useRouter();
  const add = async (val) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up`,
        val
      );
      router.push("/users");
    } catch (error) {
      if (error.response.status == 409) {
        toast.error(error.response.data.message);
      } else toast.error(error.message);
    }
  };

  const initialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "12345678",
    role: "prodi",
  };
  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          <h1 className="h3 mb-0 text-gray-800">Tambah User Baru</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={add}
          >
            <Form className="px-2 my-3">
              <div className="form-group col-md-6">
                <label htmlFor="fullName">Nama</label>
                <Field
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Nama..."
                  name="fullName"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username..."
                  autocaptitalize="off"
                  name="username"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="exampleFormControlInput1">Email</label>
                <Field
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  name="email"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="role">Role</label>
                <Field
                  as="select"
                  type="email"
                  className="form-control"
                  id="role"
                  name="role"
                >
                  <option value="admin">Admin</option>
                  <option value="prodi">Prodi</option>
                </Field>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="password">Password</label>
                <Field type="text" className="form-control" name="password" />
              </div>
              <div className="form-group col-md-6">
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-plus"></i> Tambah User
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Wrapper>
    </>
  );
}
