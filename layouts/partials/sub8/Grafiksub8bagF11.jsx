import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

export default function GrafikSub8BagianF11() {
  const [data, setdata] = useState({});
  const getData = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/grafik/sub8/bag8F11`
      );
      // console.log(result.data.data);
      setdata(result.data.data);
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
        <h4 className="card-title p-2 text-dark ">Substandar 8 Bagian F11</h4>
        <div className="row justify-content-around">
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark mx-3 my-2">
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
                labels: Object.keys(data.pengirim || data.userCount || {}),
                datasets: [
                  {
                    label: "Jumlah",
                    data: Object.values(data.pengirim || data.userCount || {}),
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
                    data: Object.values(data.statusVerifikasi || {}),
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
            <h5 className="card-title p-2 text-dark mx-5 my-5">Jumlah Judul</h5>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(data.jumlahJudul || {}),
                datasets: [
                  {
                    label: "#",
                    data: Object.values(data.jumlahJudul || {}),
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
        </div>
      </div>
    </div>
  );
}
