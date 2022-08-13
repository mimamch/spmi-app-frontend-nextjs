import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import Link from "next/link";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;

  const apiEndPoint = `sub5/bag5A`;

  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`
        );
        toast.success(`Berhasil Melakukan Aksi`);
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`,
          {
            isAccepted: act == "accept" ? "accepted" : "declined",
          }
        );
        toast.success(`Berhasil Melakukan Aksi`);
      }
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
      <TemplateTabel titleHeader={`Bagian 5 A`} titleTable={`Bagian 5 A`}>
        <table
          id="dataTable"
          className="display table table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th rowSpan="2">No.</th>
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
            {/* mataKuliahKompetensi: "N",
    bobot: {
      kuliah: "",
      seminar: "",
      praktikum: "",
    },
    konversiKreditKeJam: "",
    capaianPembelajaran: {
      sikap: "N",
      pengetahuan: "N",
      keterampilanUmum: "N",
      keterampilanKhusus: "N",
    },
    dokumenRencanaPembelajaran: "",
    unitPenyelenggara: "", */}
            {data.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
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
