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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${id}`,
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${_id}`
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
    tahunAkademik: "",
    dayaTampung: "",
    jumlahCalonMahasiswa: {
      pendaftar: "",
      lulusSeleksi: "",
    },
    jumlahMahasiswaBaru: {
      reguler: "",
      transfer: "",
    },
    jumlahMahasiswaAktif: {
      reguler: "",
      transfer: "",
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
                initialValues={{
                  namaDosen: "",
                  nidn: "",
                  pendidikanPascaSarjana: {
                    magister: "",
                    doktor: "",
                  },
                  bidangKeahlian: "",
                  keseuaian: "",
                  jabatanAkademik: "",
                  sertifikatPendidikProfessional: "",
                  sertifikatKompetensi: "",
                  mataKuliahYangDiAmpuPadaPsAkreditasi: "",
                  kesesuaianBidangKeahlian: "",
                  mataKuliahYangDiAmpuPadaPsLain: "",
                }}
                apiEndPoint={`sub3/bagA1`}
                field={[
                  {
                    title: "Nama Dosen",
                    type: "text",
                    name: "namaDosen",
                  },
                  {
                    title: "NIDN",
                    type: "text",
                    name: "nidn",
                  },
                  {
                    title: "Pendidikan Pasca Sarjana",
                    type: "text",
                    name: "pendidikanPascaSarjana",
                    child: [
                      {
                        title: "Magister",
                        type: "text",
                        name: "magister",
                      },
                      { title: "Doktor", type: "text", name: "doktor" },
                    ],
                  },
                  {
                    title: "Bidang Keahlian",
                    type: "text",
                    name: "bidangKeahlian",
                  },
                  {
                    title: "Kesesuaian dengan Kompetensi Inti PS",
                    type: "text",
                    name: "keseuaian",
                  },
                  {
                    title: "Jabatan Akademik",
                    type: "text",
                    name: "jabatanAkademik",
                  },
                  {
                    title: "Sertifikat Pendidik Professional",
                    type: "text",
                    name: "sertifikatPendidikProfessional",
                  },
                  {
                    title: "Sertifikat Kompetensi",
                    type: "text",
                    name: "sertifikatKompetensi",
                  },
                  {
                    title: "Mata Kuliah Yang DiAmpu Pada PS Yang diakreditasi",
                    type: "text",
                    name: "mataKuliahYangDiAmpuPadaPsAkreditasi",
                  },
                  {
                    title:
                      "Kesesuaian Bidang Keahlian dengan Mata Kuliah yang Diampu",
                    type: "text",
                    name: "kesesuaianBidangKeahlian",
                  },
                  {
                    title: "Mata Kuliah Yang Diampu Pada PS Lain",
                    type: "text",
                    name: "mataKuliahYangDiAmpuPadaPsLain",
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
