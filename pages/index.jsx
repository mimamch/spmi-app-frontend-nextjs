import Head from "next/head";
import Wrapper from "../layouts/wrapper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home(props) {
  const { getMe } = useSelector((state) => state);
  const [mahasiswa, setmahasiswa] = useState(0);
  const [dosen, setdosen] = useState(0);

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
              {getMe.user ? `Halo ${getMe.user.fullName}...` : "Dashboard"}
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
                        {mahasiswa}
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
                        {dosen}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                    <h5>VISI PRODI</h5>
                    <button className="btn btn-sm btn-success">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {getMe.user && `${getMe.user.visi || "Visi Prodi"}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>MISI PRODI</h5>
                    <button className="btn btn-sm btn-success">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {getMe.user && `${getMe.user.misi || "Misi Prodi"}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>TUJUAN PRODI</h5>
                    <button className="btn btn-sm btn-success">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {getMe.user && `${getMe.user.tujuan || "Tujuan Prodi"}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 my-3">
              <div className="card">
                <div className="card-header">
                  <div className="row  justify-content-between items-center ">
                    <h5>SASARAN PRODI</h5>
                    <button className="btn btn-sm btn-success">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {getMe.user && `${getMe.user.sasaran || "Sasaran Prodi"}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
