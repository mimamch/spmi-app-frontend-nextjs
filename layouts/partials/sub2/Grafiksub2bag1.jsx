import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

export default function GrafikSub2Bagian1() {
  const [sub2bag1State, setsub2bag1State] = useState({});
  const getData = async () => {
    try {
      const sub2bag1 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/grafik/sub2/bag1`
      );
      //   console.log(sub2bag1.data.data);
      setsub2bag1State(sub2bag1.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-body mb-3">
        <h4 className="card-title p-2 text-dark ">Substandar 2 Bagian A</h4>
        <div className="row justify-content-around">
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">
              Prodi Pengirim
            </h5>
            <Line
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(sub2bag1State.pengirim || {}),
                datasets: [
                  {
                    label: "Jumlah",
                    data: Object.values(sub2bag1State.pengirim || {}),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">
              Status Verifikasi
            </h5>
            <Pie
              data={{
                labels: ["Diterima", "Ditolak", "Belum Diverifikasi"],
                datasets: [
                  {
                    label: "#",
                    data: Object.values(sub2bag1State.statusVerifikasi || {}),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">Daya Tampung</h5>
            <Doughnut
              data={{
                labels: Object.keys(sub2bag1State.dayaTampung || {}),
                datasets: [
                  {
                    label: "Banyak Data Dari Prodi",
                    data: Object.values(sub2bag1State.dayaTampung || {}),

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
              }}
            />
          </div>
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">
              Jumlah Calon Mahasiswa
            </h5>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(sub2bag1State.jumlahCalonMahasiswa || {}),
                datasets: [
                  {
                    label: "Jumlah Calon Mahasiswa",
                    data: Object.values(
                      sub2bag1State.jumlahCalonMahasiswa || {}
                    ),
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
              }}
            />
          </div>
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">
              Jumlah Mahasiswa Baru
            </h5>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(sub2bag1State.jumlahMahasiswaBaru || {}),
                datasets: [
                  {
                    label: "Jumlah Mahasiswa Baru",
                    data: Object.values(
                      sub2bag1State.jumlahMahasiswaBaru || {}
                    ),
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
              }}
            />
          </div>
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-5 my-5">
              Jumlah Mahasiswa Aktif
            </h5>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(sub2bag1State.jumlahMahasiswaAktif || {}),
                datasets: [
                  {
                    label: "Jumlah Mahasiswa Aktif",
                    data: Object.values(
                      sub2bag1State.jumlahMahasiswaAktif || {}
                    ),
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
