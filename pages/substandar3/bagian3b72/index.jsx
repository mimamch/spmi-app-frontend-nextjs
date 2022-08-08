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
        <title>Substandar3 - Bagian 3-B-7-2</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 3.b.7 Luaran Penelitian/PkM Lainnya oleh DTPS
            </h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Table 3-B-7-2
              </h6>
              <h6 className="m-0 font-weight-bold text-primary">
                Tabel 3.b.7 Bagian-2 HKI (Hak Cipta, Desain Produk Industri,
                dll.)
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
                      <th className="text-center">Nomor</th>
                      <th className="text-center">Luaran Penelitian dan PkM</th>
                      <th className="text-center">Tahun</th>
                      <th className="text-center">Keterangan</th>
                      <th className="text-center">Aksi</th>
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
