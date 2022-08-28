import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import Link from "next/link";
import { setChartData } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const dispatch = useDispatch();
  const apiEndPoint = `sub5/bag5A`;
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
        $("#dataTable").DataTable();
      });
      let statusVerifikasi = {
        accepted: 0,
        declined: 0,
        unverif: 0,
      };
      let pengirim = {};
      let bobot = {
        kuliah: 0,
        seminar: 0,
        praktikum: 0,
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
        bobot.kuliah += e.bobot.kuliah;
        bobot.seminar += e.bobot.seminar;
        bobot.praktikum += e.bobot.praktikum;
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
                label: "#",
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
            title: "Bobot Kredit (SKS)",
            labels: Object.keys(bobot),
            datasets: [
              {
                label: "bobot",
                data: Object.values(bobot),
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`
        );
        toast.success(`Berhasil Melakukan Aksi`);
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
        <title>Substandar5 - Bagian 5-A</title>
      </Head>
      <TemplateTabel
        tableRef={tableRef}
        data={data}
        titleHeader={`Bagian 5 A`}
        titleTable={`Bagian 5 A`}
      >
        <table
          ref={tableRef}
          id="dataTable"
          className="display table table-bordered"
        >
          <thead>
            <tr>
              <th rowSpan="2">No.</th>
              <th rowSpan="2">Semester</th>
              <th rowSpan="2">Kode Mata Kuliah</th>
              <th rowSpan="2">Nama Mata Kuliah</th>
              <th rowSpan="2">Mata Kuliah Kompetensi</th>
              <th colSpan="3" className="text-center">
                Bobot Kredit (SKS)
              </th>
              <th rowSpan="2">Konversi Kredit Ke Jam</th>
              <th colSpan="4" className="text-center">
                Capaian Pembelajaran
              </th>
              <th rowSpan="2">Dokumen Rencana Pembelajaran</th>
              <th rowSpan="2">Unit Penyelenggara</th>
              {user.role == "admin" && <th rowSpan="2">User</th>}
              <th rowSpan="2">Komentar</th>
              <th rowSpan="2">Aksi</th>
            </tr>

            <tr>
              <th className="text-center">Kuliah/Responsi/Tutorial</th>
              <th className="text-center">Seminar</th>
              <th className="text-center">
                Praktikum/Praktik/Praktik Lapangan
              </th>
              <th className="text-center">Sikap</th>
              <th className="text-center">Pengetahuan</th>
              <th className="text-center">Keterampilan Umum</th>
              <th className="text-center">Keterampilan Khusus</th>
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
                <td>{e.semester}</td>
                <td>{e.kodeMataKuliah}</td>
                <td>{e.namaMataKuliah}</td>
                <td>{e.mataKuliahKompetensi}</td>
                <td>{e.bobot.kuliah}</td>
                <td>{e.bobot.seminar}</td>
                <td>{e.bobot.praktikum}</td>
                <td>{e.konversiKreditKeJam}</td>
                <td>{e.capaianPembelajaran.sikap}</td>
                <td>{e.capaianPembelajaran.pengetahuan}</td>
                <td>{e.capaianPembelajaran.keterampilanUmum}</td>
                <td>{e.capaianPembelajaran.keterampilanKhusus}</td>
                <td>{e.dokumenRencanaPembelajaran}</td>
                <td>{e.unitPenyelenggara}</td>

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
