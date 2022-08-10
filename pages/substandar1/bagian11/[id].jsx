import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { useFormik } from "formik";
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag1/${id}`,
        {
          ...val,
        }
      );
      (<Cookies></Cookies>).set(
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag1/${_id}`
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
    lembagaMitra: "",
    tingkat: "",
    judulKegiatan: "",
    manfaat: "",
    waktuDanDurasi: "",
    buktiKerjasama: "",
    tahunBerakhir: 353,
  };

  const formik = useFormik({
    // initialValues: {
    //   lembagaMitra: initial.lembagaMitra,
    //   tingkat: initial.tingkat,
    //   judulKegiatan: initial.judulKegiatan,
    //   manfaat: initial.judulKegiatan,
    //   waktuDanDurasi: initial.waktuDanDurasi,
    //   buktiKerjasama: initial.buktiKerjasama,
    //   tahunBerakhir: initial.tahunBerakhir,
    // },
    enableReinitialize: true,
    // initialValues: {
    //   lembagaMitra: "",
    //   tingkat: "",
    //   judulKegiatan: "",
    //   manfaat: "",
    //   waktuDanDurasi: "",
    //   buktiKerjasama: "",
    //   tahunBerakhir: 353,
    // },
    initialValues: Object.keys(initial).length != 0 ? initial : temp,

    onSubmit: (values) => add(values),
  });
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
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="text1">Lembaga Mitra</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="text1"
                    name="lembagaMitra"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.lembagaMitra}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tingkat">Tingkat</label>
                  <select
                    required
                    className="form-control"
                    id="tingkat"
                    value={formik.values.tingkat}
                    name="tingkat"
                    onChange={formik.handleChange}
                  >
                    <option value={"Internasional"}>Internasional</option>
                    <option value={"Nasional"}>Nasional</option>
                    <option value={"Lokal"}>Lokal</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="text2">Judul Kegiatan Kerjasama</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="text2"
                    name="judulKegiatan"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.judulKegiatan}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text3">
                    Manfaat bagi PS yang Diakreditasi
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="text3"
                    name="manfaat"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.manfaat}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text4">Waktu dan Durasi</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="text4"
                    name="waktuDanDurasi"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.waktuDanDurasi}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text5">Bukti Kerjasama</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="text5"
                    placeholder=""
                    name="buktiKerjasama"
                    autoComplete="off"
                    value={formik.values.buktiKerjasama}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text6">Tahun Berakhirnya Kerjasama</label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="text6"
                    name="tahunBerakhir"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.tahunBerakhir}
                    onChange={formik.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-edit"></i> Ubah Data
                </button>
              </form>
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
