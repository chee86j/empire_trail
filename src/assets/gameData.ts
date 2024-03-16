export interface Event {
  type: "Very Good" | "Good" | "Neutral" | "Bad" | "Very Bad";
  description: string;
  bankBalanceChange: number;
  professionProbabilities?: {
    [profession: string]: number;
  };
}

export const events: Event[] = [
  {
    type: "Very Good",
    description:
      "You found a perfect tenant that can pay you a 6 months in advance.",
    bankBalanceChange: 18000,
    professionProbabilities: {
      Carpenter: 5,
      Banker: 10,
      Realtor: 10,
      Plumber: 5,
      Electrician: 5,
      Accountant: 5,
    },
  },
  {
    type: "Very Good",
    description:
      "Your property value increased due to booming market conditions. You are able to refinance and pull out $100,000 in phantom equity.",
    bankBalanceChange: 100000,
    professionProbabilities: {
      Carpenter: 8,
      Banker: 8,
      Realtor: 8,
      Plumber: 8,
      Electrician: 8,
      Accountant: 8,
    },
  },
  {
    type: "Very Good",
    description:
      "Based on your track record, the bank has pre-approved you for a $750,000 loan at a 3% interest rate. You can use this to purchase a new property.",
    bankBalanceChange: 75000,
    professionProbabilities: {
      Carpenter: 8,
      Banker: 8,
      Realtor: 8,
      Plumber: 8,
      Electrician: 8,
      Accountant: 8,
    },
  },
  {
    type: "Good",
    description:
      "You found a perfect tenant that can pay you 3 months in advance.",
    bankBalanceChange: 9000,
    professionProbabilities: {
      Carpenter: 10,
      Banker: 20,
      Realtor: 20,
      Plumber: 10,
      Electrician: 10,
      Accountant: 30,
    },
  },
  {
    type: "Good",
    description:
      "Your property value increased due to booming market conditions. You are able to refinance and pull out $50,000 in phantom equity.",
    bankBalanceChange: 50000,
    professionProbabilities: {
      Carpenter: 15,
      Banker: 15,
      Realtor: 15,
      Plumber: 15,
      Electrician: 15,
      Accountant: 15,
    },
  },
  {
    type: "Good",
    description:
      "During the Demolition Phase, you found a hidden treasure in the walls of the property.",
    bankBalanceChange: 50000,
    professionProbabilities: {
      Carpenter: 15,
      Banker: 15,
      Realtor: 15,
      Plumber: 15,
      Electrician: 15,
      Accountant: 15,
    },
  },
  {
    type: "Neutral",
    description:
      "Renovations are proceeding on schedule and on budget. No change to your bank balance.",
    bankBalanceChange: 0,
    professionProbabilities: {
      Carpenter: 50,
      Banker: 40,
      Realtor: 40,
      Plumber: 50,
      Electrician: 50,
      Accountant: 40,
    },
  },
  {
    type: "Neutral",
    description:
      "Inspections are on schedule and passing with flying colors. No change to your bank balance.",
    bankBalanceChange: 0,
    professionProbabilities: {
      Carpenter: 30,
      Banker: 20,
      Realtor: 20,
      Plumber: 30,
      Electrician: 30,
      Accountant: 20,
    },
  },
  {
    type: "Neutral",
    description:
      "Warm weather and clear skies. No change to your bank balance.",
    bankBalanceChange: 0,
    professionProbabilities: {
      Carpenter: 50,
      Banker: 40,
      Realtor: 40,
      Plumber: 50,
      Electrician: 50,
      Accountant: 40,
    },
  },
  {
    type: "Bad",
    description:
      "Your property experienced a decrease in value due to economic downturn. There are less buyer's interested in comparable properties in your area. You lost $15,000 in property value.",
    bankBalanceChange: -15000,
    professionProbabilities: {
      Carpenter: 10,
      Banker: 10,
      Realtor: 10,
      Plumber: 10,
      Electrician: 10,
      Accountant: 10,
    },
  },
  {
    type: "Bad",
    description:
      "Freezing weather has bursted one of the old uninsulated pipes. You have to pay $3,500 to repair the damage.",
    bankBalanceChange: -15000,
    professionProbabilities: {
      Carpenter: 20,
      Banker: 30,
      Realtor: 20,
      Plumber: 0,
      Electrician: 20,
      Accountant: 30,
    },
  },
  {
    type: "Bad",
    description:
      "Your roof started leaking and you found that there was multiple patch jobs. A new roof was required. You must pay $10,000 to repair the value.",
    bankBalanceChange: -15000,
    professionProbabilities: {
      Carpenter: 10,
      Banker: 10,
      Realtor: 10,
      Plumber: 10,
      Electrician: 10,
      Accountant: 10,
    },
  },
  {
    type: "Very Bad",
    description:
      "Your property was damaged in a flood from heavy rain last night. You did not have flood insurance. You must pay $30,000 to repair the damage.",
    bankBalanceChange: -30000,
    professionProbabilities: {
      Carpenter: 3,
      Banker: 3,
      Realtor: 3,
      Plumber: 2,
      Electrician: 3,
      Accountant: 3,
    },
  },
  {
    type: "Very Bad",
    description:
      "An uninsured drunk driver crashed into one of your properties, and the damage was extensive. You must pay $30,000 to repair the damage.",
    bankBalanceChange: -30000,
    professionProbabilities: {
      Carpenter: 5,
      Banker: 5,
      Realtor: 5,
      Plumber: 5,
      Electrician: 5,
      Accountant: 5,
    },
  },
  {
    type: "Very Bad",
    description:
      "A corrupt city official has condemned one of your properties and you must pay $20,000 for attorney fees to fight.",
    bankBalanceChange: -20000,
    professionProbabilities: {
      Carpenter: 5,
      Banker: 5,
      Realtor: 5,
      Plumber: 5,
      Electrician: 5,
      Accountant: 5,
    },
  },
];
