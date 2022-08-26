import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../layouts/wrapper";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import GrafikSub1Bagian1 from "../layouts/partials/Grafiksub1bag1";
import GrafikSub1Bagian2 from "../layouts/partials/Grafiksub1bag2";
import GrafikSub1Bagian3 from "../layouts/partials/Grafiksub1bag3";
import GrafikSub2Bagian1 from "../layouts/partials/Grafiksub2bag1";
import GrafikSub2Bagian2 from "../layouts/partials/Grafiksub2bag2";
export default function GrafikKeseluruhan() {
  const getData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Grafik Keseluruhan</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Grafik Keseluruhan</h1>
          </div>
          <GrafikSub1Bagian1 />
          <GrafikSub1Bagian2 />
          <GrafikSub1Bagian3 />
          <GrafikSub2Bagian1 />
          <GrafikSub2Bagian2 />
          <div className="card shadow mb-4">
            <div className="card-body mb-3">
              <h4 className="card-title p-2 text-dark">Grafik Kerjasama</h4>
              <div className="row justify-content-around">
                <div className="col-md-3 ">
                  <Bar
                    data={{
                      labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                      ],
                      datasets: [
                        {
                          label: "# of Votes",
                          data: [12, 19, 3, 5, 2, 3],
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
                  <Bar
                    data={{
                      labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                      ],
                      datasets: [
                        {
                          label: "# of Votes",
                          data: [12, 19, 3, 5, 2, 3],
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
                  <Bar
                    data={{
                      labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                      ],
                      datasets: [
                        {
                          label: "# of Votes",
                          data: [12, 19, 3, 5, 2, 3],
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
        </div>
      </Wrapper>
    </>
  );
}