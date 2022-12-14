import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setChartData, setShowChart } from "../../../store/ChartModalSlice";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../lib/shared_variables";
export default function Bagian3() {
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag3`
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
      let tingkat = {
        Internasional: 0,
        Nasional: 0,
        Lokal: 0,
      };
      let pengirim = {};
      data.data.data.map((e) => {
        e.isAccepted && e.isAccepted == "accepted"
          ? statusVerifikasi.accepted++
          : e.isAccepted == "declined"
          ? statusVerifikasi.declined++
          : statusVerifikasi.unverif++;
        tingkat[e.tingkat]++;
        if (e.user) {
          pengirim[e.user.fullName]
            ? pengirim[e.user.fullName]++
            : (pengirim[e.user.fullName] = 1);
        }
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
            title: "Tingkat",
            labels: Object.keys(tingkat),
            datasets: [
              {
                label: "Tingkat",
                data: Object.values(tingkat),
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag3/${id}`
        );
      } else {
        // UPDATE KOMENTAR
        let komentar = "";
        if (act == "decline") {
          const confirm = await Swal.fire({
            title: `Tambahkan Komentar 
            <h4 class='text-danger'>Peringatan! Aksi tidak dapat diubah!</h4>`,
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag3/${id}`,
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
        <title>Substandar1 - Bagian-3 </title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Bagian-3 Kerjasama Pengabdian kepada Masyarakat
            </h1>
            {user.role == "prodi" && (
              <Link href={`${pathname}/add`}>
                <a className="btn btn-primary">
                  <i className="fa fa-plus"></i> Tambah Data
                </a>
              </Link>
            )}
          </div>
          {user.role == "prodi" && (
            <div className="card mb-2" style={{ width: "35rem" }}>
              <div className="card-body">
                <h5 className="card-title">Keterangan Warna : </h5>
                <ul className="list-group card-text ">
                  <li className="list-group-item bg-success text-white">
                    Hijau Pada Kolom Nomor Artinya Terverifikasi
                  </li>
                  <li className="list-group-item bg-danger text-white">
                    Merah Pada Kolom Nomor Artinya Verifikasi Ditolak
                  </li>
                  <li className="list-group-item">
                    Putih Artinya Belum Diverifikasi
                  </li>
                </ul>
              </div>
            </div>
          )}
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
              <DownloadTableExcel
                filename={pathname || "Table Export"}
                currentTableRef={tableRef.current}
              >
                <button className="btn btn-success">
                  <i className="fas fa-download"></i> Export Excel
                </button>
              </DownloadTableExcel>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  ref={tableRef}
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead className="overflow-x-scrollable">
                    <tr>
                      <th>No.</th>
                      <th>Lembaga Mitra</th>
                      <th>Tingkat</th>
                      <th>Judul Kegiatan Kerjasama</th>
                      <th>Manfaat bagi PS yang Diakreditasi</th>
                      <th>Waktu dan Durasi</th>
                      <th>Bukti Kerjasama</th>
                      <th>Tahun Berakhirnya Kerjasama</th>
                      <th>File</th>
                      {user.role == "admin" && <th>User</th>}
                      <th>Komentar</th>
                      <th>Aksi</th>
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
                        <td>{e.lembagaMitra}</td>
                        <td>{e.tingkat}</td>
                        <td>{e.judulKegiatan}</td>
                        <td>{e.manfaat}</td>
                        <td>{e.waktuDanDurasi}</td>
                        <td>{e.buktiKerjasama}</td>
                        <td>{e.tahunBerakhir}</td>
                        <td>
                          {e.file && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                window.open(`${API_BASE_URL}/${e.file}`)
                              }
                            >
                              Download
                            </button>
                          )}
                        </td>
                        {user.role == "admin" && <td>{e?.user?.fullName}</td>}
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
