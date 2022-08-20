import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import Wrapper from "../../layouts/wrapper";

export default function Users() {
  const user = useSelector((state) => state.getMe.user);
  const { pathname } = useRouter();

  const fetcher = () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-all-users`)
      .then((res) => res.data);
  const { data, error, isValidating, mutate } = useSWR("getUsers", fetcher);
  if (error) toast.error(error.message);

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user/${id}`
      );
      mutate();
      toast.success("Berhasil Menghapus User");
    } catch (error) {
      toast.error(error.message);
    }
  };
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
            <Link href={`${pathname}/add`}>
              <a className="btn btn-primary">
                <i className="fa fa-plus"></i> Tambah Pengguna Baru
              </a>
            </Link>
          </div>

          <div className="card shadow mb-4">
            <div className="card-body">
              {!error && !data ? (
                <div className="spinner-border text-primary " role="status">
                  <span className="sr-only text-center">Loading...</span>
                </div>
              ) : (
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
                      {data.data.map((e, i) => (
                        <tr key={i}>
                          <td>{i + 1}.</td>
                          <td>{e.fullName}</td>
                          <td>{e.username}</td>
                          <td>{e.email}</td>
                          <td>{e.role}</td>
                          <td>
                            <div>
                              <button
                                onClick={() => deleteUser(e._id)}
                                className="btn btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
