import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { setChartData } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const dispatch = useDispatch();
  // REF TABLE
  const tableRef = useRef(null);
  // REF TABLE
  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA3`
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
      let ewmp = {
        pendidikan: 0,
        penelitian: 0,
        pkm: 0,
        tugasTambahan: 0,
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

        ewmp.pendidikan +=
          e.ewmp.pendidikan.psYangDiakreditasi +
          e.ewmp.pendidikan.psLainDalamPT +
          e.ewmp.pendidikan.psLainLuarPT;
        ewmp.penelitian += e.ewmp.penelitian;
        ewmp.pkm += e.ewmp.pkm;
        ewmp.tugasTambahan += e.ewmp.tugasTambahan;
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
            title: "Ekuivalen Waktu Mengajar Penuh (EWMP)",
            labels: ["Pendidikan", "Penelitian", "PKM", "Tugas Tambahan"],
            datasets: [
              {
                label: "Jumlah",
                data: Object.values(ewmp),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA3/${id}`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA3/${id}`,
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
        <title>Substandar 3 - Bagian 3-A-3</title>
      </Head>

      <TemplateTabel
        data={data}
        titleHeader={`Tabel 3.a.3 Ekuivalen Waktu Mengajar Penuh (EWMP) Dosen Tetap
      Perguruan Tinggi`}
        titleTable={`Tabel 3.a.3 `}
        apiEndPoint={`sub3/bagA3`}
        // KIRIM REF
        tableRef={tableRef}
        // KIRIM REF
      >
        <table
          id="dataTable"
          ref={tableRef}
          className="display table table-bordered"
        >
          <thead>
            <tr>
              <th rowSpan="3" className="text-center">
                No.
              </th>
              <th rowSpan="3" className="text-center">
                Nama Dosen
              </th>
              <th rowSpan="3" className="text-center">
                DTPS
              </th>
              <th colSpan="6" className="text-center">
                Ekuivalen Waktu Mengajar Penuh (EWMP)
              </th>
              <th rowSpan="3" className="text-center">
                Jumlah (SKS)
              </th>
              <th rowSpan="3" className="text-center">
                Rata-rata per Semester (SKS)
              </th>
              {user.role == "admin" && <th rowSpan={3}>User</th>}
              <th rowSpan="3" className="text-center">
                Komentar
              </th>
              <th rowSpan="3" className="text-center">
                Aksi
              </th>
            </tr>
            <tr>
              <th colSpan="3" className="text-center">
                Pendidikan: Pembelajaran dan Pembimbingan
              </th>
              <th rowSpan="2" className="text-center">
                Penelitian
              </th>
              <th rowSpan="2" className="text-center">
                PkM
              </th>
              <th rowSpan="2" className="text-center">
                Tugas Tambahan dan Penunjang
              </th>
            </tr>
            <tr>
              <th className="text-center">PS yang Diakreditasi</th>
              <th className="text-center">PS lain di dalam PT</th>
              <th className="text-center">PS lain di luar PT</th>
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
                <td>{e.dtps && "Y"}</td>
                <td>{e.ewmp.pendidikan.psYangDiakreditasi}</td>
                <td>{e.ewmp.pendidikan.psLainDalamPT}</td>
                <td>{e.ewmp.pendidikan.psLainLuarPT}</td>
                <td>{e.ewmp.penelitian}</td>
                <td>{e.ewmp.pkm}</td>
                <td>{e.ewmp.tugasTambahan}</td>
                <td>{e.jumlahSks}</td>
                <td>
                  {e.rataRataSks && Math.round(e.rataRataSks * 100) / 100}
                </td>

                {user.role == "admin" && <td>{e.user.fullName}</td>}

                <td>{e.komentar}</td>

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
                        <a className="btn btn-success btn-sm " type="button">
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
      </TemplateTabel>
    </>
  );
}
