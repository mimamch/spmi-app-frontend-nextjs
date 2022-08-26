import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

export default function GrafikSub1Bagian2() {
  const [sub1bag2State, setsub1bag2State] = useState({});
  const getData = async () => {
    try {
      const sub1bag2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/grafik/sub1/bag2`
      );
      setsub1bag2State(sub1bag2.data.data);
      // const sub1bag3 = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_ENDPOINT}/grafik/sub1/bag3`
      // );
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
        <h4 className="card-title p-2 text-dark">
          Substandar 1 Bagian 2 - Kerjasama Penelitian
        </h4>
        <div className="row justify-content-around">
          <div className="col-md-3 ">
            <h5 className="card-title p-2 text-dark">Prodi Pengirim</h5>
            <Line
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: Object.keys(sub1bag2State.userCount || {}),
                datasets: [
                  {
                    label: "Jumlah",
                    data: Object.values(sub1bag2State.userCount || {}),
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
            <h5 className="card-title p-2 text-dark">Status Verifikasi</h5>
            <Pie
              data={{
                labels: ["Diterima", "Ditolak", "Belum Diverifikasi"],
                datasets: [
                  {
                    label: "#",
                    data: Object.values(sub1bag2State.statusVerifikasi || {}),
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
            <h5 className="card-title p-2 text-dark">Tingkat</h5>

            <Doughnut
              data={{
                labels: Object.keys(sub1bag2State.tingkat || {}),
                datasets: [
                  {
                    label: "# of Votes",
                    data: Object.values(sub1bag2State.tingkat || {}),
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
