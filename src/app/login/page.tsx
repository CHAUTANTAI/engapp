"use client";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <div className="flex flex-grow p-10 w-full h-full bg-[#ffffff]">
        <div className="rounded-3xl mx-5 w-full flex items-center justify-center">
          <Image
            src="/assets/img/logo.png"
            width={400}
            height={400}
            className="rounded-3xl shadow-custom"
            alt={"PHoTO"}
          />
        </div>
        <div className="bg-blue-500 w-full">a</div>
      </div>
    </>
  );
};

export default Login;
