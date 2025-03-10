import React from "react";
import { Oval } from "react-loader-spinner";

interface CardDataStatsProps {
  title: string;
  total: number;
  color?: string;
  isLoading?: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  color,
  isLoading,
}) => {
  return (
    <div
      className={`w-full ${color} grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg`}
    >
      <div className={`w-[200px] h-32 px-3 py-5 `}>
        <h3 className="text-white text-md">{title}</h3>
        {isLoading ? (
          <Oval
            height="30"
            width="30"
            color="white"
            ariaLabel="loading"
            wrapperClass="pt-5"
          />
        ) : (
          <p className="text-5xl text-white font-semibold pt-1">{total}</p>
        )}
      </div>
    </div>
  );
};

export default CardDataStats;
