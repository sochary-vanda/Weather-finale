import { FaCloudSun } from "react-icons/fa";

const ForecastCard = ({ day, temp, icon }) => {
  return (
    <div className="flex  items-center justify-center bg-white/10  p-2 gap-x-4 rounded-3xl  py-3 flex-wrap">
        <div>
             <p>{day}</p>
             <p>{temp}</p>
        </div>
     
       <img src={icon} alt="" className="w-12 h-12" />
      
    </div>
  );
};

export default ForecastCard;
