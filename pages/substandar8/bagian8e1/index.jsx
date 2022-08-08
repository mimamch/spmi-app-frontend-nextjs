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
        <title>Substandar8 - Bagian 8-E-1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 8.e.1 Tempat Kerja Lulusan
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Table 8-E-1</h6>
              <h6 className="m-0 font-weight-bold text-primary">
                Diisi oleh pengusul dari Program Studi pada program Diploma
                Tiga/Sarjana/Sarjana Terapan
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="dataTable"
                  className="display table table-bordered"
                  style={{ width: "100%", height: "100%" }}
                >
                  <thead>
                    <tr>
                      <th rowSpan="2" className="text-center">
                        Tahun Lulus
                      </th>
                      <th rowSpan="2" className="text-center">
                        Jumlah Lulusan
                      </th>
                      <th rowSpan="2" className="text-center">
                        Jumlah Lulusan yang Terlacak
                      </th>
                      <th colSpan="3" className="text-center">
                        Jumlah Lulusan Terlacak yang Bekerja Berdasarkan
                        Tingkat/Ukuran Tempat Kerja/Berwirausaha
                      </th>
                      <th rowSpan="2" className="text-center">
                        Aksi
                      </th>
                    </tr>

                    <tr>
                      <td>Lokal/ Wilayah/ Berwirausaha tidak Berbadan Hukum</td>
                      <td>Nasional/ Berwirausaha Berbadan Hukum</td>
                      <td>Multinasional/ Internasional</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td className="text-center">II</td>
                      <td colSpan="2" className="text-center">aa</td>
                      <td className="text-center"></td>
                      <td className="text-center"></td>
                    </tr> */}
                    <tr>
                      <td>1</td>
                      <td>Regional Director</td>
                      <td>Regional Director</td>
                      <td>Regional Director</td>
                      <td>2005</td>
                      <td>Shad Decker</td>
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
                  <tfoot>
                    <tr>
                      <th>Jumlah</th>
                      <th>Position</th>
                      <th>Salary</th>
                      <th>Office</th>
                      <th>werrrr</th>
                      <th>werrrr</th>
                      <th></th>
                    </tr>
                  </tfoot>
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
