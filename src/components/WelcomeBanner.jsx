import React from "react";
import WelcomeIllustration from "../assets/dashboardassets/welcomeillustration.svg";

export default function WelcomeBanner() {
  return (
    <section className="flex gap-3">
      <div className="relative flex flex-col items-start justify-center py-10 pl-6 rounded-lg -z-10 outline outline-1 outline-C0076BE bg-C0076BE/20 basis-8/12 min-h-max">
        <h1 className="text-5xl welcomeText text-blue-950">
          Welcome to MediCore
        </h1>
        <p className="text-blue-950">Barangay Child Health Monitoring System</p>
        <img
          src={WelcomeIllustration}
          alt=""
          className="absolute right-0 h-auto w-60 top-5 -z-10"
        />
      </div>

      <div className="flex flex-col flex-1 p-4 text-lg text-white rounded-lg bg-C0076BE">
        <div className="">
          <p className="mb-2">Today</p>
          <hr />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 text-xl ">
          <h3>NOVEMBER</h3>
          <h3>07</h3>
        </div>
      </div>
    </section>
  );
}
