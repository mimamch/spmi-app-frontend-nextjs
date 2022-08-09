import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import axios from "axios";

export default function FormikTemplate({ initialValues, apiEndPoint, field }) {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const add = async (val) => {
    try {
      // return console.log(val);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`,
        {
          ...val,
        }
      );
      router.push(backPath);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => add(values)}
      >
        <Form className="col-md-6">
          {field.map((f, i) => (
            <div key={i}>
              {!f.child ? (
                <div className="form-group">
                  <label htmlFor={`InputForm${i}`}>{f.title}</label>
                  <Field
                    required={true}
                    type={f.type}
                    className="form-control"
                    id={`InputForm${i}`}
                    name={f.name}
                  />
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>{f.title}</b>
                    </label>
                  </div>
                  <div className="row">
                    {f.child.map((ch, ii) => (
                      <div className="form-group col" key={ch + ii}>
                        <label htmlFor={`InputForm${ch + ii}`}>
                          {ch.title}
                        </label>
                        <Field
                          required={true}
                          type={ch.type}
                          className="form-control"
                          id={`InputForm${ch + ii}`}
                          name={f.name + "." + ch.name}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn-success">
            <i className="fa fa-plus"></i> Tambah Data
          </button>
        </Form>
      </Formik>
    </>
  );
}
