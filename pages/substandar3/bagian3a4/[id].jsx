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
  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA4/${id}`,
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

  const [initial, setInitial] = useState({});

  const getData = async (_id) => {
    try {
      if (!_id) return;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA4/${_id}`
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
    namaDosen: "",
    nidn: "",
    pendidikanPasca: "",
    bidangKeahlian: "",
    jabatanAkademik: "",
    sertifikatPendidikProfessional: "",
    sertifikatKompetensi: "",
    mataKuliahYangDiAmpuPadaPsAkreditasi: "",
    kesesuaianBidangKeahlian: "",
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
              <EditFormTemplate
                initialValues={temp}
                apiEndPoint={`sub3/bagA4`}
                field={[
                  { title: "Nama Dosen", name: "namaDosen", type: "text" },
                  { title: "NIDN", name: "nidn", type: "text" },
                  {
                    title: "Pendidikan Pasca Sarjana",
                    name: "pendidikanPasca",
                    type: "text",
                  },
                  {
                    title: "Bidang Keahlian",
                    name: "bidangKeahlian",
                    type: "text",
                  },
                  {
                    title: "Jabatan Akademik",
                    name: "jabatanAkademik",
                    type: "text",
                  },
                  {
                    title: "Sertifikat Pendidik Professional",
                    name: "sertifikatPendidikProfessional",
                    type: "text",
                  },
                  {
                    title: "Sertifikat Kompetensi",
                    name: "sertifikatKompetensi",
                    type: "text",
                  },
                  {
                    title: "Mata Kuliah Yang Diampu Pada Saat PS Akreditasi",
                    name: "mataKuliahYangDiAmpuPadaPsAkreditasi",
                    type: "text",
                  },
                  {
                    title: "Kesesuaian Bidang Keahlian",
                    name: "kesesuaianBidangKeahlian",
                    type: "text",
                  },
                ]}
              />
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
