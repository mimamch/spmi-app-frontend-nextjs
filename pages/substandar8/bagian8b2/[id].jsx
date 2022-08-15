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
  const [initial, setInitial] = useState({});

  const apiEndPoint = `sub8/bag8B2`;

  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`,
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

  const getData = async (_id) => {
    try {
      if (!_id) return;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${_id}`
      );
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

  const temp = {
    namaKegiatan: "",
    waktuPerolehan: "",
    tingkat: "Internasional",
    prestasiDicapai: "",
  };

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Edit</h6>
            </div>
            <div className="card-body">
              <Formik
                onSubmit={add}
                enableReinitialize={true}
                initialValues={
                  Object.keys(initial).length != 0 ? initial : temp
                }
              >
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
        </div>
      </Wrapper>
    </>
  );
}
