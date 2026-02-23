export interface PropertyItem {
  id: string;
  icon: string;
  iconColor: "category-1" | "category-2" | "category-3" | "success" | "error" | "warning" | "info" | "gray-1" | "gray-2" | "gray-3";
  text: string;
  supportingText: string;
  units?: number;
  area?: number;
}

export const recentProperties: PropertyItem[] = [
  {
    id: "1",
    icon: "home",
    iconColor: "category-1",
    text: "Holbækvej 37, 4000 Roskilde",
    supportingText: "",
    units: 7,
    area: 682,
  },
  {
    id: "2",
    icon: "building",
    iconColor: "success",
    text: "Ny Østergade 15, 1101 København K",
    supportingText: "",
    units: 12,
    area: 1245,
  },
  {
    id: "3",
    icon: "home",
    iconColor: "category-1",
    text: "Strandvejen 214, 2900 Hellerup",
    supportingText: "",
    units: 4,
    area: 510,
  },
  {
    id: "4",
    icon: "home",
    iconColor: "category-1",
    text: "Gammel Køge Landevej 79, 2500 Valby",
    supportingText: "",
    units: 2,
    area: 245,
  },
];

export const savedProperties: PropertyItem[] = [
  {
    id: "6",
    icon: "home",
    iconColor: "category-1",
    text: "Amagerbrogade 112, 2300 København S",
    supportingText: "",
    units: 4,
    area: 682,
  },
  {
    id: "7",
    icon: "building",
    iconColor: "success",
    text: "Fabriksvej 19, 2650 Hvidovre",
    supportingText: "",
    units: 12,
    area: 1380,
  },
  {
    id: "8",
    icon: "home",
    iconColor: "category-1",
    text: "Smedeholm 14, 2730 Herlev",
    supportingText: "",
    units: 3,
    area: 310,
  },
];

export const emptySavedProperties: PropertyItem[] = [];

export const searchResults: PropertyItem[] = [
  {
    id: "9",
    icon: "home",
    iconColor: "info",
    text: "Holbækvej 37, 4000 Roskilde",
    supportingText: "",
  },
  {
    id: "10",
    icon: "home",
    iconColor: "info",
    text: "Gammel Køge Landevej 245, 2500 Valby",
    supportingText: "",
  },
  {
    id: "11",
    icon: "building",
    iconColor: "success",
    text: "Gammel Kalkbrænderi Vej 42, 2100 København O",
    supportingText: "",
  },
  {
    id: "12",
    icon: "home",
    iconColor: "info",
    text: "Gammel Kystvej 88, 2770 Kastrup",
    supportingText: "",
  },
  {
    id: "13",
    icon: "building",
    iconColor: "success",
    text: "Gammel Kirkestrade 14, 4000 Roskilde",
    supportingText: "",
  },
  {
    id: "14",
    icon: "building",
    iconColor: "success",
    text: "Gammel Klostervej 6, 8000 Aarhus C",
    supportingText: "",
  },
  {
    id: "15",
    icon: "home",
    iconColor: "info",
    text: "Gammel Kærvej 53, 9000 Aalborg",
    supportingText: "",
  },
  {
    id: "16",
    icon: "home",
    iconColor: "info",
    text: "Gammel Kongevej 112, 1850 Frederiksberg C",
    supportingText: "",
  },
  {
    id: "17",
    icon: "building",
    iconColor: "success",
    text: "Gammel Havnevej 23, 3000 Helsingør",
    supportingText: "",
  },
  {
    id: "18",
    icon: "home",
    iconColor: "info",
    text: "Gammel Lundtoftevej 7, 2800 Kongens Lyngby",
    supportingText: "",
  },
  {
    id: "19",
    icon: "building",
    iconColor: "success",
    text: "Gammel Strandvej 156, 2900 Hellerup",
    supportingText: "",
  },
  {
    id: "20",
    icon: "home",
    iconColor: "info",
    text: "Gammel Mølle Allé 31, 2610 Rødovre",
    supportingText: "",
  },
];

export const emptySearchResults: PropertyItem[] = [];

// Helper function to get all properties by ID
export function getPropertyById(id: string): PropertyItem | undefined {
  const allProperties = [
    ...recentProperties,
    ...savedProperties,
    ...searchResults,
  ];
  return allProperties.find(prop => prop.id === id);
}
