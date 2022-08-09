import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA1`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA1/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA1/${id}`,
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
        <title>Substandar3 - Bagian 3-A-1</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 3.a.1 Dosen Tetap Perguruan Tinggi
            </h1>
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
                      <th rowSpan="2">No.</th>
                      <th rowSpan="2">Nama Dosen</th>
                      <th rowSpan="2">NIDN/NIDK</th>
                      <th colSpan="2" className="text-center">
                        Pendidikan Pascasarjana
                      </th>
                      <th rowSpan="2">Bidang Keahlian</th>
                      <th rowSpan="2">Kesesuaian dengan Kompetensi Inti PS</th>
                      <th rowSpan="2">Jabatan Akademik</th>
                      <th rowSpan="2">Sertifikat Pendidik Profesional</th>
                      <th rowSpan="2">
                        Sertifikat Kompetensi/ Profesi/ Industri
                      </th>
                      <th rowSpan="2">
                        Mata Kuliah yang Diampu pada PS yang Diakreditasi
                      </th>
                      <th rowSpan="2">
                        Kesesuaian Bidang Keahlian dengan Mata Kuliah yang
                        Diampu
                      </th>
                      <th rowSpan="2">Mata Kuliah yang Diampu pada PS Lain</th>
                      {user.role == "admin" && <th rowSpan="2">User</th>}
                      <th rowSpan="2">Aksi</th>
                    </tr>
                    <tr>
                      <th>Magister/ Magister Terapan/ Spesialis</th>
                      <th>Doktor/ Doktor Terapan/ Spesialis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i}>
                        <td>{i + 1}.</td>
                        <td>{e.namaDosen}</td>
                        <td>{e.nidn}</td>
                        <td>{e.pendidikanPascaSarjana?.magister}</td>
                        <td>{e.pendidikanPascaSarjana?.doktor}</td>
                        <td>{e.bidangKeahlian}</td>
                        <td>{e.keseuaian}</td>
                        <td>{e.jabatanAkademik}</td>
                        <td>{e.sertifikatPendidikProfessional}</td>
                        <td>{e.sertifikatKompetensi}</td>
                        <td>{e.mataKuliahYangDiAmpuPadaPsAkreditasi}</td>
                        <td>{e.kesesuaianBidangKeahlian}</td>
                        <td>{e.mataKuliahYangDiAmpuPadaPsLain}</td>

                        {user.role == "admin" && <td>{e.user.fullName}</td>}
                        <td key={i}>
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
