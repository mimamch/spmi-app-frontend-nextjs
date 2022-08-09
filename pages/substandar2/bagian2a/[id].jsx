import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

export default function Bagian1() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("[")[0];
  const { id } = router.query;
  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${id}`,
        {
          ...val,
        }
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${_id}`
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
    tahunAkademik: "",
    dayaTampung: "",
    jumlahCalonMahasiswa: {
      pendaftar: "",
      lulusSeleksi: "",
    },
    jumlahMahasiswaBaru: {
      reguler: "",
      transfer: "",
    },
    jumlahMahasiswaAktif: {
      reguler: "",
      transfer: "",
    },
  };

  return (
    <>
      <Head>
        <title>Edit Substandar 1 - Bagian 1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Edit Substandar 1 - Bagian 1
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tabel 1 Bagian-1 Kerjasama Pendidikan
              </h6>
            </div>
            <div className="card-body">
              <Formik
                enableReinitialize={true}
                initialValues={
                  Object.keys(initial).length != 0 ? initial : temp
                }
                onSubmit={(values) => add(values)}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="text1">Tahun Akademik</label>
                    <Field
                      required
                      type="text"
                      className="form-control"
                      id="text1"
                      name="tahunAkademik"
                      placeholder=""
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dayaTampung">Daya Tampung</label>
                    <Field
                      required
                      type="number"
                      className="form-control"
                      id="dayaTampung"
                      name="dayaTampung"
                      placeholder=""
                      autoComplete="off"
                    />
                  </div>
                  <label className="col-4  text-center">
                    Jumlah Calon Mahasiswa
                  </label>
                  <div className="row">
                    <div className="form-group col-2">
                      <label htmlFor="Pendaftar">Pendaftar</label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="Pendaftar"
                        name="jumlahCalonMahasiswa.pendaftar"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group col-2">
                      <label htmlFor="Lulus" className="text-right  col">
                        Lulus Seleksi
                      </label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="Lulus"
                        name="jumlahCalonMahasiswa.lulusSeleksi"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <label className="col-4 text-center">
                    Jumlah Mahasiswa Baru
                  </label>
                  <div className="row">
                    <div className="form-group col-2">
                      <label htmlFor="Reguler">Reguler</label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="Reguler"
                        name="jumlahMahasiswaBaru.reguler"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group col-2">
                      <label htmlFor="transfer" className="text-right  col">
                        Transfer
                      </label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="transfer"
                        name="jumlahMahasiswaBaru.transfer"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <label className="col-4 text-center">
                    Jumlah Mahasiswa Aktif
                  </label>
                  <div className="row">
                    <div className="form-group col-2">
                      <label htmlFor="Reguler">Reguler</label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="Reguler"
                        name="jumlahMahasiswaAktif.reguler"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group col-2">
                      <label htmlFor="transfer" className="text-right  col">
                        Transfer
                      </label>
                      <Field
                        required
                        type="number"
                        className="form-control"
                        id="transfer"
                        name="jumlahMahasiswaAktif.transfer"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
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
