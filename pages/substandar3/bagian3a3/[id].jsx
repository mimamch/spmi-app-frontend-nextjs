import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import EditFormTemplate from "../../../layouts/EditForm";
import Cookies from "js-cookie";

export default function Bagian1() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("[")[0];
  const { id } = router.query;
  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA3/${id}`,
        {
          ...val,
        }
      );
      Cookies.set(
        "flash",
        JSON.stringify({
          type: "success",
          text: "Berhasil Mengubah Data",
        })
      );
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA3/${_id}`
      );
      setInitial(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const temp = {
    namaDosen: "",
    dtps: "false",
    ewmp: {
      pendidikan: {
        psYangDiakreditasi: "",
        psLainDalamPT: "",
        psLainLuarPT: "",
      },
      penelitian: "",
      pkm: "",
      tugasTambahan: "",
    },
  };

  return (
    <>
      <Head>
        <title>Edit Substandar 3 - Bagian A3</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 3</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar 3 Bagian 3- A
              </h6>
            </div>
            <div className="card-body">
              <Formik
                onSubmit={add}
                initialValues={
                  Object.keys(initial).length != 0 ? initial : temp
                }
                enableReinitialize={true}
              >
                <Form className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="namadosen">Nama Dosen</label>
                    <Field
                      name="namaDosen"
                      id="namadosen"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dtps">DTPS</label>
                    <Field
                      as="select"
                      name="dtps"
                      id="dtps"
                      className="form-control"
                      type="text"
                    >
                      <option value="true">YA</option>
                      <option value="false">TIDAK</option>
                    </Field>
                  </div>
                  <div
                    className="form-group"
                    style={{ marginBottom: "-5px", fontWeight: "bold" }}
                  >
                    <label htmlFor="">EWMP Pendidikan</label>
                  </div>
                  <div className="form-group row">
                    <div className="form-group col-md-6">
                      {" "}
                      <label htmlFor="psYangDiakreditasi">
                        PS Yang Diakreditasi
                      </label>
                      <Field
                        name="ewmp.pendidikan.psYangDiakreditasi"
                        id="psYangDiakreditasi"
                        className="form-control"
                        type="number"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      {" "}
                      <label htmlFor="psLainDalamPT">PS Lain Dalam PT</label>
                      <Field
                        name="ewmp.pendidikan.psLainDalamPT"
                        id="psLainDalamPT"
                        className="form-control"
                        type="number"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      {" "}
                      <label htmlFor="psLainLuarPT">PS Lain Luar PT</label>
                      <Field
                        name="ewmp.pendidikan.psLainLuarPT"
                        id="psLainLuarPT"
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold" }}
                        htmlFor="penelitian"
                      >
                        EWMP Penelitian
                      </label>
                      <Field
                        name="ewmp.penelitian"
                        id="penelitian"
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }} htmlFor="pkm">
                        EWMP PkM
                      </label>
                      <Field
                        name="ewmp.pkm"
                        id="pkm"
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold" }}
                        htmlFor="tugasTambahan"
                      >
                        EWMP Tugas Tambahan
                      </label>
                      <Field
                        name="ewmp.tugasTambahan"
                        id="tugasTambahan"
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="sumbit" className="btn btn-primary">
                      {" "}
                      <i className="fa fa-plus"></i> Tambah Data
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
