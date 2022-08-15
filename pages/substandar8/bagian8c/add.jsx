import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub8/bag8C";
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
    tahunMasuk: "",
    jumlahMahasiswaDiterima: "",
    jumlahMahasiswaYangLulusPada: {
      TS6: "",
      TS5: "",
      TS4: "",
      TS3: "",
      TS2: "",
      TS1: "",
      TS: "",
    },
    jumlahLulusanAkhir: "",
    rataRataMasaStudi: "",
  };

  return (
    <>
      <Head>
        <title>Add </title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Add</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Form Add</h6>
            </div>
            <div className="card-body">
              <FormikTemplate
                apiEndPoint={apiEndPoint}
                initialValues={initialValues}
                field={[
                  {
                    title: "Tahun Masuk",
                    name: "tahunMasuk",
                    type: "text",
                  },
                  {
                    title: "Jumlah Mahasiswa Diterima",
                    name: "jumlahMahasiswaDiterima",
                    type: "number",
                  },
                  {
                    title: "Jumlah Mahasiswa Yang Lulus Pada",
                    name: "jumlahMahasiswaYangLulusPada",
                    type: "text",
                    child: [
                      {
                        title: "TS-6",
                        name: "TS6",
                        type: "number",
                      },
                      {
                        title: "TS-5",
                        name: "TS5",
                        type: "number",
                      },
                      {
                        title: "TS-4",
                        name: "TS4",
                        type: "number",
                      },
                      {
                        title: "TS-3",
                        name: "TS3",
                        type: "number",
                      },
                      {
                        title: "TS-2",
                        name: "TS2",
                        type: "number",
                      },
                      {
                        title: "TS-1",
                        name: "TS1",
                        type: "number",
                      },
                      {
                        title: "TS",
                        name: "TS",
                        type: "number",
                      },
                    ],
                  },
                  {
                    title: "Jumlah Lulusan Akhir",
                    name: "jumlahLulusanAkhir",
                    type: "number",
                  },
                  {
                    title: "Rata Rata Masa Studi",
                    name: "rataRataMasaStudi",
                    type: "number",
                  },
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
