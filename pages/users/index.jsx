import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../layouts/wrapper";

export default function Users() {
  const user = useSelector((state) => state.getMe.user);
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Manajemen Pengguna - Admin</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Manajemen Pengguna</h1>
            {user.role == "prodi" && (
              <Link href={`${pathname}/add`}>
                <a className="btn btn-primary">
                  <i className="fa fa-plus"></i> Tambah Pengguna Baru
                </a>
              </Link>
            )}
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3 justify-content-between row"></div>
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
                      <th>Nama</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {data.map((e, i) => (
                      <tr key={i}>
                        <td
                          className={`${
                            user.role == "prodi" &&
                            ((e.isAccepted == "accepted" &&
                              "bg-success text-light") ||
                              (e.isAccepted == "declined" &&
                                "bg-danger text-light"))
                          }`}
                        >
                          {i + 1}.
                        </td>
                        <td>{e.lembagaMitra}</td>
                        <td>{e.tingkat}</td>
                        <td>{e.judulKegiatan}</td>
                        <td>{e.manfaat}</td>
                        <td>{e.waktuDanDurasi}</td>
                        <td>{e.buktiKerjasama}</td>
                        <td>{e.tahunBerakhir}</td>
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
                    ))} */}
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
