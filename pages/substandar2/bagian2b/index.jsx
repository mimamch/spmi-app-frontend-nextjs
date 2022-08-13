import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";

export default function Bagian1() {
  const [data, setData] = useState([]);

  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();

  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2`
      );
      setData(data.data.data);
      $(document).ready(function () {
        $("#dataTable").DataTable();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const action = async (id, act) => {
    try {
      if (act == "delete") {
        const data = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2/${id}`,
          {
            isAccepted: act == "accept" ? "accepted" : "declined",
          }
        );
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Substandar2 - Bagian 2-B</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="h3 mb-0 text-gray-800">
                Tabel 2.b Mahasiswa Asing
              </h1>
              <small className="mb-0 text-gray-800">
                Diisi oleh pengusul dari Program Studi pada program
                Sarjana/Sarjana Terapan/Magister/Magister Terapan/Doktor/Doktor
                Terapan.
              </small>
            </div>
            {user.role == "prodi" && (
              <Link href={`${pathname}/add`}>
                <a className="btn btn-primary">
                  <i className="fa fa-plus"></i> Tambah Data
                </a>
              </Link>
            )}
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Table 2-B</h6>
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
                      <th rowSpan="2">No</th>
                      <th rowSpan="2">Tahun Akademik</th>
                      <th colSpan="3" className="text-center">
                        Jumlah Mahasiswa Aktif
                      </th>
                      <th colSpan="3" className="text-center">
                        Jumlah Mahasiswa Asing Penuh Waktu (Full-time)
                      </th>
                      <th colSpan="3" className="text-center">
                        Jumlah Mahasiswa Asing Paruh Waktu (Part-time)
                      </th>
                      {user.role == "admin" && <th rowSpan="2">User</th>}
                      <th rowSpan="2">Aksi</th>
                    </tr>
                    <tr>
                      <th>TS-2</th>
                      <th>TS-1</th>
                      <th>TS</th>
                      <th>TS-2</th>
                      <th>TS-1</th>
                      <th>TS</th>
                      <th>TS-2</th>
                      <th>TS-1</th>
                      <th>TS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i + 1}>
                        <td>{i + 1}.</td>
                        <td>{e.programStudi}</td>
                        <td>{e.jumlahMahasiswaAktif.TS2}</td>
                        <td>{e.jumlahMahasiswaAktif.TS1}</td>
                        <td>{e.jumlahMahasiswaAktif.TS}</td>
                        <td>{e.jumlahMahasiswaAsingPenuhWaktu.TS2}</td>
                        <td>{e.jumlahMahasiswaAsingPenuhWaktu.TS1}</td>
                        <td>{e.jumlahMahasiswaAsingPenuhWaktu.TS}</td>
                        <td>{e.jumlahMahasiswaAsingParuhWaktu.TS2}</td>
                        <td>{e.jumlahMahasiswaAsingParuhWaktu.TS1}</td>
                        <td>{e.jumlahMahasiswaAsingParuhWaktu.TS}</td>

                        {user.role == "admin" && <td>{e.user.fullName}</td>}
                        <td>
                          {user.role == "admin" && !e.isAccepted && (
                            <div>
                              {" "}
                              <button
                                className="btn btn-success btn-sm "
                                type="button"
                                onClick={() => action(e._id, "accept")}
                              >
                                <i className="fas fa-check"></i> Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm "
                                type="button"
                                onClick={() => action(e._id, "decline")}
                              >
                                <i className="fas fa-times"></i> Decline
                              </button>
                            </div>
                          )}
                          {user.role == "admin" && e.isAccepted && (
                            <div>
                              {" "}
                              <button
                                className={`btn btn-${
                                  e.isAccepted == "declined"
                                    ? "danger"
                                    : "success"
                                } btn-sm disabled`}
                                type="button"
                                disabled
                              >
                                <i
                                  className={`fas fa-${
                                    e.isAccepted == "accepted"
                                      ? "check"
                                      : "times"
                                  }`}
                                ></i>{" "}
                                {e.isAccepted == "declined"
                                  ? "Declined"
                                  : e.isAccepted == "accepted" && "Accepted"}
                              </button>
                            </div>
                          )}
                          {user.role == "prodi" && (
                            <div>
                              <Link href={`${pathname}/${e._id}`}>
                                <a
                                  className="btn btn-success btn-sm "
                                  type="button"
                                >
                                  <i className="fa fa-edit"></i> Edit
                                </a>
                              </Link>

                              <button
                                className="btn btn-danger btn-sm "
                                type="button"
                                onClick={() => action(e._id, "delete")}
                              >
                                <i className="fa fa-trash"></i> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
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
