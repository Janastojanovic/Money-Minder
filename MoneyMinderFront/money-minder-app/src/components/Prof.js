import { stringify } from "uuid";
import EditCategory from "./EditCategory";
import { useEffect, useState } from "react";
import ProcentageCounter from "./ProcentageCounter";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";

function Prof(props) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  }
  return (
    <div className="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="https://cdn150.picsart.com/upscale-245339439045212.png"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">
            Monthly budget: {props.monthlyBudget}
          </p>
          <p className="text-slate-500 font-medium">
            Current budget: {props.currentBudget}
          </p>
          <p className="text-slate-500 font-medium">Savings: {props.savings}</p>
          <p className="text-slate-500 font-medium">
            Salary date: {formatDate(props.salaryDate)}
          </p>
          <p className="text-slate-500 font-medium">Email: {props.email}</p>
        </div>
        <EditProfile
          name={props.name}
          monthlyBudget={props.monthlyBudget}
          savings={props.savings}
          salaryDate={props.salaryDate}
          id={props.id}
        />
        <DeleteProfile id={props.id} />
      </div>
    </div>
  );
}
export default Prof;
