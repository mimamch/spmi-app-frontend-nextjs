import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import Head from "next/head";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

export default function Bagian3() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const add = async (val) => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag3`,
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

  const formik = useFormik({
    initialValues: {
      lembagaMitra: "",
      tingkat: "Internasional",
      judulKegiatan: "",
      manfaat: "",
      waktuDanDurasi: "",
      buktiKerjasama: "",
      tahunBerakhir: "",
    },
    onSubmit: (values) => add(values),
  });
  return (
    <>
      <Head>
        <title>Add Substandar 1 - Bagian 3</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Add Substandar 1 - Bagian-3 Kerjasama Pengabdian kepada Masyarakat
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Bagian-3 Kerjasama Pengabdian kepada Masyarakat
              </h6>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="text1">Lembaga Mitra</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text1"
                    name="lembagaMitra"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.lembagaMitra}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tingkat">Tingkat</label>
                  <select
                    className="form-control"
                    id="tingkat"
                    value={formik.values.tingkat}
                    name="tingkat"
                    onChange={formik.handleChange}
                    required
                  >
                    <option value={"Internasional"}>Internasional</option>
                    <option value={"Nasional"}>Nasional</option>
                    <option value={"Lokal"}>Lokal</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="text2">Judul Kegiatan Kerjasama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text2"
                    name="judulKegiatan"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.judulKegiatan}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text3">
                    Manfaat bagi PS yang Diakreditasi
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text3"
                    name="manfaat"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.manfaat}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text4">Waktu dan Durasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text4"
                    name="waktuDanDurasi"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.waktuDanDurasi}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text5">Bukti Kerjasama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text5"
                    placeholder=""
                    name="buktiKerjasama"
                    autoComplete="off"
                    value={formik.values.buktiKerjasama}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text6">Tahun Berakhirnya Kerjasama</label>
                  <input
                    type="number"
                    className="form-control"
                    id="text6"
                    name="tahunBerakhir"
                    placeholder=""
                    autoComplete="off"
                    value={formik.values.tahunBerakhir}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-plus"></i> Tambah Data
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
