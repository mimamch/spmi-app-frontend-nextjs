import axios from "axios";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Wrapper from "../../layouts/wrapper";

export default function Profile() {
  const router = useRouter();
  let [initialValuesState, setInitialValues] = useState({});
  let initialValues = {
    fullName: "",
    jenisProgram: "",
    predikatAkreditasiPs: "",
    nomorSK: "",
    waktuKadaluarsa: "",
    namaUnitPengelola: "",
    namaPerguruanTinggi: "",
    alamat: {
      jalan: "",
      kodepos: "",
      kota: "",
      negara: "",
    },
    noHp: "",
    email: "",
    website: "",
    ts: "",
    namaPengusul: "",
    waktuPengusulan: "",
    password: "",
    username: "",
  };

  const getProfile = async () => {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-profile`
      );
      if (user.data.data.waktuKadaluarsa) {
        user.data.data.waktuKadaluarsa =
          user.data.data.waktuKadaluarsa.split("T")[0];
      }
      if (user.data.data.waktuPengusulan) {
        user.data.data.waktuPengusulan =
          user.data.data.waktuPengusulan.split("T")[0];
      }

      setInitialValues({ ...initialValues, ...user.data.data });
    } catch (error) {
      toast.error(error.message);
      router.push("/");
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const submit = async (val) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/edit-profile`,
        val
      );
      toast.success("Berhasil Mengubah Profil");
    } catch (error) {
      toast.error(error.messsage);
    }
  };
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Profil</h1>
          </div>
          <Formik
            initialValues={
              Object.keys(initialValuesState).length != 0
                ? initialValuesState
                : initialValues
            }
            enableReinitialize="true"
            onSubmit={submit}
          >
            <Form>
              <div className="col">
                <div className="row">
                  <div className="form-group col-md-3">
                    <label htmlFor="nama">Nama</label>
                    <Field id="nama" name="fullName" className="form-control" />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="username">Username</label>
                    <Field
                      id="username"
                      name="username"
                      className="form-control"
                      type="text"
                      placeholder=""
                      disabled
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="password">Password</label>
                    <Field
                      id="password"
                      name="password"
                      className="form-control"
                      type="text"
                      placeholder="Kosongkan Apabila Tidak Ingin Diubah"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="jenisProgram">Jenis Program</label>
                <Field
                  id="jenisProgram"
                  name="jenisProgram"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="predikatAkreditasiPs">
                  Predikat Akreditasi
                </label>
                <Field
                  id="predikatAkreditasiPs"
                  name="predikatAkreditasiPs"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="nomorSK">Nomor SK BAN-PT</label>
                <Field id="nomorSK" name="nomorSK" className="form-control" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="kadaluarsa">Tanggal Kadaluarsa</label>
                <Field
                  type="date"
                  id="kadaluarsa"
                  name="waktuKadaluarsa"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="namaUnitPengelola">Nama Unit Pengelola</label>
                <Field
                  id="namaUnitPengelola"
                  name="namaUnitPengelola"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="namaPerguruanTinggi">
                  Nama Perguruan Tinggi
                </label>
                <Field
                  id="namaPerguruanTinggi"
                  name="namaPerguruanTinggi"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="alamat.street">Alamat</label>
                <div className="row">
                  <div className="col my-2">
                    <Field
                      type="street"
                      id="alamat.street"
                      name="alamat.jalan"
                      className="form-control"
                      placeholder="Detail Jalan & No. Gedung..."
                    />
                  </div>
                  <div className="col-3 my-2">
                    <Field
                      type="zip"
                      id="alamat.kodepos"
                      name="alamat.kodepos"
                      className="form-control"
                      placeholder="Kode Pos"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6  my-2">
                    <Field
                      type="city"
                      id="alamat.kota"
                      name="alamat.kota"
                      className="form-control"
                      placeholder="Kota / Kabupaten"
                    />
                  </div>
                  <div className="col-md-6  my-2">
                    <Field
                      type="state"
                      id="alamat.negara"
                      name="alamat.negara"
                      className="form-control"
                      placeholder="Negara"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="noHp">Nomor Telepon</label>
                <Field
                  type="tel"
                  id="noHp"
                  name="noHp"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="website">Website</label>
                <Field
                  type="website"
                  id="website"
                  name="website"
                  className="form-control"
                />
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="form-group col-md-2">
                    <label htmlFor="ts">TS</label>
                    <Field
                      type="text"
                      id="ts"
                      name="ts"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="namaPengusul">Nama Pengusul</label>
                    <Field
                      type="text"
                      id="namaPengusul"
                      name="namaPengusul"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="waktuPengusulan">Tanggal Pengusulan</label>
                    <Field
                      type="date"
                      id="waktuPengusulan"
                      name="waktuPengusulan"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <button className="btn btn-primary" type="submit">
                  Ubah Data
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Wrapper>
    </>
  );
}
