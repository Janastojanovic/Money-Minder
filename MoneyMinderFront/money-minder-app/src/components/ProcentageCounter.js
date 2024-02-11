// import { useState } from "react";

// const ProgressBar = (props) => {
//     const [stringProcentage,setStringProcentage]=useState('');
//     setStringProcentage('progress-bar progress-bar-striped bg-warning w-'+ props.procentage)
//     return (
//         <div className="progress">
//         <div
//           className={stringProcentage}
//           role="progressbar"
//           aria-valuenow={"75"}
//           aria-valuemin="0"
//           aria-valuemax="100"
//         ></div>
//       </div>
//     );
//   };
  
//   export default ProgressBar;

import { useState, useEffect } from "react";

const ProcentageCounter = (props) => {
    const [stringProcentage, setStringProcentage] = useState('');
    console.log("usloooooooooooooo")

    useEffect(() => {
        setStringProcentage('progress-bar progress-bar-striped bg-warning w-' + props.procentage);
        console.log(stringProcentage)
    }, [props.procentage]);

    return (
        <div className="progress">
            <div
                className='progress-bar progress-bar-striped bg-warning w-90'
                role="progressbar"
                aria-valuenow={props.procentage}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    );
};
export default ProcentageCounter;