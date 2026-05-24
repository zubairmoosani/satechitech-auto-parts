import { StaticImageData } from "next/image";

export type NearbyPlaceType = {
  image: StaticImageData;
  name: string;
  travelTime: string;
};

export type FeaturedHotelType = {
  location: string;
  image: StaticImageData;
  name: string;
  price: number;
  ratings: number;
};
