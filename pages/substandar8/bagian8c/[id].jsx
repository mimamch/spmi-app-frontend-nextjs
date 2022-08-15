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

  const apiEndPoint = `sub8/bag8C`;

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
        <title>Edit Substandar</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit Substandar</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Edit Substandar
              </h6>
            </div>
            <div className="card-body">
              <EditFormTemplate
                initialValues={temp}
                apiEndPoint={`${apiEndPoint}`}
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
        </div>
      </Wrapper>
    </>
  );
}