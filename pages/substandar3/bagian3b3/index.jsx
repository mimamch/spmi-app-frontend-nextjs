import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { setChartData } from "../../../store/ChartModalSlice";
import Swal from "sweetalert2";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const dispatch = useDispatch();
  const apiEndPoint = `sub3/bagB3`;
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
        $("#dataTable").DataTable({
          footerCallback: function (row, data, start, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
              return typeof i === "string"
                ? i.replace(/[\$,]/g, "") * 1
                : typeof i === "number"
                ? i
                : 0;
            };
            function getFooterSum(col) {
              let colData = api
                .column(col)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);
              $(api.column(col).footer()).html(colData);
            }
            getFooterSum(2);
            getFooterSum(3);
            getFooterSum(4);
            getFooterSum(5);
          },
          // destroy: true,
          retrieve: true,
        });
      });

      let statusVerifikasi = {
        accepted: 0,
        declined: 0,
        unverif: 0,
      };
      let jumlahJudulPKM = {
        TS2: 0,
        TS1: 0,
        TS: 0,
      };
      let pengirim = {};
      let rataRata = {};
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
        jumlahJudulPKM.TS2 += e.jumlahJudulPKM.TS2;
        jumlahJudulPKM.TS1 += e.jumlahJudulPKM.TS1;
        jumlahJudulPKM.TS += e.jumlahJudulPKM.TS;
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
            title: "Jumlah Judul PKM",
            labels: Object.keys(jumlahJudulPKM),
            datasets: [
              {
                label: "Jumlah",
                data: Object.values(jumlahJudulPKM),
                backgroundColor: [
                  "rgba(242, 0, 255, 0.8)",
                  "rgba(255, 0, 0, 0.7)",
                  "rgba(255, 200, 0, 0.7)",
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
        <title>Substandar3 - Bagian 3-B-3</title>
      </Head>
      <TemplateTabel
        tableRef={tableRef}
        data={data}
        titleHeader={`Substandar3 - Bagian 3-B-3`}
        titleTable={`Substandar3 - Bagian 3-B-3`}
      >
        <table
          ref={tableRef}
          id="dataTable"
          className="display table table-bordered"
        >
          <thead>
            <tr>
              <th rowSpan="2" className="text-center">
                Nomor
              </th>
              <th rowSpan="2" className="text-center">
                Sumber Pembiayaan
              </th>
              <th colSpan="3" className="text-center">
                Jumlah Judul PKM
              </th>
              <th rowSpan="2" className="text-center">
                Jumlah
              </th>
              {user.role == "admin" && (
                <th rowSpan="2" className="text-center">
                  User
                </th>
              )}
              <th rowSpan="2" className="text-center">
                Komentar
              </th>
              <th rowSpan="2" className="text-center">
                Aksi
              </th>
            </tr>

            <tr>
              <th className="text-center">TS-2</th>
              <th className="text-center">TS-1</th>
              <th className="text-center">TS</th>
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
                <td>{e.sumberPembiayaan}</td>
                <td>{e.jumlahJudulPKM.TS2}</td>
                <td>{e.jumlahJudulPKM.TS1}</td>
                <td>{e.jumlahJudulPKM.TS}</td>
                <td>{e.jumlah}</td>
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
          <tfoot>
            <tr>
              <th></th>
              <th>Jumlah</th>
              <th></th>
              <th></th>
              <th></th>
              {user.role == "admin" && <th></th>}
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </TemplateTabel>
    </>
  );
}
