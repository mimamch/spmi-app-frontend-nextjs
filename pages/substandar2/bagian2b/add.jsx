import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

export default function Bagian1() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const add = async (val) => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2`,
        {
          ...val,
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
      console.log(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Add Substandar 2 - Bagian 1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 2</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar2 Bagian 2-B MAHASISWA ASING
              </h6>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  programStudi: "",
                  jumlahMahasiswaAktif: {
                    TS2: "",
                    TS1: "",
                    TS: "",
                  },
                  jumlahMahasiswaAsingPenuhWaktu: {
                    TS2: "",
                    TS1: "",
                    TS: "",
                  },
                  jumlahMahasiswaAsingParuhWaktu: {
                    TS2: "",
                    TS1: "",
                    TS: "",
                  },
                }}
                onSubmit={(values) => add(values)}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="InputForm">Program Studi</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="InputForm"
                      placeholder=""
                      name="programStudi"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>Jumlah Mahasiswa Aktif</b>
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-2</label>
                      <Field
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="jumlahMahasiswaAktif.TS2"
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-1</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAktif.TS1"
                        placeholder=""
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS</label>
                      <Field
                        name="jumlahMahasiswaAktif.TS"
                        type="number"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>
                        Jumlah Mahasiswa Asing Penuh Waktu (<i>Full-Time</i>)
                      </b>
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-2</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAsingPenuhWaktu.TS2"
                        placeholder=""
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-1</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAsingPenuhWaktu.TS1"
                        placeholder=""
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAsingPenuhWaktu.TS"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>
                        Jumlah Mahasiswa Asing Paruh Waktu (<i>Part-Time</i>)
                      </b>
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-2</label>
                      <Field
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="jumlahMahasiswaAsingParuhWaktu.TS2"
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS-1</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAsingParuhWaktu.TS1"
                        placeholder=""
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="exampleFormControlSelect1">TS</label>
                      <Field
                        type="number"
                        className="form-control"
                        name="jumlahMahasiswaAsingParuhWaktu.TS"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <br />

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
      {/* <Script
        src="/assets/vendor/datatables/jquery.dataTables.min.js"
        strategy="beforeInteractive"
      />
      <Script   
        src="/assets/vendor/datatables/dataTables.bootstrap4.min.js"
        strategy="lazyOnload"
      /> */}
      {/* <Script   
        src="/assets/js/demo/datatables-demo.js"
        strategy="lazyOnload"
      /> */}
      {/* <UseScript url='/assets/vendor/datatables/jquery.dataTables.min.js' />
      <UseScript url='/assets/vendor/datatables/dataTables.bootstrap4.min.js' />
      <UseScript url='/assets/js/demo/datatables-demo.js' /> */}
    </>
  );
}
