import React, { useEffect, useState } from "react";
import Wrapper from "./wrapper";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";

export default function TemplateTabel({
  children,
  apiEndPoint,
  titleHeader,
  titleTable,
  ...props
}) {
  const { getMe } = useSelector((state) => state);
  const { user } = getMe;
  const { pathname } = useRouter();

  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="h3 mb-0 text-gray-800">{titleHeader || "View"}</h1>
              {props.titleSmall && <small>{props.titleSmall}</small>}
            </div>
            {user.role == "prodi" && (
              <Link href={`${pathname}/add`}>
                <a className="btn btn-primary">
                  <i className="fa fa-plus"></i> Tambah Data
                </a>
              </Link>
            )}
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                {titleTable || "Table"}
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">{children}</div>
            </div>
          </div>
          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
