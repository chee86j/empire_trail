export interface Event {
  type: "Very Good" | "Good" | "Neutral" | "Bad" | "Very Bad";
  description: string;
  bankBalanceChange: number;
  professionProbabilities?: {
    [profession: string]: number;
  };
}

export interface InvestmentProperty {
  id: string;
  name: string;
  purchaseCost: number;
  closingCost: number;
  renovationCost: number;
  renovationTime: number;
  arvRentalIncome: number;
  monthlyExpenses: number;
  arvSalePrice: number;
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
      Carpenter: 70,
      Banker: 60,
      Realtor: 60,
      Plumber: 70,
      Electrician: 70,
      Accountant: 60,
    },
  },
  {
    type: "Neutral",
    description:
      "Inspections are on schedule and passing with flying colors. No change to your bank balance.",
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
      "Warm weather and clear skies. No change to your bank balance.",
    bankBalanceChange: 0,
    professionProbabilities: {
      Carpenter: 80,
      Banker: 70,
      Realtor: 70,
      Plumber: 80,
      Electrician: 80,
      Accountant: 70,
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

export const investmentProperties: InvestmentProperty[] = [
  {
    id: "1",
    name: "Run-down Suburban Apartment",
    purchaseCost: 220000,
    closingCost: 15400,
    renovationCost: 80000,
    renovationTime: 8,
    arvRentalIncome: 2000,
    monthlyExpenses: 1800,
    arvSalePrice: 365000,
  },
  {
    id: "2",
    name: "Neglected Downtown Condo",
    purchaseCost: 180000,
    closingCost: 12600,
    renovationCost: 50000,
    renovationTime: 5,
    arvRentalIncome: 1500,
    monthlyExpenses: 1400,
    arvSalePrice: 275000,
  },
  {
    id: "3",
    name: "Worn-out Lakeside Cabin",
    purchaseCost: 240000,
    closingCost: 16800,
    renovationCost: 70000,
    renovationTime: 10,
    arvRentalIncome: 1800,
    monthlyExpenses: 1600,
    arvSalePrice: 380000,
  },
  {
    id: "4",
    name: "Outdated Urban Loft",
    purchaseCost: 200000,
    closingCost: 14000,
    renovationCost: 60000,
    renovationTime: 6,
    arvRentalIncome: 1700,
    monthlyExpenses: 1500,
    arvSalePrice: 325000,
  },
  {
    id: "5",
    name: "Dilapidated Suburban Duplex",
    purchaseCost: 170000,
    closingCost: 14700,
    renovationCost: 65000,
    renovationTime: 7,
    arvRentalIncome: 1900,
    monthlyExpenses: 1700,
    arvSalePrice: 345000,
  },

  {
    id: "6",
    name: "Basic Suburban Apartment",
    purchaseCost: 320000,
    closingCost: 22400,
    renovationCost: 90000,
    renovationTime: 7,
    arvRentalIncome: 2200,
    monthlyExpenses: 2000,
    arvSalePrice: 525000,
  },
  {
    id: "7",
    name: "Average Downtown House",
    purchaseCost: 350000,
    closingCost: 24500,
    renovationCost: 100000,
    renovationTime: 8,
    arvRentalIncome: 2400,
    monthlyExpenses: 2200,
    arvSalePrice: 575000,
  },
  {
    id: "8",
    name: "Standard Lakeside Cabin",
    purchaseCost: 380000,
    closingCost: 26600,
    renovationCost: 110000,
    renovationTime: 9,
    arvRentalIncome: 2500,
    monthlyExpenses: 2300,
    arvSalePrice: 625000,
  },
  {
    id: "9",
    name: "Ordinary Urban Condo",
    purchaseCost: 330000,
    closingCost: 23100,
    renovationCost: 95000,
    renovationTime: 7,
    arvRentalIncome: 2300,
    monthlyExpenses: 2100,
    arvSalePrice: 575000,
  },
  {
    id: "10",
    name: "Basic Suburban Duplex",
    purchaseCost: 310000,
    closingCost: 21700,
    renovationCost: 85000,
    renovationTime: 6,
    arvRentalIncome: 2100,
    monthlyExpenses: 1900,
    arvSalePrice: 550000,
  },

  {
    id: "11",
    name: "Modern Suburban Apartment Complex",
    purchaseCost: 450000,
    closingCost: 31500,
    renovationCost: 130000,
    renovationTime: 8,
    arvRentalIncome: 2800,
    monthlyExpenses: 2600,
    arvSalePrice: 775000,
  },
  {
    id: "12",
    name: "Refurbished Downtown Brownstone",
    purchaseCost: 480000,
    closingCost: 33600,
    renovationCost: 140000,
    renovationTime: 9,
    arvRentalIncome: 3000,
    monthlyExpenses: 2800,
    arvSalePrice: 825000,
  },
  {
    id: "13",
    name: "Rejuvenated Lakeside Cottage",
    purchaseCost: 520000,
    closingCost: 36400,
    renovationCost: 150000,
    renovationTime: 10,
    arvRentalIncome: 3200,
    monthlyExpenses: 3000,
    arvSalePrice: 875000,
  },
  {
    id: "14",
    name: "Revitalized Suburban Duplex",
    purchaseCost: 490000,
    closingCost: 34300,
    renovationCost: 135000,
    renovationTime: 7,
    arvRentalIncome: 2900,
    monthlyExpenses: 2700,
    arvSalePrice: 800000,
  },
  {
    id: "15",
    name: "Renovated Urban Loft",
    purchaseCost: 460000,
    closingCost: 32200,
    renovationCost: 120000,
    renovationTime: 6,
    arvRentalIncome: 2700,
    monthlyExpenses: 2500,
    arvSalePrice: 775000,
  },

  {
    id: "16",
    name: "Modern Townhome",
    purchaseCost: 550000,
    closingCost: 38500,
    renovationCost: 150000,
    renovationTime: 9,
    arvRentalIncome: 3200,
    monthlyExpenses: 2800,
    arvSalePrice: 850000,
  },
  {
    id: "17",
    name: "Luxury Penthouse",
    purchaseCost: 650000,
    closingCost: 45500,
    renovationCost: 180000,
    renovationTime: 11,
    arvRentalIncome: 3500,
    monthlyExpenses: 3200,
    arvSalePrice: 1000000,
  },
  {
    id: "18",
    name: "Upscale Lakeside Home",
    purchaseCost: 700000,
    closingCost: 49000,
    renovationCost: 200000,
    renovationTime: 12,
    arvRentalIncome: 3800,
    monthlyExpenses: 3500,
    arvSalePrice: 1100000,
  },
  {
    id: "19",
    name: "Modern Japanese Style Residence",
    purchaseCost: 600000,
    closingCost: 42000,
    renovationCost: 170000,
    renovationTime: 10,
    arvRentalIncome: 3300,
    monthlyExpenses: 3000,
    arvSalePrice: 950000,
  },
  {
    id: "20",
    name: "Scandinavian Style Home with Pool",
    purchaseCost: 580000,
    closingCost: 40600,
    renovationCost: 160000,
    renovationTime: 9,
    arvRentalIncome: 3100,
    monthlyExpenses: 2900,
    arvSalePrice: 900000,
  },

  {
    id: "21",
    name: "Luxury Lakeside Mansion",
    purchaseCost: 800000,
    closingCost: 56000,
    renovationCost: 250000,
    renovationTime: 12,
    arvRentalIncome: 4500,
    monthlyExpenses: 4000,
    arvSalePrice: 1500000,
  },
  {
    id: "22",
    name: "Abandoned Downtown Estate",
    purchaseCost: 900000,
    closingCost: 63000,
    renovationCost: 300000,
    renovationTime: 14,
    arvRentalIncome: 5000,
    monthlyExpenses: 4500,
    arvSalePrice: 1700000,
  },
  {
    id: "23",
    name: "Palatial Suburban Residence",
    purchaseCost: 950000,
    closingCost: 66500,
    renovationCost: 320000,
    renovationTime: 15,
    arvRentalIncome: 5500,
    monthlyExpenses: 5000,
    arvSalePrice: 1580000,
  },
  {
    id: "24",
    name: "Outdated Duplex w/ Garden",
    purchaseCost: 550000,
    closingCost: 59500,
    renovationCost: 280000,
    renovationTime: 13,
    arvRentalIncome: 4800,
    monthlyExpenses: 4300,
    arvSalePrice: 1200000,
  },
  {
    id: "25",
    name: "Classic Urban Mansion",
    purchaseCost: 870000,
    closingCost: 60900,
    renovationCost: 290000,
    renovationTime: 14,
    arvRentalIncome: 5100,
    monthlyExpenses: 4600,
    arvSalePrice: 1500000,
  },

  {
    id: "26",
    name: "Neglected Downtown Apartment",
    purchaseCost: 350000,
    closingCost: 24500,
    renovationCost: 100000,
    renovationTime: 8,
    arvRentalIncome: 1500,
    monthlyExpenses: 1400,
    arvSalePrice: 560000,
  },
  {
    id: "27",
    name: "Worn-out Suburban House",
    purchaseCost: 400000,
    closingCost: 28000,
    renovationCost: 120000,
    renovationTime: 9,
    arvRentalIncome: 1600,
    monthlyExpenses: 1500,
    arvSalePrice: 490000,
  },
  {
    id: "28",
    name: "Dilapidated Lakeside Villa",
    purchaseCost: 450000,
    closingCost: 31500,
    renovationCost: 140000,
    renovationTime: 10,
    arvRentalIncome: 1700,
    monthlyExpenses: 1600,
    arvSalePrice: 400000,
  },
  {
    id: "29",
    name: "Outdated Townhome",
    purchaseCost: 380000,
    closingCost: 26600,
    renovationCost: 110000,
    renovationTime: 7,
    arvRentalIncome: 1400,
    monthlyExpenses: 1300,
    arvSalePrice: 430000,
  },
  {
    id: "30",
    name: "Run-down Suburban Duplex",
    purchaseCost: 420000,
    closingCost: 29400,
    renovationCost: 30000,
    renovationTime: 8,
    arvRentalIncome: 1800,
    monthlyExpenses: 1700,
    arvSalePrice: 380000,
  },

  {
    id: "31",
    name: "Basic Urban Condo",
    purchaseCost: 500000,
    closingCost: 35000,
    renovationCost: 150000,
    renovationTime: 10,
    arvRentalIncome: 2300,
    monthlyExpenses: 2100,
    arvSalePrice: 550000,
  },
  {
    id: "32",
    name: "Average Suburban Home",
    purchaseCost: 550000,
    closingCost: 38500,
    renovationCost: 170000,
    renovationTime: 11,
    arvRentalIncome: 2500,
    monthlyExpenses: 2300,
    arvSalePrice: 600000,
  },
  {
    id: "33",
    name: "Standard Lakeside House",
    purchaseCost: 600000,
    closingCost: 42000,
    renovationCost: 190000,
    renovationTime: 12,
    arvRentalIncome: 2700,
    monthlyExpenses: 2500,
    arvSalePrice: 650000,
  },
  {
    id: "34",
    name: "Plain Downtown Loft",
    purchaseCost: 480000,
    closingCost: 33600,
    renovationCost: 140000,
    renovationTime: 9,
    arvRentalIncome: 2200,
    monthlyExpenses: 2000,
    arvSalePrice: 530000,
  },
  {
    id: "35",
    name: "Average Suburban Duplex",
    purchaseCost: 520000,
    closingCost: 36400,
    renovationCost: 160000,
    renovationTime: 10,
    arvRentalIncome: 2400,
    monthlyExpenses: 2200,
    arvSalePrice: 580000,
  },

  {
    id: "36",
    name: "Renovated Urban Apartment",
    purchaseCost: 650000,
    closingCost: 45500,
    renovationCost: 200000,
    renovationTime: 11,
    arvRentalIncome: 3000,
    monthlyExpenses: 2800,
    arvSalePrice: 720000,
  },
  {
    id: "37",
    name: "Refurbished Suburban House",
    purchaseCost: 700000,
    closingCost: 49000,
    renovationCost: 230000,
    renovationTime: 12,
    arvRentalIncome: 3200,
    monthlyExpenses: 3000,
    arvSalePrice: 770000,
  },
  {
    id: "38",
    name: "Rehabilitated Lakeside Villa",
    purchaseCost: 750000,
    closingCost: 52500,
    renovationCost: 260000,
    renovationTime: 13,
    arvRentalIncome: 3400,
    monthlyExpenses: 3200,
    arvSalePrice: 820000,
  },
  {
    id: "39",
    name: "Revamped Downtown Loft",
    purchaseCost: 600000,
    closingCost: 42000,
    renovationCost: 190000,
    renovationTime: 10,
    arvRentalIncome: 2800,
    monthlyExpenses: 2600,
    arvSalePrice: 680000,
  },
  {
    id: "40",
    name: "Modern Suburban Duplex",
    purchaseCost: 620000,
    closingCost: 43400,
    renovationCost: 210000,
    renovationTime: 11,
    arvRentalIncome: 3000,
    monthlyExpenses: 2800,
    arvSalePrice: 700000,
  },

  {
    id: "41",
    name: "Luxury Lakeside Retreat",
    purchaseCost: 900000,
    closingCost: 63000,
    renovationCost: 300000,
    renovationTime: 14,
    arvRentalIncome: 4000,
    monthlyExpenses: 3600,
    arvSalePrice: 1300000,
  },
  {
    id: "42",
    name: "Exquisite Downtown Mansion",
    purchaseCost: 950000,
    closingCost: 66500,
    renovationCost: 320000,
    renovationTime: 15,
    arvRentalIncome: 4200,
    monthlyExpenses: 3800,
    arvSalePrice: 1400000,
  },
  {
    id: "43",
    name: "Luxurious Suburban Estate",
    purchaseCost: 1000000,
    closingCost: 70000,
    renovationCost: 350000,
    renovationTime: 16,
    arvRentalIncome: 4400,
    monthlyExpenses: 4000,
    arvSalePrice: 1500000,
  },
  {
    id: "44",
    name: "Elegant Urban Brownstone",
    purchaseCost: 800000,
    closingCost: 56000,
    renovationCost: 270000,
    renovationTime: 13,
    arvRentalIncome: 3800,
    monthlyExpenses: 3400,
    arvSalePrice: 1100000,
  },
  {
    id: "45",
    name: "Chic Suburban Bungalow",
    purchaseCost: 750000,
    closingCost: 59500,
    renovationCost: 290000,
    renovationTime: 14,
    arvRentalIncome: 4000,
    monthlyExpenses: 3600,
    arvSalePrice: 1200000,
  },

  {
    id: "46",
    name: "Grand Lakeside Mansion",
    purchaseCost: 1200000,
    closingCost: 84000,
    renovationCost: 400000,
    renovationTime: 17,
    arvRentalIncome: 6000,
    monthlyExpenses: 5200,
    arvSalePrice: 2000000,
  },
  {
    id: "47",
    name: "Majestic Urban Palace",
    purchaseCost: 1500000,
    closingCost: 105000,
    renovationCost: 500000,
    renovationTime: 20,
    arvRentalIncome: 7000,
    monthlyExpenses: 6000,
    arvSalePrice: 2500000,
  },
  {
    id: "48",
    name: "Sumptuous Suburban Manor",
    purchaseCost: 1600000,
    closingCost: 112000,
    renovationCost: 550000,
    renovationTime: 22,
    arvRentalIncome: 8000,
    monthlyExpenses: 7000,
    arvSalePrice: 2700000,
  },
  {
    id: "49",
    name: "Regal Downtown Castle",
    purchaseCost: 1800000,
    closingCost: 126000,
    renovationCost: 600000,
    renovationTime: 25,
    arvRentalIncome: 9000,
    monthlyExpenses: 8000,
    arvSalePrice: 3000000,
  },
  {
    id: "50",
    name: "Opulent Lakeside Estate",
    purchaseCost: 1400000,
    closingCost: 98000,
    renovationCost: 450000,
    renovationTime: 18,
    arvRentalIncome: 6500,
    monthlyExpenses: 5500,
    arvSalePrice: 2200000,
  },

  {
    id: "51",
    name: "Extravagant Suburban Mansion",
    purchaseCost: 850000,
    closingCost: 42500,
    renovationCost: 320000,
    renovationTime: 21,
    arvRentalIncome: 5200,
    monthlyExpenses: 4700,
    arvSalePrice: 900000,
  },
  {
    id: "52",
    name: "Luxurious Lakeside Estate",
    purchaseCost: 900000,
    closingCost: 45000,
    renovationCost: 350000,
    renovationTime: 22,
    arvRentalIncome: 5400,
    monthlyExpenses: 4900,
    arvSalePrice: 950000,
  },
  {
    id: "53",
    name: "Downtown Luxury Condo",
    purchaseCost: 780000,
    closingCost: 39000,
    renovationCost: 290000,
    renovationTime: 19,
    arvRentalIncome: 4800,
    monthlyExpenses: 4300,
    arvSalePrice: 830000,
  },
  {
    id: "54",
    name: "Suburban Luxury Villa",
    purchaseCost: 820000,
    closingCost: 41000,
    renovationCost: 310000,
    renovationTime: 20,
    arvRentalIncome: 5000,
    monthlyExpenses: 4500,
    arvSalePrice: 870000,
  },
  {
    id: "55",
    name: "Lakeside Luxury Mansion",
    purchaseCost: 870000,
    closingCost: 43500,
    renovationCost: 330000,
    renovationTime: 21,
    arvRentalIncome: 5200,
    monthlyExpenses: 4700,
    arvSalePrice: 920000,
  },
  {
    id: "56",
    name: "Urban Grand Penthouse",
    purchaseCost: 760000,
    closingCost: 38000,
    renovationCost: 280000,
    renovationTime: 18,
    arvRentalIncome: 4600,
    monthlyExpenses: 4100,
    arvSalePrice: 810000,
  },
  {
    id: "57",
    name: "Suburban Grand Mansion",
    purchaseCost: 800000,
    closingCost: 40000,
    renovationCost: 300000,
    renovationTime: 20,
    arvRentalIncome: 5000,
    monthlyExpenses: 4500,
    arvSalePrice: 850000,
  },
  {
    id: "58",
    name: "Lakeside Grand Estate",
    purchaseCost: 850000,
    closingCost: 42500,
    renovationCost: 320000,
    renovationTime: 21,
    arvRentalIncome: 5200,
    monthlyExpenses: 4700,
    arvSalePrice: 900000,
  },
  {
    id: "59",
    name: "Downtown Grand Condo",
    purchaseCost: 740000,
    closingCost: 37000,
    renovationCost: 270000,
    renovationTime: 18,
    arvRentalIncome: 4800,
    monthlyExpenses: 4300,
    arvSalePrice: 790000,
  },

  {
    id: "60",
    name: "Elite Urban Penthouse",
    purchaseCost: 1000000,
    closingCost: 50000,
    renovationCost: 400000,
    renovationTime: 25,
    arvRentalIncome: 7000,
    monthlyExpenses: 6000,
    arvSalePrice: 1100000,
  },
  {
    id: "61",
    name: "Majestic Suburban Mansion",
    purchaseCost: 1050000,
    closingCost: 52500,
    renovationCost: 420000,
    renovationTime: 26,
    arvRentalIncome: 7200,
    monthlyExpenses: 6200,
    arvSalePrice: 1150000,
  },
  {
    id: "62",
    name: "Palatial Lakeside Estate",
    purchaseCost: 1100000,
    closingCost: 55000,
    renovationCost: 440000,
    renovationTime: 27,
    arvRentalIncome: 7400,
    monthlyExpenses: 6400,
    arvSalePrice: 2205000,
  },
  {
    id: "63",
    name: "Elite Downtown Condo",
    purchaseCost: 960000,
    closingCost: 48000,
    renovationCost: 380000,
    renovationTime: 24,
    arvRentalIncome: 6800,
    monthlyExpenses: 5800,
    arvSalePrice: 1060000,
  },
  {
    id: "64",
    name: "Grand Suburban Mansion",
    purchaseCost: 1000000,
    closingCost: 50000,
    renovationCost: 400000,
    renovationTime: 25,
    arvRentalIncome: 7000,
    monthlyExpenses: 6000,
    arvSalePrice: 1100000,
  },
  {
    id: "65",
    name: "Majestic Lakeside Palace",
    purchaseCost: 1050000,
    closingCost: 52500,
    renovationCost: 420000,
    renovationTime: 26,
    arvRentalIncome: 7200,
    monthlyExpenses: 6200,
    arvSalePrice: 1150000,
  },
  {
    id: "66",
    name: "Elite Urban Penthouse",
    purchaseCost: 1000000,
    closingCost: 50000,
    renovationCost: 400000,
    renovationTime: 25,
    arvRentalIncome: 7000,
    monthlyExpenses: 6000,
    arvSalePrice: 1100000,
  },
  {
    id: "67",
    name: "Majestic Suburban Mansion",
    purchaseCost: 1050000,
    closingCost: 52500,
    renovationCost: 420000,
    renovationTime: 26,
    arvRentalIncome: 7200,
    monthlyExpenses: 6200,
    arvSalePrice: 1150000,
  },
  {
    id: "68",
    name: "Palatial Lakeside Estate",
    purchaseCost: 1100000,
    closingCost: 55000,
    renovationCost: 440000,
    renovationTime: 27,
    arvRentalIncome: 7400,
    monthlyExpenses: 6400,
    arvSalePrice: 1200000,
  },
  {
    id: "69",
    name: "Elite Downtown Condo",
    purchaseCost: 960000,
    closingCost: 48000,
    renovationCost: 380000,
    renovationTime: 24,
    arvRentalIncome: 6800,
    monthlyExpenses: 5800,
    arvSalePrice: 1060000,
  },
  {
    id: "70",
    name: "Luxury Downtown Penthouse",
    purchaseCost: 960000,
    closingCost: 48000,
    renovationCost: 380000,
    renovationTime: 24,
    arvRentalIncome: 6800,
    monthlyExpenses: 5800,
    arvSalePrice: 1260000,
  },

  {
    id: "71",
    name: "Uptown Apartment",
    purchaseCost: 180000,
    closingCost: 9000,
    renovationCost: 75000,
    renovationTime: 10,
    arvRentalIncome: 1800,
    monthlyExpenses: 1600,
    arvSalePrice: 200000,
  },
  {
    id: "72",
    name: "Downtown Duplex",
    purchaseCost: 200000,
    closingCost: 10000,
    renovationCost: 80000,
    renovationTime: 12,
    arvRentalIncome: 2000,
    monthlyExpenses: 1800,
    arvSalePrice: 220000,
  },
  {
    id: "73",
    name: "Suburbian Townhome",
    purchaseCost: 170000,
    closingCost: 8500,
    renovationCost: 70000,
    renovationTime: 9,
    arvRentalIncome: 1700,
    monthlyExpenses: 1500,
    arvSalePrice: 295000,
  },
  {
    id: "74",
    name: "Uptown Loft",
    purchaseCost: 190000,
    closingCost: 9500,
    renovationCost: 77000,
    renovationTime: 11,
    arvRentalIncome: 1900,
    monthlyExpenses: 1700,
    arvSalePrice: 210000,
  },
  {
    id: "75",
    name: "Downtown Studio",
    purchaseCost: 160000,
    closingCost: 8000,
    renovationCost: 65000,
    renovationTime: 9,
    arvRentalIncome: 1600,
    monthlyExpenses: 1400,
    arvSalePrice: 180000,
  },
  {
    id: "76",
    name: "Suburbian Condo",
    purchaseCost: 175000,
    closingCost: 8750,
    renovationCost: 72000,
    renovationTime: 10,
    arvRentalIncome: 1750,
    monthlyExpenses: 1550,
    arvSalePrice: 195000,
  },
  {
    id: "77",
    name: "Uptown Duplex",
    purchaseCost: 195000,
    closingCost: 9750,
    renovationCost: 37000,
    renovationTime: 12,
    arvRentalIncome: 1950,
    monthlyExpenses: 1750,
    arvSalePrice: 215000,
  },
  {
    id: "78",
    name: "Downtown Townhome",
    purchaseCost: 210000,
    closingCost: 10500,
    renovationCost: 84000,
    renovationTime: 13,
    arvRentalIncome: 2100,
    monthlyExpenses: 1900,
    arvSalePrice: 230000,
  },
  {
    id: "79",
    name: "Suburbian Apartment",
    purchaseCost: 170000,
    closingCost: 8500,
    renovationCost: 70000,
    renovationTime: 9,
    arvRentalIncome: 1700,
    monthlyExpenses: 1500,
    arvSalePrice: 190000,
  },

  {
    id: "80",
    name: "Suburbian Modern Townhome",
    purchaseCost: 300000,
    closingCost: 15000,
    renovationCost: 120000,
    renovationTime: 12,
    arvRentalIncome: 2400,
    monthlyExpenses: 2200,
    arvSalePrice: 320000,
  },
  {
    id: "81",
    name: "Uptown Luxury Condo",
    purchaseCost: 350000,
    closingCost: 17500,
    renovationCost: 140000,
    renovationTime: 14,
    arvRentalIncome: 2800,
    monthlyExpenses: 2600,
    arvSalePrice: 370000,
  },
  {
    id: "82",
    name: "Downtown Contemporary Duplex",
    purchaseCost: 400000,
    closingCost: 20000,
    renovationCost: 160000,
    renovationTime: 16,
    arvRentalIncome: 3200,
    monthlyExpenses: 3000,
    arvSalePrice: 420000,
  },
  {
    id: "83",
    name: "Suburbian Deluxe Home",
    purchaseCost: 320000,
    closingCost: 16000,
    renovationCost: 128000,
    renovationTime: 13,
    arvRentalIncome: 2560,
    monthlyExpenses: 2400,
    arvSalePrice: 340000,
  },
  {
    id: "84",
    name: "Uptown High-rise Apartment",
    purchaseCost: 380000,
    closingCost: 19000,
    renovationCost: 152000,
    renovationTime: 15,
    arvRentalIncome: 3040,
    monthlyExpenses: 2800,
    arvSalePrice: 400000,
  },
  {
    id: "85",
    name: "Downtown Luxury Penthouse",
    purchaseCost: 450000,
    closingCost: 22500,
    renovationCost: 180000,
    renovationTime: 18,
    arvRentalIncome: 3600,
    monthlyExpenses: 3400,
    arvSalePrice: 470000,
  },
  {
    id: "86",
    name: "Suburbian Executive House",
    purchaseCost: 330000,
    closingCost: 16500,
    renovationCost: 132000,
    renovationTime: 14,
    arvRentalIncome: 2640,
    monthlyExpenses: 2500,
    arvSalePrice: 350000,
  },
  {
    id: "87",
    name: "Uptown Modern Loft",
    purchaseCost: 370000,
    closingCost: 18500,
    renovationCost: 148000,
    renovationTime: 15,
    arvRentalIncome: 2960,
    monthlyExpenses: 2700,
    arvSalePrice: 390000,
  },
  {
    id: "88",
    name: "Downtown Contemporary Condo",
    purchaseCost: 420000,
    closingCost: 21000,
    renovationCost: 168000,
    renovationTime: 17,
    arvRentalIncome: 3360,
    monthlyExpenses: 3100,
    arvSalePrice: 440000,
  },
  {
    id: "89",
    name: "5BR Suburban Home",
    purchaseCost: 370000,
    closingCost: 18500,
    renovationCost: 148000,
    renovationTime: 15,
    arvRentalIncome: 2960,
    monthlyExpenses: 2700,
    arvSalePrice: 390000,
  },
  {
    id: "90",
    name: "Uptown 2BR Condo",
    purchaseCost: 420000,
    closingCost: 21000,
    renovationCost: 168000,
    renovationTime: 17,
    arvRentalIncome: 3360,
    monthlyExpenses: 3100,
    arvSalePrice: 540000,
  },
  {
    id: "91",
    name: "College 4BR/2BA Frat House",
    purchaseCost: 420000,
    closingCost: 21000,
    renovationCost: 168000,
    renovationTime: 17,
    arvRentalIncome: 3960,
    monthlyExpenses: 3100,
    arvSalePrice: 640000,
  },
  {
    id: "92",
    name: "4BR/3BA Modern House",
    purchaseCost: 420000,
    closingCost: 21000,
    renovationCost: 33000,
    renovationTime: 8,
    arvRentalIncome: 4000,
    monthlyExpenses: 3100,
    arvSalePrice: 520000,
  },
  {
    id: "93",
    name: "3BR/2BA Hoarder House",
    purchaseCost: 35000,
    closingCost: 7900,
    renovationCost: 33000,
    renovationTime: 8,
    arvRentalIncome: 4000,
    monthlyExpenses: 3100,
    arvSalePrice: 105000,
  },
  {
    id: "94",
    name: "Suburban 3BR/2BA Fixer Upper",
    purchaseCost: 135000,
    closingCost: 17900,
    renovationCost: 93000,
    renovationTime: 3,
    arvRentalIncome: 3300,
    monthlyExpenses: 3100,
    arvSalePrice: 280000,
  },
  {
    id: "95",
    name: "Downtown 2BR/2BA Mixed-Use",
    purchaseCost: 270000,
    closingCost: 10500,
    renovationCost: 186000,
    renovationTime: 5,
    arvRentalIncome: 3600,
    monthlyExpenses: 3100,
    arvSalePrice: 515000,
  },
  {
    id: "96",
    name: "Regal 7BR/4BA Estate",
    purchaseCost: 900000,
    closingCost: 27000,
    renovationCost: 186000,
    renovationTime: 6,
    arvRentalIncome: 6800,
    monthlyExpenses: 3100,
    arvSalePrice: 1527000,
  },
  {
    id: "97",
    name: "Minimalistic 4BR/2BA Lakehome",
    purchaseCost: 157000,
    closingCost: 37000,
    renovationCost: 186000,
    renovationTime: 6,
    arvRentalIncome: 6800,
    monthlyExpenses: 3100,
    arvSalePrice: 530000,
  },

  {
    id: "98",
    name: "3BR/2BA Frat House",
    purchaseCost: 35000,
    closingCost: 7900,
    renovationCost: 33000,
    renovationTime: 8,
    arvRentalIncome: 4000,
    monthlyExpenses: 3100,
    arvSalePrice: 105000,
  },
  {
    id: "99",
    name: "Uptown 3BR/2BA Duplx",
    purchaseCost: 135000,
    closingCost: 17900,
    renovationCost: 93000,
    renovationTime: 3,
    arvRentalIncome: 3300,
    monthlyExpenses: 3100,
    arvSalePrice: 280000,
  },
  {
    id: "100",
    name: "Palatial Mansion",
    purchaseCost: 2700000,
    closingCost: 80000,
    renovationCost: 486000,
    renovationTime: 5,
    arvRentalIncome: 3600,
    monthlyExpenses: 3100,
    arvSalePrice: 4300000,
  },
];
