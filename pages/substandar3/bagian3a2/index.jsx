import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { setChartData } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";

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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2`
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

      let pengirim = {};
      let jumlahMahasiswaYangDibimbing = {
        PsAkreditasi: {
          TS2: 0,
          TS1: 0,
          TS: 0,
        },
        PsLain: {
          TS2: 0,
          TS1: 0,
          TS: 0,
        },
      };
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

        jumlahMahasiswaYangDibimbing.PsAkreditasi.TS2 +=
          e.jumlahMahasiswaYangDibimbing.PsAkreditasi.TS2;
        jumlahMahasiswaYangDibimbing.PsAkreditasi.TS1 +=
          e.jumlahMahasiswaYangDibimbing.PsAkreditasi.TS1;
        jumlahMahasiswaYangDibimbing.PsAkreditasi.TS +=
          e.jumlahMahasiswaYangDibimbing.PsAkreditasi.TS;

        jumlahMahasiswaYangDibimbing.PsLain.TS2 +=
          e.jumlahMahasiswaYangDibimbing.PsLain.TS2;
        jumlahMahasiswaYangDibimbing.PsLain.TS1 +=
          e.jumlahMahasiswaYangDibimbing.PsLain.TS1;
        jumlahMahasiswaYangDibimbing.PsLain.TS +=
          e.jumlahMahasiswaYangDibimbing.PsLain.TS;
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
            title: "Jumlah mahasiswa Yang Dibimbing Pada PS Lain",
            labels: Object.keys(jumlahMahasiswaYangDibimbing.PsLain),
            datasets: [
              {
                label: "Mahasiswa",
                data: Object.values(jumlahMahasiswaYangDibimbing.PsLain),
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
            title: "Jumlah mahasiswa Yang Dibimbing Pada PS Yang Diakreditasi",
            labels: Object.keys(jumlahMahasiswaYangDibimbing.PsAkreditasi),
            datasets: [
              {
                label: "Mahasiswa",
                data: Object.values(jumlahMahasiswaYangDibimbing.PsAkreditasi),
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`,
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
        <title>Substandar 3 - Bagian 3-A-2</title>
      </Head>
      <TemplateTabel
        data={data}
        titleHeader={`Substandar 3 - Bagian 3-A-2`}
        titleTable={`Substandar 3 - Bagian 3-A-2`}
        apiEndPoint={`sub3/bagA2`}
        // KIRIM REF
        tableRef={tableRef}
        // KIRIM REF
      >
        <table id="dataTable" className="display table table-bordered">
          <thead>
            <tr>
              <th rowSpan="3" className="text-center">
                No.
              </th>
              <th rowSpan="3" className="text-center">
                Nama Dosen
              </th>
              <th colSpan="8" className="text-center">
                Jumlah Mahasiswa Yang Dibimbing
              </th>
              <th rowSpan="3" className="text-center">
                Rata-rata Jumlah Bimbingan di Semua Program/Semester
              </th>
              <th rowSpan="3" className="text-center">
                Komentar
              </th>
              <th rowSpan="3" className="text-center">
                Aksi
              </th>
              {user.role == "admin" && <th rowSpan={3}>User</th>}
            </tr>
            <tr>
              <th colSpan="4" className="text-center">
                Pada PS yang Diakreditasi
              </th>
              <th colSpan="4" className="text-center">
                Pada PS Lain pada Program yang sama di PT
              </th>
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
                <td>{e.namaDosen}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsAkreditasi?.TS2}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsAkreditasi?.TS1}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsAkreditasi?.TS}</td>
                <td>{Math.round(e.avgPsAkreditasi * 100) / 100}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsLain?.TS2}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsLain?.TS1}</td>
                <td>{e.jumlahMahasiswaYangDibimbing.PsLain?.TS}</td>
                <td>{Math.round(e.avgPsLain * 100) / 100}</td>
                <td>{Math.round(e.avgJumlah * 100) / 100}</td>
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
                          e.isAccepted == "declined" ? "danger" : "success"
                        } btn-sm disabled`}
                        type="button"
                        disabled
                      >
                        <i
                          className={`fas fa-${
                            e.isAccepted == "accepted" ? "check" : "times"
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
        </table>
      </TemplateTabel>
    </>
  );
}
