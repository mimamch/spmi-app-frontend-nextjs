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
        <title>Substandar3 - Bagian 3-A-1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 3.a.1 Dosen Tetap Perguruan Tinggi
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Table 3-A-1</h6>
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
                        Nama Dosen
                      </th>
                      <th rowSpan="2" className="text-center">
                        NIDN/NIDK
                      </th>
                      <th colSpan="2" className="text-center">
                        Pendidikan Pascasarjana
                      </th>
                      <th rowSpan="2" className="text-center">
                        Bidang Keahlian
                      </th>
                      <th rowSpan="2" className="text-center">
                        Kesesuaian dengan Kompetensi Inti PS
                      </th>
                      <th rowSpan="2" className="text-center">
                        Jabatan Akademik
                      </th>
                      <th rowSpan="2" className="text-center">
                        Sertifikat Pendidik Profesional
                      </th>
                      <th rowSpan="2" className="text-center">
                        Sertifikat Kompetensi/ Profesi/ Industri
                      </th>
                      <th rowSpan="2" className="text-center">
                        Mata Kuliah yang Diampu pada PS yang Diakreditasi
                      </th>
                      <th rowSpan="2" className="text-center">
                        Kesesuaian Bidang Keahlian dengan Mata Kuliah yang
                        Diampu
                      </th>
                      <th rowSpan="2" className="text-center">
                        Mata Kuliah yang Diampu pada PS Lain
                      </th>
                      <th rowSpan="2" className="text-center">
                        Aksi
                      </th>

                    </tr>
                    <tr>
                      <th className="text-center">
                        Magister/ Magister Terapan/ Spesialis
                      </th>
                      <th className="text-center">
                        Doktor/ Doktor Terapan/ Spesialis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Regional Director</td>
                      <td>$183,000</td>
                      <td>Shad Decker</td>
                      <td>Regional Director</td>
                      <td>$183,000</td>
                      <td>Edinburgh</td>
                      <td>6373</td>
                      <td>s.decker@datatables.net</td>
                      <td>6373</td>
                      <td>6373</td>
                      <td>s.decker@datatables.net</td>
                      <td>6373</td>
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
                    <tr>
                      <td>1</td>
                      <td>Regional Director</td>
                      <td>$183,000</td>
                      <td>Shad Decker</td>
                      <td>Regional Director</td>
                      <td>$183,000</td>
                      <td>Edinburgh</td>
                      <td>6373</td>
                      <td>6373</td>
                      <td>s.decker@datatables.net</td>
                      <td>6373</td>
                      <td>s.decker@datatables.net</td>
                      <td>6373</td>
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
