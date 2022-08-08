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
        <title>Substandar 3 - Bagian 3-A-2</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">w
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Tabel 3.a.2 Dosen Pembimbing Utama Tugas Akhir</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Table 3-A-2</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              <table id="dataTable" className="display table table-bordered" style={{width: '100%'}}>
        <thead>
            <tr>
                <th rowSpan="3" className="text-center">Nomor</th>
                <th rowSpan="3" className="text-center">Nama Dosen</th>
                <th colSpan="8" className="text-center">Jumlah Mahasiswa Yang Dibimbing</th>
                <th rowSpan="3" className="text-center">Rata-rata Jumlah Bimbingan di Semua Program/Semester</th>
                <th rowSpan="3" className="text-center">Aksi</th>
            </tr>
            <tr>
                <th colSpan="4" className="text-center">Pada PS yang Diakreditasi</th>
                <th colSpan="4" className="text-center">pada PS Lain pada Program yang sama di PT</th>
            </tr>

            <tr>
                <th className="text-center">TS2</th>
                <th className="text-center">TS1</th>
                <th className="text-center">TS</th>
                <th className="text-center">Rata-rata</th>
                <th className="text-center">TS2</th>
                <th className="text-center">TS1</th>
                <th className="text-center">TS</th>
                <th className="text-center">Rata-rata</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>$183,000</td>
                <td>Regional Director</td>
                <td>$183,000</td>
                <td>Edinburgh</td>
                <td>6373</td>
                <td>|tables.net</td>
                <td>6373</td>
                <td>s.decker@datatables.net</td>
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
                          <li className=" row list-inline-item pl-1" >
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
                <th colSpan="2">Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Office</th>
                <th style={{visibility: 'hidden'}}></th>
                <th style={{visibility: 'hidden'}}></th>
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
