import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { setChartData } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const dispatch = useDispatch();
  const apiEndPoint = `sub8/bag8E2Ref`;
  // REF TABLE
  const tableRef = useRef(null);
  // REF TABLE
  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`
      );
      setData(data.data.data);
      $(document).ready(function () {
        $("#dataTable").DataTable({
          footerCallback: function (row, data, start, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
              return typeof i === "string"
                ? i.replace(/[\$,]/g, "") * 1
                : typeof i === "number"
                ? i
                : 0;
            };
            function getFooterSum(col) {
              let colData = api
                .column(col)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);
              $(api.column(col).footer()).html(colData);
            }
            getFooterSum(2);
            getFooterSum(3);
          },
          // destroy: true,
          retrieve: true,
        });
      });
      let statusVerifikasi = {
        accepted: 0,
        declined: 0,
        unverif: 0,
      };
      let pengirim = {};
      let rataRata = {};
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
        ])
      );
    } catch (error) {
      console.log(error);
      toast.error(`Error Getting Data :  ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const action = async (id, act) => {
    try {
      if (act == "delete") {
        const data = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`
        );
        toast.success(`Berhasil Melakukan Aksi`);
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`,
          {
            isAccepted: act == "accept" ? "accepted" : "declined",
            komentar: komentar ? komentar : null,
          }
        );
      }
      // END UPDATE KOMENTAR
      getData();
    } catch (error) {
      toast.error(`Gagal Melakukan Aksi Karena ${error.message}`);
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Substandar8 Bagian Ref 8-E-2</title>
      </Head>
      <TemplateTabel
        tableRef={tableRef}
        data={data}
        titleHeader={
          "Tabel Referensi untuk Tabel 8.e.2 Kepuasan Pengguna Lulusan"
        }
        titleTable={
          "Tabel Referensi untuk Tabel 8.e.2 Kepuasan Pengguna Lulusan"
        }
        titleSmall={
          "Diisi oleh pengusul dari Program Studi pada program Diploma Tiga/Sarjana/Sarjana Terapan."
        }
      >
        <table
          ref={tableRef}
          id="dataTable"
          className="display table table-bordered"
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Tahun Lulus</th>
              <th>Jumlah Lulusan</th>
              <th>Jumlah Tanggapan Kepuasan Pengguna yang Terlacak</th>
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
                    ((e.isAccepted == "accepted" && "bg-success text-light") ||
                      (e.isAccepted == "declined" && "bg-danger text-light"))
                  }`}
                >
                  {i + 1}.
                </td>
                <td>{e.tahunLulus}</td>
                <td>{e.jumlahLulusan}</td>
                <td>{e.jumlahKepuasanPenggunaYangTerlacak}</td>
                {user.role == "admin" && <td>{e?.user?.fullName}</td>}
                {/* KOMENTAR */}
                <td>{e.komentar}</td>
                {/* KOMENTAR */}
                <td>
                  {user.role == "admin" && !e.isAccepted && (
                    <div>
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
                      <button
                        className={`btn btn-${
                          e.isAccepted == "declined" ? "danger" : "success"
                        } btn-sm disabled`}
                        type="button"
                        disabled
                      >
                        <i
                          className={`fas fa-${
                            e.isAccepted == "accepted" ? "check" : "times"
                          }`}
                        ></i>
                        {e.isAccepted == "declined"
                          ? "Declined"
                          : e.isAccepted == "accepted" && "Accepted"}
                      </button>
                    </div>
                  )}
                  {user.role == "prodi" && (
                    <div>
                      <Link href={`${pathname}/${e._id}`}>
                        <a className="btn btn-warning btn-sm " type="button">
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
          <tfoot>
            <tr>
              <th></th>
              <th>Jumlah</th>
              <th></th>
              <th></th>
              <th></th>
              {user.role == "admin" && <th></th>}
              <th></th>
            </tr>
          </tfoot>
        </table>
      </TemplateTabel>
    </>
  );
}
