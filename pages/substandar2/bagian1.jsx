import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'
import React, { useEffect } from 'react'
import UseScript from '../../layouts/UseScript';
import Wrapper from '../../layouts/wrapper'

export default function Bagian1() {
  const {pathName} = useRouter()
 
  return (
    
    <>
     <Head>
      <title>Substandar 2 - Bagian 1</title>
    </Head>
    <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Substandar 2</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Bagian 1
              </h6>
            </div>
            <div className="card-body">
             
              <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nama</th>
                      <th>Harga/1000</th>
                      <th>Min.</th>
                      <th>Max.</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                        <td>2.</td>
                        <td>dsfsf</td>
                        <td>asu</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>dsfsf</td>
                        <td>asu</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>dsfsf</td>
                        <td>asu</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>dsfdsgf</td>
                        <td>KONTOL</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>dsfsf</td>
                        <td>asu</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>dsfsf</td>
                        <td>asu</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                        <td>dsfdsgf</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
      {/* <UseScript url='/assets/vendor/datatables/jquery.dataTables.min.js' />
      <UseScript url='/assets/vendor/datatables/dataTables.bootstrap4.min.js' />
      <UseScript url='/assets/js/demo/datatables-demo.js' /> */}
      
    </>
  )
}
