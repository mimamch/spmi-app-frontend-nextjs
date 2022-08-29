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
  const apiEndPoint = `sub3/bagA2`;
  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`,
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

  const getData = async (id) => {
    try {
      if (!id) return;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`
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
    jumlahMahasiswaYangDibimbing: {
      PsAkreditasi: {
        TS2: "",
        TS1: "",
        TS: "",
        // avg: {type: Number, default: 0},
      },
      PsLain: {
        TS2: "",
        TS1: "",
        TS: "",
        // avg: {type: Number, default: 0},
      },
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
              <EditFormTemplate
                initialValues={temp}
                apiEndPoint={apiEndPoint}
                field={[
                  {
                    title: "Nama Dosen",
                    type: "text",
                    name: "namaDosen",
                  },

                  {
                    title: "Jumlah Mahasiswa Yang Dibimbing",
                    type: "text",
                    name: "jumlahMahasiswaYangDibimbing",
                    child: [
                      {
                        title: "- PS yang Diakreditasi",
                        type: "text",
                        name: "PsAkreditasi",
                        child: [
                          {
                            title: "TS-2",
                            type: "number",
                            name: "TS2",
                          },
                          {
                            title: "TS-1",
                            type: "number",
                            name: "TS1",
                          },
                          {
                            title: "TS",
                            type: "number",
                            name: "TS",
                          },
                        ],
                      },
                      {
                        title: "- PS Lain",
                        type: "text",
                        name: "PsLain",
                        child: [
                          {
                            title: "TS-2",
                            type: "number",
                            name: "TS2",
                          },
                          {
                            title: "TS-1",
                            type: "number",
                            name: "TS1",
                          },
                          {
                            title: "TS",
                            type: "number",
                            name: "TS",
                          },
                        ],
                      },
                    ],
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
