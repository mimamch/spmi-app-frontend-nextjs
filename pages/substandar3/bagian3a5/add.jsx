import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub3/bagA5";
  const add = async (val) => {
    try {
      // return console.log(val);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`,
        {
          ...val,
        }
      );
      router.push(backPath);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Upsss!",
        text: error.message,
      });
    }
  };

  const initialValues = {
    namaDosen: "",
    pendidikanTertinggi: "",
    bidangKeahlian: "",
    nidk: "",
    mataKuliahYangDiAmpu: "",
    bobotKredit: "",
  };

  return (
    <>
      <Head>
        <title>Add Substandar 3 - Bagian 3 A 5</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 3</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar 3 Bagian 3 A 5
              </h6>
            </div>
            <div className="card-body">
              <FormikTemplate
                apiEndPoint={apiEndPoint}
                initialValues={initialValues}
                field={[
                  { title: "Nama Dosen", name: "namaDosen", type: "text" },
                  {
                    title: "Pendidikan Tertinggi",
                    name: "pendidikanTertinggi",
                    type: "text",
                  },
                  {
                    title: "Bidang Keahlian",
                    name: "bidangKeahlian",
                    type: "text",
                  },
                  { title: "NIDK", name: "nidk", type: "text" },
                  {
                    title: "Mata Kuliah Yang Diampu",
                    name: "mataKuliahYangDiAmpu",
                    type: "text",
                  },
                  { title: "Bobot Kredit", name: "bobotKredit", type: "text" },
                ]}
              />
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
