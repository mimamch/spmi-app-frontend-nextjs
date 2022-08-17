import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SetFlashMessage from "../../../layouts/components/SetFlashMessage";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub5/bag5A";
  const add = async (val) => {
    try {
      // return console.log(val, apiEndPoint);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`,
        {
          ...val,
        }
      );

      SetFlashMessage({
        type: "success",
        text: "Berhasil Menambah Data",
      });

      router.push(backPath);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initialValues = {
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
              <style jsx>
                {`
                  .row {
                    margin: 0;
                    padding: 0;
                  }
                `}
              </style>
              <Formik
                initialValues={initialValues}
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
