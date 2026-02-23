// Map property IDs to their full details
export const propertyDetailsMap: Record<string, {
  address: string;
  city: string;
  propertyType: "home" | "building";
}> = {
  "1": {
    address: "Holbækvej 37",
    city: "4000 Roskilde",
    propertyType: "home",
  },
  "2": {
    address: "Ny Østergade 15",
    city: "1101 København K",
    propertyType: "building",
  },
  "3": {
    address: "Strandvejen 214",
    city: "2900 Hellerup",
    propertyType: "home",
  },
  "4": {
    address: "Gammel Køge Landevej 79",
    city: "2500 Valby",
    propertyType: "home",
  },
  "6": {
    address: "Amagerbrogade 112",
    city: "2300 København S",
    propertyType: "home",
  },
  "7": {
    address: "Fabriksvej 19",
    city: "2650 Hvidovre",
    propertyType: "building",
  },
  "8": {
    address: "Smedeholm 14",
    city: "2730 Herlev",
    propertyType: "home",
  },
  // Search results properties
  "9": {
    address: "Holbækvej 37",
    city: "4000 Roskilde",
    propertyType: "home",
  },
  "10": {
    address: "Gammel Køge Landevej 245",
    city: "2500 Valby",
    propertyType: "home",
  },
  "11": {
    address: "Gammel Kalkbrænderi Vej 42",
    city: "2100 København O",
    propertyType: "building",
  },
  "12": {
    address: "Gammel Kystvej 88",
    city: "2770 Kastrup",
    propertyType: "home",
  },
  "13": {
    address: "Gammel Kirkestrade 14",
    city: "4000 Roskilde",
    propertyType: "building",
  },
  "14": {
    address: "Gammel Klostervej 6",
    city: "8000 Aarhus C",
    propertyType: "building",
  },
  "15": {
    address: "Gammel Kærvej 53",
    city: "9000 Aalborg",
    propertyType: "home",
  },
  "16": {
    address: "Gammel Kongevej 112",
    city: "1850 Frederiksberg C",
    propertyType: "home",
  },
  "17": {
    address: "Gammel Havnevej 23",
    city: "3000 Helsingør",
    propertyType: "building",
  },
  "18": {
    address: "Gammel Lundtoftevej 7",
    city: "2800 Kongens Lyngby",
    propertyType: "home",
  },
  "19": {
    address: "Gammel Strandvej 156",
    city: "2900 Hellerup",
    propertyType: "building",
  },
  "20": {
    address: "Gammel Mølle Allé 31",
    city: "2610 Rødovre",
    propertyType: "home",
  },
};

export function getPropertyDetails(propertyId: string) {
  return propertyDetailsMap[propertyId] || null;
}
