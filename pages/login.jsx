import Link from 'next/link'
import React from 'react'

export default function Login() {
    const login = () => null
  return (
    <>
      <div
          style={{ minHeight: "100vh" }}
          className="row justify-content-center"
        >
          <div className=" my-auto col-md-3">
            <div className="card o-hidden border-0 shadow-sm ">
              <div className="card-body p-0">
                <Link href="/">
                  <a className="btn btn-dark btn-icon-split">
                    <span className="icon text-gray-600 btn-sm ">
                      <i className="fas fa-home text-gray-200"></i>
                    </span>
                  </a>
                </Link>
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                  <div className="col-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                          MASUK
                        </h1>
                      </div>
                      <form
                        className="user"
                        onSubmit={login}
                        data-aos="slide-left"
                        // method="post"
                        // action="/api/auth/callback/credentials"
                      >
                       
                        <div className="form-group">
                          <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Masukkan Email / Username"
                            autoCapitalize="off"
                            name="username"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-dark btn-user btn-block"
                        >
                          MASUK
                        </button>
                      </form>
                      <hr />
                      <div className="row">
                        {" "}
                        <div className="text-center col-6">
                          <Link href="/forgot">
                            <a className="small">Lupa Password?</a>
                          </Link>
                        </div>
                        <div className="text-center col-6">
                          <Link href="/register">
                            <a className="small">Daftar Sekarang!</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}