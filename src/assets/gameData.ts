export interface Event {
  type: "Good" | "Neutral" | "Bad";
  description: string;
}

export const events: Event[] = [
  {
    type: "Good",
    description:
      "You found a perfect tenant that can pay you 3 months in advance.",
  },
  {
    type: "Good",
    description:
      "Your property value increased due to booming market conditions.",
  },
  {
    type: "Good",
    description: "You received a tax deduction for your property investments.",
  },
  {
    type: "Neutral",
    description:
      "You were unable to find a tenant that satisfied your requirements.",
  },
  {
    type: "Neutral",
    description: "Your property's rental income remained stable.",
  },
  {
    type: "Neutral",
    description:
      "You encountered minor maintenance issues, requiring regular upkeep.",
  },
  {
    type: "Bad",
    description:
      "You have encountered a setback, must pay $5,000, and have to wait an extra month for renovations to finish.",
  },
  {
    type: "Bad",
    description:
      "Your property experienced a decrease in value due to economic downturn.",
  },
  {
    type: "Bad",
    description: "You incurred unexpected expenses for property repairs.",
  },
  // Add more events as needed
];
