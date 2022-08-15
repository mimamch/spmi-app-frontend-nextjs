import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub8/bag8B1";
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
    namaKegiatan: "",
    waktuPerolehan: "",
    tingkat: "Internasional",
    prestasiDicapai: "",
  };

  return (
    <>
      <Head>
        <title>Add Substandar 4 - Bagian 1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 4</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar 4 Bagian 1
              </h6>
            </div>
            <div className="card-body">
              <Formik onSubmit={add} initialValues={initialValues}>
                <Form className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="namaKegiatan">Nama Kegiatan</label>
                    <Field
                      className="form-control"
                      id="namaKegiatan"
                      name="namaKegiatan"
                      required
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="waktuPerolehan">
                      Waktu Perolehan <small>(tahun)</small>
                    </label>

                    <Field
                      className="form-control"
                      id="waktuPerolehan"
                      name="waktuPerolehan"
                      type="number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tingkat">Tingkat</label>
                    <Field
                      as="select"
                      required
                      className="form-control"
                      id="tingkat"
                      name="tingkat"
                    >
                      <option value={"Internasional"}>Internasional</option>
                      <option value={"Nasional"}>Nasional</option>
                      <option value={"Lokal"}>Lokal</option>
                    </Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="prestasiDicapai">Prestasi Dicapai</label>
                    <Field
                      className="form-control"
                      id="prestasiDicapai"
                      name="prestasiDicapai"
                      required
                      type="text"
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-plus"></i> Tambah Data
                  </button>
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
