import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import Link from "next/link";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;

  const apiEndPoint = `sub4/`;

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
        <title>Substandar4 - Bagian 1</title>
      </Head>
      <TemplateTabel
        titleHeader={`Substandar4 - Bagian 1`}
        titleTable={`Substandar4 - Bagian 1`}
      >
        <table
          id="dataTable"
          className="display table table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th rowSpan="2">No.</th>
              <th rowSpan="2">Jenis Penggunaan</th>
              <th colSpan="4" className="text-center">
                Unit Pengelola Program Studi (Rupiah)
              </th>
              <th colSpan="4" className="text-center">
                Program Studi (Rupiah)
              </th>
              {user.role == "admin" && <td rowSpan="2">User</td>}
              <th rowSpan="2">Aksi</th>
            </tr>

            <tr>
              <th>TS-2</th>
              <th>TS-1</th>
              <th>TS</th>
              <th>Rata-rata</th>
              <th>TS-2</th>
              <th>TS-1</th>
              <th>TS</th>
              <th>Rata-rata</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}.</td>
                <td>{e.jenisPenggunaan}</td>
                <td>{e.unitPengelolaanPs.TS2}</td>
                <td>{e.unitPengelolaanPs.TS1}</td>
                <td>{e.unitPengelolaanPs.TS}</td>
                <td>{Math.round(e.rataRataUnitPengelolaanPs)}</td>
                <td>{e.programStudi.TS2}</td>
                <td>{e.programStudi.TS1}</td>
                <td>{e.programStudi.TS}</td>
                <td>{Math.round(e.rataRataProgramStudi)}</td>
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
