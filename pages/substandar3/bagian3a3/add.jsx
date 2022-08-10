import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub3/bagA3";
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
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Upsss!",
        text: error.message,
      });
    }
  };

  const initialValues = {
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
        <title>Add Substandar 3 - Bagian 3 A</title>
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
                Form Substandar 3 Bagian 3-A
              </h6>
            </div>
            <div className="card-body">
              <Formik
                onSubmit={add}
                initialValues={initialValues}
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
