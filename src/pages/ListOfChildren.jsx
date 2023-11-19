import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";

export default function ListOfChildren() {
  return (
    // TODO:
    // Change the bg color of the "active"
    <section>
      <WelcomeBanner></WelcomeBanner>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-left border-b">
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emma Watsons</td>
            <td>4</td>
            <td>Female</td>
            <td>123 Zone 3, Cabaruan</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
