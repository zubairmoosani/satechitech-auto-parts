export type FlightDetailType = {
  time: string;
  date: string;
  tag: string;
  terminal: string;
  airportName: string;
};

export type RouteInfoType = {
  departure: FlightDetailType;
  arrival: FlightDetailType;
  travelDuration: string;
  flightChange?: string;
};

const flightRoutes: RouteInfoType[] = [
  {
    departure: {
      tag: "BOM",
      airportName: "Chhatrapati Shivaji International Airport",
      date: "Sun, 29 Jan 2023",
      terminal: "Terminal - 2, Gate - 25",
      time: "14:50",
    },
    arrival: {
      tag: "CDG",
      airportName: "Ch. De Gaulle, Paris, France",
      date: "Sun, 29 Jan 2023",
      terminal: "Terminal - 2E, Gate - 3",
      time: "11:50",
    },
    travelDuration: "9hr 50min",
    flightChange: "Change of planes: 3h 15m Layover in France",
  },
  {
    departure: {
      tag: "CDG",
      airportName: "Ch. De Gaulle, Paris, France",
      date: "Sun, 30 Jan 2023",
      terminal: "Terminal - 2E, Gate - 3",
      time: "2:50",
    },
    arrival: {
      tag: "JFK",
      airportName: "John F Kennedy Intl-NY",
      date: "Sun, 30 Jan 2023",
      terminal: "Terminal - 4, Gate - 08",
      time: "7:35",
    },
    travelDuration: "5hr 50min",
  },
];

export { flightRoutes };
