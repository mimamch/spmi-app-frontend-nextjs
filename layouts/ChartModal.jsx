import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { setShowChart } from "../store/ChartModalSlice";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";

export default function ChartModal() {
  const { chart, getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { showChart, chartData } = chart;
  const dispatch = useDispatch();

  return (
    <>
      {showChart && typeof window != undefined && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => dispatch(setShowChart())}
            style={{
              position: "fixed",
              inset: 0,
              background: "black",
              opacity: "25%",
              zIndex: 10,
              width: "100%",
            }}
          ></div>
          <div
            className="row mt-5 p-3 rounded justify-content-around w-full "
            style={{
              zIndex: 15,
              position: "absolute",
              background: "white",
              //   display: "flex",
              maxWidth: "85%",
              //   justifyContent: "space-around",
            }}
          >
            {chartData.map((e, i) => {
              if (e.title == "Prodi" && user.role == "prodi") return;
              return (
                <div
                  className="card mx-2 my-2"
                  style={{ minWidth: "20%" }}
                  key={i}
                >
                  <div className="card-body">
                    <h5 className="card-title">{e.title || "Chart"}</h5>
                    {e.type == "pie" && <Pie data={e} />}
                    {e.type == "doughnut" && <Doughnut data={e} />}
                    {e.type == "bar" && (
                      <Bar
                        data={e}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    )}
                    {e.type == "line" && <Line data={e} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
