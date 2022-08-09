import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";

export default function Add() {
  const initialValues = {
    namaDosen: "",
    jumlahMahasiswaYangDibimbing: {
      PsAkreditasi: {
        TS2: "",
        TS1: "",
        TS: "",
        avg: "",
      },
      PsLain: {
        TS2: "",
        TS1: "",
        TS: "",
        avg: "",
      },
    },
    rataRataJumlah: "",
  };
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
                initialValues={initialValues}
                apiEndPoint={`sub3/bagA2`}
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
    </>
  );
}
