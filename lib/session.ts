//  Define Session Data Structure of Entities and Configuration 

import { SessionOptions } from "iron-session"

export interface ProductCardProps {
  pid: string,
  image: string,
  title: string,
  price: number,
  qty: number,
}

export interface ProductCardListing {
  [productID: string] : ProductCardProps
}

export interface CardEntity {
  cardObject? : ProductCardListing
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'cart_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, //expired in 7 days
  }
}



