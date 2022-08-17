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

  const apiEndPoint = `sub5/bag5A`;

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
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const temp = {
    semester: "",
    kodeMataKuliah: "",
    namaMataKuliah: "",
    mataKuliahKompetensi: "N",
    bobot: {
      kuliah: "",
      seminar: "",
      praktikum: "",
    },
    konversiKreditKeJam: "",
    capaianPembelajaran: {
      sikap: "N",
      pengetahuan: "N",
      keterampilanUmum: "N",
      keterampilanKhusus: "N",
    },
    dokumenRencanaPembelajaran: "",
    unitPenyelenggara: "",
  };

  return (
    <>
      <Head>
        <title>Edit Substandar 3 - Bagian B 7 4</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Edit Substandar 3 - Bagian B 7 4
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Edit Substandar 3 - Bagian B 7 4
              </h6>
            </div>
            <div className="card-body">
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
                initialValues={
                  Object.keys(initial).length != 0 ? initial : temp
                }
                onSubmit={(values) => add(values)}
              >
                <Form className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <Field
                      id="semester"
                      className="form-control"
                      type="text"
                      name="semester"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kode">Kode Mata Kuliah</label>
                    <Field
                      id="kode"
                      className="form-control"
                      type="text"
                      name="kodeMataKuliah"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nama">Nama Mata Kuliah</label>
                    <Field
                      id="nama"
                      className="form-control"
                      type="text"
                      name="namaMataKuliah"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mataKuliahKompetensi">
                      Mata Kuliah Kompetensi
                    </label>
                    <Field
                      id="mataKuliahKompetensi"
                      className="form-control"
                      as="select"
                      name="mataKuliahKompetensi"
                    >
                      <option value="Y">YA</option>
                      <option value="N">TIDAK</option>
                    </Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Bobot</label>
                    <div className="form-group row justify-content-between mx-2">
                      <div className="form-group">
                        <label htmlFor="kuliah">Kuliah</label>
                        <Field
                          className="form-control"
                          type="number"
                          name="bobot.kuliah"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="kuliah">Seminar</label>
                        <Field
                          className="form-control"
                          type="number"
                          name="bobot.seminar"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="kuliah">Praktikum</label>
                        <Field
                          className="form-control"
                          type="number"
                          name="bobot.praktikum"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="konversi">Konversi Kredit Ke-Jam</label>
                    <Field
                      className="form-control"
                      type="number"
                      name="konversiKreditKeJam"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Capaian Pembelajaran</label>
                    <div className="form-group row justify-content-between mx-2">
                      <div className="form-group">
                        <label htmlFor="capaianPembelajaran.sikap">Sikap</label>
                        <Field
                          as="select"
                          className="form-control"
                          name="capaianPembelajaran.sikap"
                        >
                          <option value="Y">YA</option>
                          <option value="N">TIDAK</option>
                        </Field>
                      </div>
                      <div className="form-group">
                        <label htmlFor="capaianPembelajaran.pengetahuan">
                          Pengetahuan
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          name="capaianPembelajaran.pengetahuan"
                        >
                          <option value="Y">YA</option>
                          <option value="N">TIDAK</option>
                        </Field>
                      </div>
                      <div className="form-group">
                        <label htmlFor="capaianPembelajaran.keterampilanUmum">
                          Keterampilan Umum
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          name="capaianPembelajaran.keterampilanUmum"
                        >
                          <option value="Y">YA</option>
                          <option value="N">TIDAK</option>
                        </Field>
                      </div>
                      <div className="form-group">
                        <label htmlFor="capaianPembelajaran.keterampilanKhusus">
                          Keterampilan Khusus
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          name="capaianPembelajaran.keterampilanKhusus"
                        >
                          <option value="Y">YA</option>
                          <option value="N">TIDAK</option>
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="konversi">
                      Dokumen Rencana Pembelajaran
                    </label>
                    <Field
                      className="form-control"
                      type="text"
                      name="dokumenRencanaPembelajaran"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="konversi">Unit Penyelenggara</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="unitPenyelenggara"
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
