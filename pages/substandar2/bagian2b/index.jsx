import Script from "next/script";
import React, { useEffect, useRef,  useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { setChartData, setShowChart } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();
  // REF TABLE
  const tableRef = useRef(null);
  // REF TABLE
  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2`
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
      let jumlahMahasiswaAktif = {
        TS2: 0,
        TS1: 0,
        TS: 0,
      };
      let jumlahMahasiswaAsingPenuhWaktu = {
        TS2: 0,
        TS1: 0,
        TS: 0,
      };
      let jumlahMahasiswaAsingParuhWaktu = {
        TS2: 0,
        TS1: 0,
        TS: 0,
      };
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
        jumlahMahasiswaAktif.TS2 += e.jumlahMahasiswaAktif.TS2;
        jumlahMahasiswaAktif.TS1 += e.jumlahMahasiswaAktif.TS1;
        jumlahMahasiswaAktif.TS += e.jumlahMahasiswaAktif.TS;

        jumlahMahasiswaAsingPenuhWaktu.TS2 +=
          e.jumlahMahasiswaAsingPenuhWaktu.TS2;
        jumlahMahasiswaAsingPenuhWaktu.TS1 +=
          e.jumlahMahasiswaAsingPenuhWaktu.TS1;
        jumlahMahasiswaAsingPenuhWaktu.TS +=
          e.jumlahMahasiswaAsingPenuhWaktu.TS;
        jumlahMahasiswaAsingParuhWaktu.TS2 +=
          e.jumlahMahasiswaAsingParuhWaktu.TS2;
        jumlahMahasiswaAsingParuhWaktu.TS1 +=
          e.jumlahMahasiswaAsingParuhWaktu.TS1;
        jumlahMahasiswaAsingParuhWaktu.TS +=
          e.jumlahMahasiswaAsingParuhWaktu.TS;
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
            type: "bar",
            title: "Jumlah Mahasiswa Aktif",
            labels: Object.keys(jumlahMahasiswaAktif),
            datasets: [
              {
                label: "Mahasiswa",
                data: Object.values(jumlahMahasiswaAktif),
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
            type: "bar",
            title: "Jumlah Mahasiswa Asing Penuh Waktu",
            labels: Object.keys(jumlahMahasiswaAsingPenuhWaktu),
            datasets: [
              {
                label: "Mahasiswa",
                data: Object.values(jumlahMahasiswaAsingPenuhWaktu),
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
            type: "bar",
            title: "Jumlah Mahasiswa Asing Paruh Waktu",
            labels: Object.keys(jumlahMahasiswaAsingParuhWaktu),
            datasets: [
              {
                label: "Mahasiswa",
                data: Object.values(jumlahMahasiswaAsingParuhWaktu),
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2/${id}`
        );
      } else {
        // UPDATE KOMENTAR
        let komentar = "";
        if (act == "decline") {
          const confirm = await Swal.fire({
            title: "Tambahkan Komentar",
            input: "textarea",
            confirmButtonText: "Tolak",
            cancelButtonText: "Batal",
            showCancelButton: true,
            confirmButtonColor: "red",
          });
          if (!confirm.isConfirmed) return;
          komentar = confirm.value;
        }
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag2/${id}`,
          {
            isAccepted: act == "accept" ? "accepted" : "declined",
            komentar: komentar ? komentar : null,
          }
        );
      }
      // END UPDATE KOMENTAR
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
            {/* TOMBOL DOWNLOAD EXCEL */}
            <DownloadTableExcel
                filename={pathname || "Table Export"}
                currentTableRef={tableRef.current}
              >
                <button className="btn btn-success">
                  <i className="fas fa-download"></i> Export Excel
                </button>
              </DownloadTableExcel>
              {/* TOMBOL DOWNLOAD EXCEL */}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                  ref={tableRef}
                >
                  <thead>
                    <tr>
                      <th rowSpan="2">No</th>
                      <th rowSpan="2">Program Studi</th>
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
                      <th rowSpan="2">Komentar</th>
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
                        {/* KOMENTAR */}
                        <td>{e.komentar}</td>
                        {/* KOMENTAR */}
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
                                  className="btn btn-warning btn-sm "
                                  type="button"
                                >
                                  <i className="fa fa-edit"></i> Edit
                                </a>
                              </Link>

                              <button
                                className="btn btn-dark btn-sm "
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
