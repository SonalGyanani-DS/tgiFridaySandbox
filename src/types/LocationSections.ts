import { AddressType, ComplexImage } from "./search/locations";

export interface Ctas {
  link: string;
  label: string;
  cTAslinkType?: string;
  linkType?: string;
  tagName?:string;
}

export interface Services {
  cTA: Ctas;
  logo: { url: string };
}

export interface LocationService {
  c_serviceHeading: string;
  c_locationsService: [];
}

export interface Faqs {
  faqs: [];
  c_viewMoreFAQs: [];
}

export interface RewardElements {
  image: { url: string; alternateText: string };
  cTAs: Ctas;
  heading: string;
  description: [];
  cTAslinkType: string;
}
export interface RewardSectionType {
  c_rewardSection: RewardElements;
}

export interface ItemImage {
  image : ComplexImage;
  title:string;
  cTA:Ctas
}
export interface WhatHotSectionType {
  c_whatsHotItems: [];
  name: string;
  address:AddressType;
  c_viewDineInMenuCTA:Ctas;
}


export type Image = {
  url: string;
  alternateText: string;
}
export interface ChildMenusType {
  url: string;
  alternateText: string;
  heading: string;
  image?: Image;
  description?: string[];
  cTAs?: Ctas;
  cTAslinkType?: string;
}
export interface AboutTourStoreProps {
  c_aboutTheStoreDeals:[]
}

export interface AboutupdateItems{
  image?:{url:string | undefined} ;
  heading:string;
  description:string[];
  cTAs:Ctas
}

export interface AboutUpdate{
  c_aboutupdate:AboutupdateItems
}

export interface AccordianItemDataType {
  key:number;
  showDescription:string;
  fontWeightBold:string;
  ariaExpanded:boolean;
  background:string;
  item:{ question: string; answer: string; }
  index:number
  onClick: () => void;
}

export interface ItemsListDataType {
  title:string;
  list:[];
}
export interface AmenitiesDataType{
c_amenitiesHeading:string
c_amenitiesList:[]
}

export interface BannerDatatype {
  name:string;
  c_orderNow?:Ctas
  c_bannerImage?:string
}

export interface placeData {
  googleReviewUrl: string;
  reviewSectionHeading: string;
  googleReviewsHeading: string;
  placeData: any;
}
