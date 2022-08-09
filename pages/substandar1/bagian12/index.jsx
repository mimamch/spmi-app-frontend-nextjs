import Script from "next/script";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Bagian2() {
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag2`
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag2/${id}`
        );
      } else {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub1/bag2/${id}`,
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
        <title>Substandar1 - Bagian 1-2</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Tabel 1 Bagian-2 Kerjasama Penelitian
            </h1>
            {user.role == "prodi" && (
              <Link href={`${pathname}/add`}>
                <a className="btn btn-primary">
                  <i className="fa fa-plus"></i> Tambah Data
                </a>
              </Link>
            )}
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3 ">
              <h6 className="m-0 font-weight-bold text-primary">Table 1-2</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
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
                      {user.role == "admin" && <th>User</th>}
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i}>
                        <td>{i + 1}.</td>
                        <td>{e.lembagaMitra}</td>
                        <td>{e.tingkat}</td>
                        <td>{e.judulKegiatan}</td>
                        <td>{e.manfaat}</td>
                        <td>{e.waktuDanDurasi}</td>
                        <td>{e.buktiKerjasama}</td>
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
                                  className="btn btn-success btn-sm "
                                  type="button"
                                >
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
              </div>
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
