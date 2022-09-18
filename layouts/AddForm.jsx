import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function FormikTemplate({ initialValues, apiEndPoint, field }) {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const add = async (val) => {
    try {
      // return console.log(val, apiEndPoint);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`,
        {
          ...val,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Cookies.set(
        "flash",
        JSON.stringify({
          type: "success",
          text: "Berhasil Menambah Data",
        })
      );

      router.push(backPath);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .row {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues, file: null }}
        onSubmit={(values) => add(values)}
      >
        {(props) => (
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
                      type={f.type || "text"}
                      className="form-control"
                      id={`InputForm${i}`}
                      name={f.name}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="form-group"
                      style={{ marginBottom: "-5px" }}
                    >
                      <label className="">{f.title}</label>
                    </div>
                    <div className="row justify-content-between">
                      {f.child.map((ch, ii) => (
                        <div key={ch + ii}>
                          {!ch.child ? (
                            <div className="form-group col" key={ch + ii}>
                              <label
                                className=""
                                htmlFor={`InputForm${ch + ii}`}
                              >
                                {ch.title}
                              </label>
                              <Field
                                required={true}
                                type={ch.type || "text"}
                                className="form-control"
                                id={`InputForm${ch + ii}`}
                                name={f.name + "." + ch.name}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="form-group ">
                                <label className="">{ch.title}</label>
                              </div>
                              <div className="col">
                                {ch.child.map((chch, chi) => (
                                  <div
                                    className="form-group "
                                    key={ch + chch + chi}
                                  >
                                    <label
                                      htmlFor={`InputForm${
                                        ch + chch + chi + ch.title
                                      }`}
                                    >
                                      {chch.title}
                                    </label>
                                    <Field
                                      required={true}
                                      type={chch.type || "text"}
                                      className="form-control"
                                      id={`InputForm${
                                        ch + chch + chi + ch.title
                                      }`}
                                      name={
                                        f.name + "." + ch.name + "." + chch.name
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="form-group">
              <label htmlFor="file">File</label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                placeholder=""
                autoComplete="off"
                onChange={(value) =>
                  props.setFieldValue("file", value.currentTarget.files[0])
                }
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fa fa-plus"></i> Tambah Data
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
