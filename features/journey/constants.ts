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

export const chartData: {
  value: number;
  date: string;
}[] = [
  { date: "2025-01-01", value: 120 },
  { date: "2025-01-02", value: 122 },
  { date: "2025-01-03", value: 121 },
  { date: "2025-01-04", value: 124 },
  { date: "2025-01-05", value: 126 },
  { date: "2025-01-06", value: 125 },
  { date: "2025-01-07", value: 128 },
  { date: "2025-01-08", value: 130 },
  { date: "2025-01-09", value: 129 },
  { date: "2025-01-10", value: 133 },
  { date: "2025-01-11", value: 135 },
  { date: "2025-01-12", value: 138 },
  { date: "2025-01-13", value: 140 },
  { date: "2025-01-14", value: 142 },
];

export const milestones: {
  id: string;
  title: string;
  subtitle: string;
  status: string;
}[] = [
  {
    id: "1",
    title: "First ₹10L saved",
    subtitle: "Completed: 24th Jul 2025",
    status: "first",
  },
  {
    id: "2",
    title: "Reach ₹15L (Halfway)",
    subtitle: "Expected: Feb 2026",
    status: "second",
  },
  {
    id: "3",
    title: "Achieve ₹20L (Buffer)",
    subtitle: "Expected: Aug 2027",
    status: "third",
  },
  { id: "4", title: "Complete ₹30.5L", subtitle: "Expected: Jun 2029", status: "fourth" },
];
