import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { setChartData, setShowChart } from "../../../store/ChartModalSlice";

export default function Bagian2A() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();

  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1`
      );
      setData(data.data.data);
      $(document).ready(function () {
        $("#dataTable").DataTable();
      });
      let statusVerifikasi = {
        accepted: 0,
        declined: 0,
        unverif: 0,
      };
      let dayaTampung = {};
      let pengirim = {};
      data.data.data.map((e) => {
        e.isAccepted && e.isAccepted == "accepted"
          ? statusVerifikasi.accepted++
          : e.isAccepted == "declined"
          ? statusVerifikasi.declined++
          : statusVerifikasi.unverif++;
        if (e.user) {
          pengirim[e.user.fullName]
            ? pengirim[e.user.fullName]++
            : (pengirim[e.user.fullName] = 1);
        }

        dayaTampung[e.tahunAkademik]
          ? (dayaTampung[e.tahunAkademik] += e.dayaTampung)
          : (dayaTampung[e.tahunAkademik] = e.dayaTampung);
      });
      dispatch(
        setChartData([
          {
            type: "line",
            title: "Prodi",
            labels: Object.keys(pengirim),

            datasets: [
              {
                label: "Banyak Data Dari Prodi",
                data: Object.values(pengirim),

                backgroundColor: [
                  "rgba(242, 0, 255, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(255, 0, 0, 0.1)",
                ],
                borderColor: [
                  "rgba(242, 0, 255, 1)",
                  "rgba(255, 0, 0, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            type: "pie",
            title: "Status Verifikasi",
            labels: ["Disetujui", "Ditolak", "Belum Diverifikasi"],
            datasets: [
              {
                label: "# of Votes",
                data: [
                  statusVerifikasi.accepted,
                  statusVerifikasi.declined,
                  statusVerifikasi.unverif,
                ],
                backgroundColor: [
                  "rgba(242, 0, 255, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(255, 0, 0, 0.1)",
                ],
                borderColor: [
                  "rgba(242, 0, 255, 1)",
                  "rgba(255, 0, 0, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            type: "doughnut",
            title: "Daya Tampung",
            labels: Object.keys(dayaTampung),
            datasets: [
              {
                label: "Daya Tampung",
                data: Object.values(dayaTampung),
                backgroundColor: [
                  "rgba(242, 0, 255, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(255, 0, 0, 0.1)",
                ],
                borderColor: [
                  "rgba(242, 0, 255, 1)",
                  "rgba(255, 0, 0, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        ])
      );
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1/${id}`,
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
        <title>Substandar2 - Bagian 2-A</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 2.a Seleksi Mahasiswa Baru
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
            <div className="card-header py-3 justify-content-between row">
              <button
                onClick={() => dispatch(setShowChart())}
                className="btn btn-primary"
              >
                Tampilkan Grafik
              </button>
              <button
                className={`btn btn-${
                  data.length >= 8
                    ? "primary"
                    : (data.length >= 4 && "success") || "warning"
                }`}
              >{`Status : ${
                data.length >= 8
                  ? "Sangat Terpenuhi"
                  : (data.length >= 4 && "Terpenuhi") || "Belum Terpenuhi"
              }`}</button>
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
                      <th rowSpan="2" className="text-center">
                        Tahun Akademik
                      </th>
                      <th rowSpan="2" className="text-center">
                        Daya Tampung
                      </th>
                      <th colSpan="2" className="text-center">
                        Jumlah Calon Mahasiswa
                      </th>
                      <th colSpan="2" className="text-center">
                        Jumlah Mahasiswa Baru
                      </th>
                      <th colSpan="2" className="text-center">
                        Jumlah Mahasiswa Aktif
                      </th>
                      {user.role == "admin" && (
                        <th rowSpan="2" className="text-center">
                          User
                        </th>
                      )}

                      <th rowSpan="2" className="text-center">
                        Aksi
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center">Pendaftar</th>
                      <th className="text-center">Lulus Seleksi</th>
                      <th className="text-center">Reguler</th>
                      <th className="text-center">Transfer</th>
                      <th className="text-center">Reguler</th>
                      <th className="text-center">Transfer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i}>
                        <td
                          className={`${
                            user.role == "prodi" &&
                            ((e.isAccepted == "accepted" &&
                              "bg-success text-light") ||
                              (e.isAccepted == "declined" &&
                                "bg-danger text-light"))
                          }`}
                        >
                          {i + 1}.
                        </td>
                        <td>{e.tahunAkademik}</td>
                        <td>{e.dayaTampung}</td>
                        <td>{e.jumlahCalonMahasiswa.pendaftar}</td>
                        <td>{e.jumlahCalonMahasiswa.lulusSeleksi}</td>
                        <td>{e.jumlahMahasiswaBaru.reguler}</td>
                        <td>{e.jumlahMahasiswaBaru.transfer}</td>
                        <td>{e.jumlahMahasiswaAktif.reguler}</td>
                        <td>{e.jumlahMahasiswaAktif.transfer}</td>
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
