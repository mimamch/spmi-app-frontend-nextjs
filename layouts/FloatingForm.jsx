import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
export default function FloatingForm() {
  const [isShow, setIsShow] = useState(true);
  const submit = async (val) => {
    console.log(val);
    try {
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const initialValues = {
    val: "",
  };
  return (
    <>
      <div
        style={{
          display: isShow ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          position: "fixed",
          zIndex: 10,
        }}
        className="p-5"
      >
        <div
          onClick={() => setIsShow(false)}
          style={{
            background: "black",
            inset: 0,
            position: "fixed",
            zIndex: 10,
            opacity: "25%",
          }}
        ></div>
        <div
          style={{
            zIndex: 15,
            position: "fixed",
            width: "100%",
            background: "white",
          }}
          className="col-md-6 p-5 rounded"
        >
          <Formik onSubmit={submit} initialValues={initialValues}>
            <Form>
              <div className="col">
                <div className="form-group">
                  <label className="h4" htmlFor="field1">
                    Field 1
                  </label>
                  <Field
                    id="field1"
                    as="textarea"
                    type="text"
                    className="form-control"
                    name="val"
                    style={{ minHeight: "150px" }}
                  ></Field>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
