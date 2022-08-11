import React, { useEffect, useState } from "react";
import Head from "next/head";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;

  const apiEndPoint = `sub3/bagB1`;

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
        <title>Substandar3 - Bagian 3-B-1</title>
      </Head>
      <TemplateTabel
        titleHeader={`Substandar3 - Bagian 3-B-1`}
        titleTable={`Substandar3 - Bagian 3-B-1`}
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
              <th className="text-center">Bidang Keahlian</th>
              <th className="text-center">Rekognisi dan Bukti Pendukung</th>
              <th className="text-center">Tingkat</th>
              <th className="text-center">Tahun</th>
              <th className="text-center">Aksi</th>
              {user.role == "admin" && <th className="text-center">User</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}.</td>
                <td>{e.namaDosen}</td>
                <td>{e.bidangKeahlian}</td>
                <td>{e.rekognisiDanBuktiPendukung}</td>
                <td>{e.tingkat}</td>
                <td>{e.tahun}</td>
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
