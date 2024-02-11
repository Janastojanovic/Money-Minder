import { stringify } from "uuid";
import EditCategory from "./EditCategory";
import { useEffect, useState } from "react";
import ProcentageCounter from "./ProcentageCounter";
import styles from "./Category.css"

function Category(props) {

  // const [stringProcentage, setStringProcentage] = useState("");
  // useEffect(() => {
  //   console.log('usl');
  //   const procentage = (props.currentBudget / props.budget) * 100;
  //   setStringProcentage('progress-bar progress-bar-striped bg-warning w-' + procentage)
  //   console.log(stringProcentage)
  // },[props.currentBudget,props.budget]);
  // useEffect(()=>{
  //   console.log('uslooooooooo');
  //   const procentage=(props.currentBudget/props.budget)*100;
  //   if (procentage >= 80) {
  //     console.log('80'+ procentage);
  //     setStringProcentage('progress-bar progress-bar-striped bg-success w-' + procentage);
  //   } else if (procentage >= 50) {
  //     console.log('50'+ procentage);
  //     setStringProcentage('progress-bar progress-bar-striped bg-warning w-' + procentage);
  //   } else {
  //     console.log('30');
  //     setStringProcentage('progress-bar progress-bar-striped bg-danger w-' + procentage);
  //   }
  //   console.log(stringProcentage);
  // },[procentage,stringProcentage,props.currentBudget,props.budget]);
  // useEffect(() => {
  //   const calculatePercentage = () => {
  //     const percentage = (props.currentBudget / props.budget) * 100;
  //     if (percentage >= 80) {
  //       setStringProcentage('progress-bar progress-bar-striped bg-success w-' + percentage);
  //     } else if (percentage >= 50) {
  //       setStringProcentage('progress-bar progress-bar-striped bg-warning w-' + percentage);
  //     } else {
  //       setStringProcentage('progress-bar progress-bar-striped bg-danger w-' + percentage);
  //     }
  //   };

  //   calculatePercentage(); // Initial calculation
  // }, [props.currentBudget, props.budget]);

  return (
    <div className="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">
            Monthly budget: {props.budget}
          </p>
          <p className="text-slate-500 font-medium">
            Current budget: {props.currentBudget}
          </p>
          {/* <div className="progress">
            <div
              on
              className={stringProcentage}
              role="progressbar"
              aria-valuenow={"75"}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div> */}
           <div className="container">
        <div className="progressbar-container">
          <div className="progressbar-complete" style={{width: `${props.procentage}%`}}>
            <div className="progressbar-liquid"></div>
          </div>
        </div>
      </div>
          {/* <ProcentageCounter procentage={props.procentage}/> */}
        </div>
        {props.editCategory}
        {props.deleteCategory}
        {props.addTransaction}
      </div>
    </div>
  );
}
export default Category;
