import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import SetFlashMessage from "./components/SetFlashMessage";

export default function EditFormTemplate({
  initialValues,
  apiEndPoint,
  field,
}) {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("[id]")[0];
  const { id } = router.query;
  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`,
        {
          ...val,
        }
      );
      SetFlashMessage({
        type: "success",
        text: "Berhasil Mengubah Data",
      });

      router.push(backPath);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [initial, setInitial] = useState({});

  const getData = async (_id) => {
    try {
      if (!_id) return;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${_id}`
      );
      if (!data.data.data) {
        SetFlashMessage({
          type: "error",
          text: "Data Tidak Ditemukan",
        });
        return router.push(backPath);
      }
      setInitial(data.data.data);
    } catch (error) {
      console.log(error);
      SetFlashMessage({
        type: "error",
        text: "Data Tidak Ditemukan",
      });
      return router.push(backPath);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const temp = initialValues;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={Object.keys(initial).length != 0 ? initial : temp}
      onSubmit={(values) => add(values)}
    >
      <Form className="col-md-6">
        {field.map((f, i) => (
          <div key={i}>
            {f.type == "select" ? (
              <div className="form-group">
                <label htmlFor={`InputForm${i}`}>{f.title}</label>
                <Field
                  required={true}
                  as="select"
                  className="form-control"
                  id={`InputForm${i}`}
                  name={f.name}
                >
                  {f.option.map((e, i) => (
                    <option key={i} value={`${e.value}`}>
                      {e.title}
                    </option>
                  ))}
                </Field>
              </div>
            ) : !f.child ? (
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
                      <label htmlFor={`InputForm${ch + ii}`}>{ch.title}</label>
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
          <i className="fa fa-plus"></i> Ubah Data
        </button>
      </Form>
    </Formik>
  );
}
