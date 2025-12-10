import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col">
      <div className="flex justify-between pb-10 border-b border-gray-300">
        <div className="flex flex-col gap-5">
          <div
            onClick={() => navigate("/")}
            className="text-green-600 font-semibold text-3xl cursor-pointer"
          >
            All Day <span className="text-gray-700">Shop</span>
          </div>
          <p className="w-120 text-sm text-gray-500">
            Welcome to gocart, your ultimate destination for the latest and
            smartest gadgets. From smartphones and smartwatches to essential
            accessories, we bring you the best in innovation — all in one place.
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
              <SlSocialFacebook className="h-5 w-5 text-gray-500" />
            </div>
            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
              <FaInstagram className="h-5 w-5 text-gray-500" />
            </div>
            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
              <SlSocialTwitter className="h-5 w-5 text-gray-500" />
            </div>
            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
              <FiLinkedin className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex gap-30">
          <div className="flex flex-col gap-3">
            <h3 className="text-md text-gray-600 font-semibold">PRODUCTS</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-gray-500">Earphones</li>
              <li className="text-sm text-gray-500">Headphones</li>
              <li className="text-sm text-gray-500">Smartphones</li>
              <li className="text-sm text-gray-500">Laptops</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-md text-gray-600 font-semibold">WEBSITE?</h3>
            <ul className="flex flex-col gap-2">
              <li
                onClick={() => navigate("/")}
                className="text-sm text-gray-500 cursor-pointer hover:underline"
              >
                Home
              </li>
              <li className="text-sm text-gray-500">Privacy Policy</li>
              <li className="text-sm text-gray-500">Become Plus Member</li>
              <li
                onClick={() => navigate("/create-store")}
                className="text-sm text-gray-500 cursor-pointer hover:underline"
              >
                Create Your Store
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-md text-gray-600 font-semibold">CONTACT</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-gray-500 flex items-center gap-2">
                <FaRegEnvelope className="w-4 h-4" />
                <span>+1-212-456-7890</span>
              </li>
              <li className="text-sm text-gray-500 flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <span>contact@example.com</span>
              </li>
              <li className="text-sm text-gray-500 flex items-center gap-2">
                <IoLocationOutline className="w-5 h-5" />
                <span>794 Francisco, 94102</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 py-5">
          Copyright 2025 © gocart All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
