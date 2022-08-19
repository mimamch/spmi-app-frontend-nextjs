import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import TemplateTabel from "../../../layouts/TablePageTemplate";
import { setChartData } from "../../../store/ChartModalSlice";

export default function Bagian1() {
  const [data, setData] = useState([]);
  const { pathname } = useRouter();
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;

  const apiEndPoint = `sub8/bag8C`;
  const dispatch = useDispatch();
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
      let jumlahMahasiswaYangLulusPada = {
        TS6: 0,
        TS5: 0,
        TS4: 0,
        TS3: 0,
        TS2: 0,
        TS1: 0,
        TS: 0,
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
        jumlahMahasiswaYangLulusPada.TS6 += e.jumlahMahasiswaYangLulusPada.TS6;
        jumlahMahasiswaYangLulusPada.TS5 += e.jumlahMahasiswaYangLulusPada.TS5;
        jumlahMahasiswaYangLulusPada.TS4 += e.jumlahMahasiswaYangLulusPada.TS4;
        jumlahMahasiswaYangLulusPada.TS3 += e.jumlahMahasiswaYangLulusPada.TS3;
        jumlahMahasiswaYangLulusPada.TS2 += e.jumlahMahasiswaYangLulusPada.TS2;
        jumlahMahasiswaYangLulusPada.TS1 += e.jumlahMahasiswaYangLulusPada.TS1;
        jumlahMahasiswaYangLulusPada.TS += e.jumlahMahasiswaYangLulusPada.TS;
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
            title: "Jumlah Mahasiswa Yang Lulus",
            labels: Object.keys(jumlahMahasiswaYangLulusPada),
            datasets: [
              {
                label: "Jumlah Mahasiswa Yang Lulus",
                data: Object.values(jumlahMahasiswaYangLulusPada),
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
      toast.error(`Error Getting Data :  ${error.message}`);
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
        <title>Substandar8 - Bagian 8-C</title>
      </Head>
      <TemplateTabel
        data={data}
        titleHeader={"Tabel 8.c Masa Studi Lulusan"}
        titleTable={"Tabel 8.c Masa Studi Lulusan"}
        titleSmall={
          "Diisi oleh pengusul dari Program Studi pada program Diploma Tiga/Sarjana/Sarjana Terapan"
        }
      >
        <table id="dataTable" className="display table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2" className="text-center">
                No.
              </th>
              <th rowSpan="2" className="text-center">
                Tahun Masuk
              </th>
              <th rowSpan="2" className="text-center">
                Jumlah Mahasiswa Diterima
              </th>
              <th colSpan="7" className="text-center">
                Jumlah Mahasiswa yang Lulus Pada
              </th>
              <th rowSpan="2" className="text-center">
                Jumlah Lulusan s.d Akhir TS
              </th>
              <th rowSpan="2" className="text-center">
                Rata-rata Masa Studi
              </th>
              {user.role == "admin" && <th rowSpan="2">User</th>}

              <th rowSpan="2" className="text-center">
                Aksi
              </th>
            </tr>

            <tr>
              <th>TS-6</th>
              <th>TS-5</th>
              <th>TS-4</th>
              <th>TS-3</th>
              <th>TS-2</th>
              <th>TS-1</th>
              <th>TS</th>
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
                <td>{e.tahunMasuk}</td>
                <td>{e.jumlahMahasiswaDiterima}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS6}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS5}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS4}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS3}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS2}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS1}</td>
                <td>{e.jumlahMahasiswaYangLulusPada.TS}</td>
                <td>{e.jumlahLulusanAkhir}</td>
                <td>{e.rataRataMasaStudi}</td>

                {user.role == "admin" && <td>{e.user.fullName}</td>}
                <td>
                  {user.role == "admin" && !e.isAccepted && (
                    <div>
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
                        ></i>
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
