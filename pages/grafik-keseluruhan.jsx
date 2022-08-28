import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../layouts/wrapper";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import GrafikSub1Bagian1 from "../layouts/partials/sub1/Grafiksub1bag1";
import GrafikSub1Bagian2 from "../layouts/partials/sub1/Grafiksub1bag2";
import GrafikSub1Bagian3 from "../layouts/partials/sub1/Grafiksub1bag3";
import GrafikSub2Bagian1 from "../layouts/partials/sub2/Grafiksub2bag1";
import GrafikSub2Bagian2 from "../layouts/partials/sub2/Grafiksub2bag2";
import GrafikSub3BagianA1 from "../layouts/partials/sub3/Grafiksub3bagA1";
import GrafikSub3BagianA2 from "../layouts/partials/sub3/Grafiksub3bagA2";
import GrafikSub3BagianA3 from "../layouts/partials/sub3/Grafiksub3bagA3";
import GrafikSub3BagianA4 from "../layouts/partials/sub3/Grafiksub3bagA4";
import GrafikSub3BagianA5 from "../layouts/partials/sub3/Grafiksub3bagA5";
import GrafikSub3BagianB1 from "../layouts/partials/sub3/Grafiksub3bagB1";
import GrafikSub3BagianB2 from "../layouts/partials/sub3/Grafiksub3bagB2";
import GrafikSub3BagianB3 from "../layouts/partials/sub3/Grafiksub3bagB3";
import GrafikSub3BagianB41 from "../layouts/partials/sub3/Grafiksub3bagB41";
import GrafikSub3BagianB42 from "../layouts/partials/sub3/Grafiksub3bagB42";
import GrafikSub3BagianB5 from "../layouts/partials/sub3/Grafiksub3bagB5";
import GrafikSub3BagianB6 from "../layouts/partials/sub3/Grafiksub3bagB6";
import GrafikSub3BagianB71 from "../layouts/partials/sub3/Grafiksub3bagB71";
import GrafikSub3BagianB72 from "../layouts/partials/sub3/Grafiksub3bagB72";
import GrafikSub3BagianB73 from "../layouts/partials/sub3/Grafiksub3bagB73";
import GrafikSub3BagianB74 from "../layouts/partials/sub3/Grafiksub3bagB74";
import GrafikSub4Bagian1 from "../layouts/partials/sub4/Grafiksub4bag1";
import GrafikSub5BagianA from "../layouts/partials/sub5/Grafiksub5bagA";
import GrafikSub5BagianB from "../layouts/partials/sub5/Grafiksub5bagB";
import GrafikSub5BagianC from "../layouts/partials/sub5/Grafiksub5bagC";
import GrafikSub6BagianA from "../layouts/partials/sub6/Grafiksub6bagA";
import GrafikSub6BagianB from "../layouts/partials/sub6/Grafiksub6bagB";
import GrafikSub7BagianA from "../layouts/partials/sub7/Grafiksub7bag1";
import GrafikSub8BagianA from "../layouts/partials/sub8/Grafiksub8bagA";
import GrafikSub8BagianB1 from "../layouts/partials/sub8/Grafiksub8bagB1";
import GrafikSub8BagianB2 from "../layouts/partials/sub8/Grafiksub8bagB2";
import GrafikSub8BagianC from "../layouts/partials/sub8/Grafiksub8bagC";
import GrafikSub8BagianD1 from "../layouts/partials/sub8/Grafiksub8bagD1";
import GrafikSub8BagianD2 from "../layouts/partials/sub8/Grafiksub8bagD2";
import GrafikSub8BagianE1 from "../layouts/partials/sub8/Grafiksub8bagE1";
import GrafikSub8BagianE2 from "../layouts/partials/sub8/Grafiksub8bagE2";
import GrafikSub8BagianE2Ref from "../layouts/partials/sub8/Grafiksub8bagE2Ref";
import GrafikSub8BagianF11 from "../layouts/partials/sub8/Grafiksub8bagF11";
import GrafikSub8BagianF12 from "../layouts/partials/sub8/Grafiksub8bagF12";
import GrafikSub8BagianF2 from "../layouts/partials/sub8/Grafiksub8bagF2";
import GrafikSub8BagianF3 from "../layouts/partials/sub8/Grafiksub8bagF3";
import GrafikSub8BagianF41 from "../layouts/partials/sub8/Grafiksub8bagF41";
import GrafikSub8BagianF42 from "../layouts/partials/sub8/Grafiksub8bagF42";
import GrafikSub8BagianF43 from "../layouts/partials/sub8/Grafiksub8bagF43";
import GrafikSub8BagianF44 from "../layouts/partials/sub8/Grafiksub8bagF44";
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
          <GrafikSub3BagianA1 />
          <GrafikSub3BagianA2 />
          <GrafikSub3BagianA3 />
          <GrafikSub3BagianA4 />
          <GrafikSub3BagianA5 />
          <GrafikSub3BagianB1 />
          <GrafikSub3BagianB2 />
          <GrafikSub3BagianB3 />
          <GrafikSub3BagianB41 />
          <GrafikSub3BagianB42 />
          <GrafikSub3BagianB5 />
          <GrafikSub3BagianB6 />
          <GrafikSub3BagianB71 />
          <GrafikSub3BagianB72 />
          <GrafikSub3BagianB73 />
          <GrafikSub3BagianB74 />
          <GrafikSub4Bagian1 />
          <GrafikSub5BagianA />
          <GrafikSub5BagianB />
          <GrafikSub5BagianC />
          <GrafikSub6BagianA />
          <GrafikSub6BagianB />
          <GrafikSub7BagianA />
          <GrafikSub8BagianA />
          <GrafikSub8BagianB1 />
          <GrafikSub8BagianB2 />
          <GrafikSub8BagianC />
          <GrafikSub8BagianD1 />
          <GrafikSub8BagianD2 />
          <GrafikSub8BagianE1 />
          <GrafikSub8BagianE2 />
          <GrafikSub8BagianE2Ref />
          <GrafikSub8BagianF11 />
          <GrafikSub8BagianF12 />
          <GrafikSub8BagianF2 />
          <GrafikSub8BagianF3 />
          <GrafikSub8BagianF41 />
          <GrafikSub8BagianF42 />
          <GrafikSub8BagianF43 />
          <GrafikSub8BagianF44 />
        </div>
      </Wrapper>
    </>
  );
}
