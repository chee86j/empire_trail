import React from "react";

interface Props {
  onSelectProfession: (profession: string) => void;
}

const PlayerSelectScreen: React.FC<Props> = ({ onSelectProfession }) => {
  const professions = [
    "Carpenter",
    "Banker",
    "Realtor",
    "Plumber",
    "Electrician",
    "Accountant",
  ];

  return (
    <div className="screen">
      <h2>Select Your Profession</h2>
      <ul>
        {professions.map((profession, index) => (
          <li key={index} onClick={() => onSelectProfession(profession)}>
            {profession}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerSelectScreen;
