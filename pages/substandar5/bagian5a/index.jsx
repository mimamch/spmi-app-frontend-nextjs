import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";

export default function Bagian1() {
  return (
    <>
      <Head>
        <title>Substandar5 - Bagian 5-A</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Tabel 5.a Kurikulum, Capaian Pembelajaran, dan Rencana Pembelajaran</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Table 5-A</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="dataTable"
                  className="display table table-bordered"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th rowSpan="2" className="text-center">
                        Nomor
                      </th>
                      <th rowSpan="2" className="text-center">
                        Semester
                      </th>
                      <th rowSpan="2" className="text-center">
                        Kode Mata Kuliah
                      </th>
                      <th rowSpan="2" className="text-center">
                        Mata Kuliah Kompetensi
                      </th>
                      <th colSpan="3" className="text-center">
                       Bobot Kredit (SKS)
                      </th>
                      <th rowSpan="2" className="text-center">
                        Konversi Kredit Ke Jam
                      </th>
                      <th colSpan="4" className="text-center">
                        Capaian Pembelajaran
                      </th>
                      <th rowSpan="2" className="text-center">
                        Dokumen Rencana Pembelajaran
                      </th>
                      <th rowSpan="2" className="text-center">
                        Unit Penyelenggara
                      </th>
                      <th rowSpan="2" className="text-center">
                        Aksi
                      </th>
                    </tr>

                    <tr>
                      <th className="text-center">
                        Kuliah/Responsi/Tutorial
                      </th>
                      <th className="text-center">
                        Seminar
                      </th>
                      <th className="text-center">
                        Praktikum/Praktik/Praktik Lapangan
                      </th>
                      <th className="text-center">
                        Sikap 
                      </th>
                      <th className="text-center">
                        Pengetahuan
                      </th>
                      <th className="text-center">
                        Keterampilan Umum
                      </th>
                      <th className="text-center">
                        Keterampilan Khusus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>Jumlah</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td>Rp 3,907,994,850</td>
                      <td className="pl-1">
                        <ul className=" row list-inline m-0 ">
                          <li className="list-inline-item">
                            <button
                              className="btn btn-success btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </li>
                          <br />
                          <li className=" row list-inline-item pl-1">
                            <button
                              className="btn btn-danger btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
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
