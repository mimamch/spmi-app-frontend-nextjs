import Script from "next/script";
import React, { useEffect } from "react";
import Wrapper from "../../../layouts/wrapper";
import { useRouter } from "next/router";
import UseScript from "../../../layouts/UseScript";
import Head from "next/head";
import { Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import EditFormTemplate from "../../../layouts/EditForm";
import Cookies from "js-cookie";

export default function Bagian1() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("[")[0];
  const { id } = router.query;
  const [initial, setInitial] = useState({});

  const apiEndPoint = `sub4`;

  const add = async (val) => {
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${id}`,
        {
          ...val,
        }
      );
      Cookies.set(
        "flash",
        JSON.stringify({
          type: "success",
          text: "Berhasil Mengubah Data",
        })
      );
      router.push(backPath);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = async (_id) => {
    try {
      if (!_id) return;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}/${_id}`
      );
      setInitial(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const temp = {
    jenisPenggunaan: "",
    unitPengelolaanPs: {
      TS2: "",
      TS1: "",
      TS: "",
    },
    programStudi: {
      TS2: "",
      TS1: "",
      TS: "",
    },
  };

  return (
    <>
      <Head>
        <title>Edit Substandar 4</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit Substandar 4</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Edit Substandar 4
              </h6>
            </div>
            <div className="card-body">
              <EditFormTemplate
                initialValues={temp}
                apiEndPoint={`${apiEndPoint}`}
                field={[
                  {
                    title: "Jenis Penggunaan",
                    name: "jenisPenggunaan",
                    type: "text",
                  },
                  {
                    title: "Unit Pengelolaan PS",
                    name: "unitPengelolaanPs",
                    type: "text",
                    child: [
                      {
                        title: "TS-2",
                        name: "TS2",
                        type: "number",
                      },
                      {
                        title: "TS-1",
                        name: "TS1",
                        type: "number",
                      },
                      {
                        title: "TS",
                        name: "TS",
                        type: "number",
                      },
                    ],
                  },
                  {
                    title: "Program Studi",
                    name: "programStudi",
                    type: "text",
                    child: [
                      {
                        title: "TS-2",
                        name: "TS2",
                        type: "number",
                      },
                      {
                        title: "TS-1",
                        name: "TS1",
                        type: "number",
                      },
                      {
                        title: "TS",
                        name: "TS",
                        type: "number",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
