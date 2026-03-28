export type ProductCategory =
  | 'foundation'
  | 'concealer'
  | 'lipstick'
  | 'mascara'
  | 'eyeshadow'
  | 'blush'
  | 'bronzer'
  | 'skincare'
  | 'primer'
  | 'setting-spray';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  productCount: number;
  category: 'luxury' | 'drugstore' | 'indie' | 'clean';
  color: string;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  shades?: string[];
  whereToBuy: string[];
  gradientColors: [string, string];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  tags: string[];
  gradientColors: [string, string];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'beauty' | 'department' | 'pharmacy' | 'specialty';
  rating: number;
  brandIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  postCount: number;
  color: string;
}
