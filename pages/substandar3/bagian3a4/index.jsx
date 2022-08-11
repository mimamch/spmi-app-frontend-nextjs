import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;

  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA4`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA4/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA4/${id}`,
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
        <title>Substandar3 - Bagian 3-A-4</title>
      </Head>
      <TemplateTabel
        apiEndPoint={`sub3/bagA4`}
        titleHeader={`Substandar3 - Bagian 3-A-4`}
        titleTable={`Bagian 3-A-4`}
      >
        <table
          id="dataTable"
          className="display table table-bordered"
          style={{ width: "100%", height: "100%" }}
        >
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">Nama Dosen</th>
              <th className="text-center">NIDN</th>
              <th className="text-center">Pendidikan Pasca Sarjana</th>
              <th className="text-center">Bidang Keahlian</th>
              <th className="text-center">Jabatan Akademik</th>
              <th className="text-center">Sertifikat Pendidik Professional</th>
              <th className="text-center">
                Sertifikat Kompetensi/Profesi/Industri
              </th>
              <th className="text-center">
                Mata Kuliah yang Diampu pada PS yang Diakreditasi
              </th>
              <th className="text-center">
                Kesesuaian Bidang Keahlian dengan Mata Kuliah yang Diampu
              </th>
              {user.role == "admin" && <th>User</th>}
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}.</td>
                <td>{e.namaDosen}</td>
                <td>{e.nidn}</td>
                <td>{e.pendidikanPasca}</td>
                <td>{e.bidangKeahlian}</td>
                <td>{e.jabatanAkademik}</td>
                <td>{e.sertifikatPendidikProfessional}</td>
                <td>{e.sertifikatKompetensi}</td>
                <td>{e.mataKuliahYangDiAmpuPadaPsAkreditasi}</td>
                <td>{e.kesesuaianBidangKeahlian}</td>
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
