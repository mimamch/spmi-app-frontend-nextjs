import Head from "next/head";
import Wrapper from "../layouts/wrapper";
import { useState, useEffect, Profiler } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import DateNow from "../layouts/components/DateNow";
import TimeNow from "../layouts/components/TimeNow";
export default function Home(props) {
  const { getMe } = useSelector((state) => state);
  const [mahasiswa, setmahasiswa] = useState(0);
  const [dosen, setdosen] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [initialHistory, setInitialHistory] = useState({
    visi: [],
    misi: [],
    tujuan: [],
    sasaran: [],
  });
  const [profile, setprofile] = useState({});
  const submit = async (val) => {
    // return console.log(val);
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/edit-profile`,
      {
        ...val,
        createdAt: new Date(),
      }
    );
    setInitialValues({});
    setIsShow(false);
    getProfile();
    try {
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfile = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-profile`
      );
      const { visi, misi, tujuan, sasaran } = data?.data?.data;
      setInitialHistory({
        visi: visi?.reverse() || [],
        misi: misi?.reverse() || [],
        tujuan: tujuan?.reverse() || [],
        sasaran: sasaran?.reverse() || [],
      });
      setprofile(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    const mahasiswa = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub2/bag1`
    );
    let jumlahMahasiswaAktif = 0;
    mahasiswa.data.data.map((e) => {
      jumlahMahasiswaAktif +=
        Number(e.jumlahMahasiswaAktif.reguler) +
        Number(e.jumlahMahasiswaAktif.transfer);
    });
    setmahasiswa(jumlahMahasiswaAktif);

    const dsn = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sub3/bagA1`
    );
    setdosen(dsn.data.data.length);
  };

  useEffect(() => {
    getData();
    getProfile();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              {getMe?.user?.fullName
                ? `Halo ${getMe.user.fullName}...`
                : "Dashboard"}
            </h1>
          </div>
          <div className="row">
            <div className="col-sm-6"></div>
          </div>
          {/* <!-- Content Row --> */}
          <div className="row">
            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-dark shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                        TOTAL MAHASISWA
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {mahasiswa ?? 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                        TOTAL DOSEN
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {dosen ?? 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                        Jam Saat Ini
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        <TimeNow />
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clock fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                        Tanggal Hari Ini
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        <DateNow />
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>VISI </h5>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setInitialValues({});
                        setTitle("Ubah Visi");
                        setInitialValues({
                          visi: profile?.visi?.[0]?.data ?? "",
                        });
                        setIsShow(true);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                    {profile?.visi?.[0]?.data ?? "Visi Belum Di isi"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>MISI </h5>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setInitialValues({});
                        setTitle("Ubah Misi");
                        setInitialValues({
                          misi: profile?.misi?.[0]?.data ?? "",
                        });
                        setIsShow(true);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                    {profile?.misi?.[0]?.data ?? "Misi Belum Di isi"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>TUJUAN </h5>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setInitialValues({});
                        setTitle("Ubah Tujuan");
                        setInitialValues({
                          tujuan: profile?.tujuan?.[0]?.data ?? "",
                        });
                        setIsShow(true);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                    {profile?.tujuan?.[0]?.data ?? "Tujuan Belum Di isi"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>SASARAN </h5>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setInitialValues({});
                        setTitle("Ubah Sasaran");
                        setInitialValues({
                          sasaran: profile?.sasaran?.[0]?.data ?? "",
                        });
                        setIsShow(true);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                    {profile?.sasaran?.[0]?.data ?? "Sasaran Belum Di isi"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div
        style={{
          display: isShow ? "flex" : "none",
          justifyContent: "center",
          // alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
          inset: 0,
          zIndex: 20,
          justifyContent: "center",
        }}
        className="p-5"
      >
        <div
          style={{
            // position: "fixed",
            // width: "100%",
            zIndex: 15,
            background: "white",
            position: "absolute",
          }}
          className="col-md-6 p-5 rounded"
        >
          <Formik
            onSubmit={submit}
            initialValues={initialValues}
            enableReinitialize={true}
          >
            <Form>
              <div className="col">
                <div className="form-group">
                  <label className="h4" htmlFor="field1">
                    {title}
                  </label>
                  <Field
                    id="field1"
                    as="textarea"
                    type="text"
                    className="form-control"
                    name={`${Object.keys(initialValues)[0]}`}
                    style={{ minHeight: "150px" }}
                  ></Field>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
          <div
            className="card p-3 mt-5"
            style={{
              zIndex: 15,
              width: "100%",
              position: "relative",
            }}
          >
            <h5 className="card-title">
              <i className="fas fa-history"></i> Riwayat
            </h5>
            <div className="card-body">
              {initialHistory[`${Object.keys(initialValues)[0]}`]?.length == 0
                ? null
                : initialHistory[`${Object.keys(initialValues)[0]}`]?.map(
                    (e, i) => (
                      <div className="card mb-3" key={i}>
                        <div className="card-body">
                          <p
                            className="card-title"
                            style={{ textAlign: "end" }}
                          >
                            {new Date(e.createdAt).toLocaleString()}
                          </p>
                          <p className="card-text">{e.data}</p>
                        </div>
                      </div>
                    )
                  )}
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsShow(false)}
          style={{
            background: "black",
            inset: 0,
            position: "fixed",
            zIndex: 10,
            opacity: "25%",
          }}
        ></div>
      </div>
    </>
  );
}
