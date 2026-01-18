import {
  JourneyHouse,
  JourneyEducation,
  JourneySavings,
  JourneyVehicle,
} from "ui/assets/illustrations";

type NewJourneyListItemType = {
  id: string;
  title: string;
  description: string;
  illustration: React.FC<any>;
}[];

export const newJourneyList: NewJourneyListItemType = [
  {
    id: "1",
    title: "Purchase a Home",
    description: "Save for your dream home.",
    illustration: JourneyHouse,
  },
  {
    id: "2",
    title: "Purchase a Car",
    description: "Save for your next vehicle purchase.",
    illustration: JourneyVehicle,
  },
  {
    id: "3",
    title: "Child's Education",
    description: "Secure your child's future.",
    illustration: JourneyEducation,
  },
  {
    id: "4",
    title: "Emergency Fund",
    description: "Build a safety net for unexpected expenses.",
    illustration: JourneySavings,
  },
];
