import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";

export default function Add() {
  return (
    <>
      <Head>
        <title>Add Substandar 3 - Bagian 1A</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 2</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar2 Bagian 2-B MAHASISWA ASING
              </h6>
            </div>
            <div className="card-body">
              <FormikTemplate
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
    </>
  );
}
