import { stringify } from "uuid";
import EditCategory from "./EditCategory";
import { useEffect, useState } from "react";

function Transaction(props) {
  //const procentage=(props.currentBudget/props.budget)*100;
  //const [stringProcentage,setStringProcentage]=useState('');
//   useEffect(() => {
//     if (procentage >= 80) {
//       setStringProcentage('progress-bar progress-bar-striped bg-success w-' + procentage);
//     } else if (procentage >= 50) {
//       setStringProcentage('progress-bar progress-bar-striped bg-warning w-' + procentage);
//     } else {
//       setStringProcentage('progress-bar progress-bar-striped bg-danger w-' + procentage);
//     }
//   }, [procentage]);
  return (
    <div className="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      {/* <img
        className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
      /> */}
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">
            Amount: {props.amount}
          </p>
          <p className="text-slate-500 font-medium">
            Description: {props.description}
          </p>
          {/* <div className="progress">
            <div
              className={stringProcentage}
              role="progressbar"
              aria-valuenow={"75"}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div> */}
        </div>
        {props.editTransaction}
        {props.deleteTransaction}
      </div>
    </div>
  );
}
export default Transaction;
