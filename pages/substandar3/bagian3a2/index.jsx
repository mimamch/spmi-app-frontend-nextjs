import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import TemplateTabel from "../../../layouts/TablePageTemplate";

export default function Bagian1() {
  const [data, setData] = useState([]);

  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();

  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA2/${id}`,
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
        <title>Substandar 3 - Bagian 3-A-2</title>
      </Head>
      <TemplateTabel
        titleHeader={`Substandar 3 - Bagian 3-A-2`}
        titleTable={`Substandar 3 - Bagian 3-A-2`}
        apiEndPoint={`sub3/bagA2`}
      >
        <table
          id="dataTable"
          className="display table table-bordered"
          style={{ width: "100%" }}
        >
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
                <td>{i + 1}.</td>
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
