import React from "react";

interface Props {
  player: { profession: string; bankBalance: number; salary: number } | null;
  currentMonth: number;
  onPlayerAction: (action: string) => void;
  onViewPortfolio: () => void;
  onFindDeals: () => void;
}

const CityScreen: React.FC<Props> = ({
  player,
  currentMonth,
  onPlayerAction,
  onViewPortfolio,
  onFindDeals,
}) => {
  return (
    <div className="screen">
      <h2>City Name</h2>
      <p>Current Month: {currentMonth}</p>
      <p>
        Player Info: {player?.profession}, Bank Balance: ${player?.bankBalance}
      </p>
      <button onClick={() => onPlayerAction("travel")}>Travel</button>
      <button onClick={() => onPlayerAction("rest")}>Rest</button>
      <button onClick={onViewPortfolio}>View Portfolio</button>
      <button onClick={onFindDeals}>Find Deals</button>
    </div>
  );
};

export default CityScreen;
