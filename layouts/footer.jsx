import React from "react";
export default function Footer() {
  return (
    <footer className="sticky-footer bg-primary text-gray-100 py-2">
      <div className="container my-auto">
        <div className="copyright text-center my-auto ">
          <span>
            Copyright ©️ 2022, All Right Reserved. Crafted by {" "}
            <a
              target="_blank"
              className="text-gray-200"
              href="https://instagram.com/kampusubl"
            >
              Universitas Bandar Lampung
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
