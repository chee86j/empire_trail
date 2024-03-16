export interface Event {
  type: "Good" | "Neutral" | "Bad";
  description: string;
  professionProbabilities?: {
    [profession: string]: number; // Probability percentage for each profession
  };
}

export const events: Event[] = [
  {
    type: "Good",
    description:
      "You found a perfect tenant that can pay you 3 months in advance.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Good",
    description:
      "Your property value increased due to booming market conditions.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Good",
    description: "You received a tax deduction for your property investments.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Neutral",
    description:
      "You were unable to find a tenant that satisfied your requirements.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Neutral",
    description: "Your property's rental income remained stable.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Neutral",
    description:
      "You encountered minor maintenance issues, requiring regular upkeep.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Bad",
    description:
      "You have encountered a setback, must pay $5,000, and have to wait an extra month for renovations to finish.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Bad",
    description:
      "Your property experienced a decrease in value due to economic downturn.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  {
    type: "Bad",
    description: "You incurred unexpected expenses for property repairs.",
    professionProbabilities: {
      Carpenter: 30,
      Banker: 10,
      Realtor: 20,
      Plumber: 20,
      Electrician: 10,
    },
  },
  // Add more events as needed
];
