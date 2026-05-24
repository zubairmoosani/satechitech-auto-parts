import gallery11 from "@/assets/images/gallery/11.jpg";
import gallery14 from "@/assets/images/gallery/14.jpg";
import gallery15 from "@/assets/images/gallery/15.jpg";
import gallery16 from "@/assets/images/gallery/16.jpg";

import hotel1 from "@/assets/images/category/hotel/4by3/10.jpg";
import hotel2 from "@/assets/images/category/hotel/4by3/11.jpg";
import { StaticImageData } from "next/image";

export type HotelRoomType = {
  id: number;
  name: string;
  sqfeet: number;
  price: number;
  images: StaticImageData[];
};

const roomDetails: HotelRoomType[] = [
  {
    id: 1,
    name: "Deluxe Pool View with Breakfast",
    images: [hotel1, gallery11, gallery15, gallery14, gallery16],
    sqfeet: 315,
    price: 385,
  },
  {
    id: 2,
    name: "Deluxe Room",
    images: [hotel2, gallery11, gallery15, gallery14, gallery16],
    sqfeet: 458,
    price: 485,
  },
];

export { roomDetails };
