import { StaticImageData } from 'next/image'
import { type IconType } from 'react-icons'

export type StatisticType = {
  title: string
  state: string
  icon: IconType
  variant: string
}

export type HotelType = {
  name: string
  address: string
  image: StaticImageData
  price: number
}

export type RoomType = {
  name: string
  date: string
  image: StaticImageData
  status: string
}

export type ArrivalType = {
  name: string
  image: StaticImageData
  hotelInfo: string[]
}

export type ReviewType = {
  name: string
  image: StaticImageData
  rating: number
  review: number
}
