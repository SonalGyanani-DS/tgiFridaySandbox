import { CTA } from "@yext/pages/components";
import { Ctas, RewardElements } from "../LocationSections";

export interface Interval {
  start?: string;
  end?: string;
}

export interface DayHour {
  openIntervals?: Interval[];
  isClosed?: boolean;
  reopenDate?: string;
}

export interface Hours {
  monday?: DayHour;
  tuesday?: DayHour;
  wednesday?: DayHour;
  thursday?: DayHour;
  friday?: DayHour;
  saturday?: DayHour;
  sunday?: DayHour;
  reopenDate?: string;
}

export interface HoursDataType {
  monday?: DayHour;
  tuesday?: DayHour;
  wednesday?: DayHour;
  thursday?: DayHour;
  friday?: DayHour;
  saturday?: DayHour;
  sunday?: DayHour;
  reopenDate?: string;
}

export enum PickupAndDeliveryServices {
  IN_STORE_PICKUP = "In-Store Pickup",
  CURBSIDE_PICKUP = "Curbside Pickup",
  PICKUP_NOT_OFFERED = "Pickup Not Offered",
  DELIVERY = "Delivery",
  SAME_DAY_DELIVERY = "Same Day Delivery",
  NO_CONTACT_DELIVERY = "No-Contact Delivery",
  DELIVERY_NOT_OFFERED = "Delivery Not Offered",
}

export interface AddressType {
  line1?: string;
  line2?: string;
  line3?: string;
  subLocality?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  extraDescription?: string;
  countryCode?: string;
}

export interface ImageThumbnail {
  url: string;
  width?: number;
  height?: number;
  alternateText?:string;
}

export interface Image {
  url: string;
  width?: number;
  height?: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  [x: string]: any;
  image: Image;
  details?: string;
  description?: string;
  clickThroughUrl?: string;
}

export interface Coordinate {
  latitude?: number;
  longitude?: number;
  lat?: number;
  long?: number;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface FeaturedMessage {
  description?: string;
  url?: string;
}

export enum LocationType {
  LOCATION = "Location",
  HEALTHCARE_FACILITY = "Healthcare Facility",
  HEALTHCARE_PROFESSIONAL = "Healthcare Professional",
  ATM = "ATM",
  RESTAURANT = "Restaurant",
  HOTEL = "Hotel",
}

export interface MenuUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export interface OrderUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export type EntityType = {
  id: string;
};

export type TemplateMeta = {
  mode: "development" | "production";
};

export interface Meta {
  entityType: EntityType;
}

export type DirectoryParent = {
  id: string;
  slug: string;
  name: string;
  meta: Meta;
  dm_baseEntityCount: number;
}[];

export type DirectoryChildren = {
  slug: string;
  name: string;
  id: string;
  meta: Meta;
  address?: AddressType;
  hours?: any;
  mainPhone?: number;
  c_store_name?: string;
  c_get_directions_cta_text?: string;
  googlePlaceId?: string;
  c_viewDetailsCTAText?: string;
  yextDisplayCoordinate?: Coordinate;
  dm_baseEntityCount?: number;
  dm_directoryChildren?: DirectoryChildren;
}[];

export enum PaymentOptions {
  ALIPAY = "Alipay",
  AMERICANEXPRESS = "American Express",
  ANDROIDPAY = "Google Pay",
  APPLEPAY = "Apple Pay",
  ATM = "ATM",
  ATMQUICK = "ATM Quick",
  BACS = "BACS",
  BANCONTACT = "Bancontact",
  BANKDEPOSIT = "Bank Deposit",
  BANKPAY = "Bank Pay",
  BGO = "Bank/Giro Overschrijving",
  BITCOIN = "Bitcoin",
  Bar = "Bargeld",
  CARTASI = "CartaSi",
  CASH = "Cash",
  CCS = "CCS",
  CHECK = "Check",
  CONB = "Contactloos betalen",
  CVVV = "Cadeaubon/VVV bon",
  DEBITNOTE = "Debit Note",
  DINERSCLUB = "Diners Club",
  DIRECTDEBIT = "Direct Debit",
  DISCOVER = "Discover",
  ECKARTE = "Girokarte",
  ECOCHEQUE = "EcoCheque",
  EKENA = "E-kena",
  EMV = "Elektronische Maaltijdcheques",
  FINANCING = "Financing",
  GOPAY = "GoPay",
  HAYAKAKEN = "Hayakaken",
  HEBAG = "He-Bag",
  IBOD = "iBOD",
  ICCARDS = "IC Cards",
  ICOCA = "Icoca",
  ID = "iD",
  IDEAL = "iDeal",
  INCA = "Incasso",
  INVOICE = "Invoice",
  JCB = "JCB",
  JCoinPay = "J−Coin Pay",
  JKOPAY = "JKO Pay",
  KITACA = "Kitaca",
  KLA = "Klantenkaart",
  KLARNA = "Klarna",
  LINEPAY = "LINE Pay",
  MAESTRO = "Maestro",
  MANACA = "Manaca",
  MASTERCARD = "MasterCard",
  MIPAY = "Mi Pay",
  MONIZZE = "Monizze",
  MPAY = "MPay",
  Manuelle_Lastsch = "Manuelle Lastschrift",
  Merpay = "メルPay",
  NANACO = "nanaco",
  NEXI = "Nexi",
  NIMOCA = "Nimoca",
  OREM = "Onder Rembours",
  PASMO = "Pasmo",
  PAYBACKPAY = "Payback Pay",
  PAYBOX = "Paybox",
  PAYCONIQ = "Payconiq",
  PAYPAL = "PayPal",
  PAYPAY = "PayPay",
  PAYSEC = "PaySec",
  PIN = "PIN",
  POSTEPAY = "Postepay",
  QRCODE = "QR Code Payment",
  QUICPAY = "QUICPay",
  RAKUTENEDY = "Rakuten Edy",
  RAKUTENPAY = "楽天Pay",
  SAMSUNGPAY = "Samsung Pay",
  SODEXO = "Sodexo",
  SUGOCA = "Sugoca",
  SUICA = "Suica",
  SWISH = "Swish",
  TICKETRESTAURANT = "Ticket Restaurant",
  TOICA = "Toica",
  TRAVELERSCHECK = "Traveler's Check",
  TSCUBIC = "TS CUBIC",
  TWINT = "Twint",
  UNIONPAY = "China UnionPay",
  VEV = "Via een verzekering",
  VISA = "Visa",
  VISAELECTRON = "Visa Electron",
  VOB = "Vooruit betalen",
  VOUCHER = "Voucher",
  VPAY = "V PAY",
  WAON = "WAON",
  WECHATPAY = "WeChat Pay",
  WIRETRANSFER = "Wire Transfer",
  Yucho_Pay = "ゆうちょPay",
  ZELLE = "Zelle",
  AuPay = "auPay",
  DBarai = "d払い ",
  Überweisung = "Banküberweisung",
}

export enum PriceRange {
  UNSPECIFIED = "Unspecified",
  ONE = "$",
  TWO = "$$",
  THREE = "$$$",
  FOUR = "$$$$",
}

export interface ReservationUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export enum Presentation {
  BUTTON = "Button",
  LINK = "Link",
}

export interface UberLink {
  text?: string;
  presentation: Presentation;
}

export interface UberTripBranding {
  text: string;
  url: string;
  description: string;
}

export interface WebsiteUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export interface ComplexVideo {
  url: string;
  video?: string;
  description?: string;
}

export interface Location {
  googlePlaceId: string;
  c_googlePlaceId: string;
  c_specific_day: [] | undefined;
  c_orderNow: Ctas;
  c_directionUrl: string;
  c_directionLabel: string;
  c_waitlist: Ctas;
  accessHours?: Hours;
  blackOwnedBusiness?: boolean;
  brunchHours?: Hours;
  covid19InformationUrl?: string;
  covidMessaging?: string;
  deliveryHours?: Hours;
  dineInHours?: Hours;
  driveThroughHours?: Hours;
  fullyVaccinatedStaff?: boolean;
  geomodifier?: string;
  kitchenHours?: Hours;
  landingPageUrl?: string;
  linkedInUrl?: string;
  neighborhood?: string;
  nudgeEnabled?: boolean;
  onlineServiceHours?: Hours;
  phoneticName?: string;
  pickupAndDeliveryServices?: PickupAndDeliveryServices[];
  pickupHours?: Hours;
  proofOfVaccinationRequired?: boolean;
  reviewResponseConversationEnabled?: boolean;
  seniorHours?: Hours;
  slug?: string | undefined;
  takeoutHours?: Hours;
  what3WordsAddress?: string;
  additionalHoursText?: string;
  address: AddressType;
  addressHidden?: boolean;
  alternatePhone?: number;
  androidAppUrl?: string;
  associations?: string[];
  brands?: string[];
  description?: string;
  hours?: Hours;
  logo?: ComplexImage;
  name: string;
  cityCoordinate?: Coordinate;
  closed?: boolean;
  dm_directoryParents?: EntityReference[];
  c_featuredFAQs?: EntityReference[];
  displayCoordinate?: Coordinate;
  dropoffCoordinate?: Coordinate;
  emails?: string[];
  facebookEmail?: string;
  facebookPageUrl?: string;
  featuredMessage?: FeaturedMessage;
  photoGallery?: ComplexImage[];
  geocodedCoordinate?: Coordinate;
  instagramHandle?: string;
  iosAppUrl?: string;
  isoRegionCode?: string;
  keywords?: string[];
  languages?: string[];
  locationType?: LocationType;
  mainPhone?: number;
  menuUrl?: MenuUrl;
  mobilePhone?: number;
  orderUrl?: OrderUrl;
  paymentOptions?: PaymentOptions[];
  pickupCoordinate?: Coordinate;
  priceRange?: PriceRange;
  products?: string[];
  reservationUrl?: ReservationUrl;
  routableCoordinate?: Coordinate;
  services?: string[];
  shortName35?: string;
  shortName64?: string;
  specialities?: string[];
  id: string;
  reopenDate: string;
  timezone: string;
  twitterHandle?: string;
  uberClientId?: string;
  uberLink?: UberLink;
  uberTripBranding?: UberTripBranding;
  walkableCoordinate?: Coordinate;
  websiteUrl?: WebsiteUrl;
  yearEstablished?: number;
  yextDisplayCoordinate?: Coordinate;
  yextDropoffCoordinate?: Coordinate;
  yextPickupCoordinate?: Coordinate;
  yextRoutableCoordinate?: Coordinate;
  yextWalkableCoordinate?: Coordinate;
  videos?: ComplexVideo[];
  c_locationsService: [];
}

export interface Countrytemplate {
  id: string;
  uid: string;
  meta: string;
  name: string;
  slug: string;
  dm_directoryChildren: DirectoryChildren;
  dm_directoryParents: DirectoryParent;
  _site: SiteData;
}

export interface Statetemplate {
  id: string;
  uid: string;
  meta: string;
  name: string;
  slug: string;
  dm_directoryChildren: DirectoryChildren;
  dm_directoryParents: DirectoryParent;
  _site: SiteData;
}

export interface BannerImage {
  image: { url: string };
}
export interface CityTemplate {
  id: string;
  uid: string;
  meta: string;
  name: string;
  slug: string;
  dm_directoryChildren: DirectoryChildren;
  dm_directoryParents: DirectoryParent;
  _site: SiteData;
  c_banner_image?: BannerImage;
  c_bannerHeading?: string;
  dm_baseEntityCount: number;
}

export interface FourOhFourTemplate {
  _site: SiteData;
}

interface childMenus {
  url: string;
  alternateText: string;
  heading: string;
}
interface aboutStoreItems extends childMenus {
  image: childMenus;
  description: string[];
  cTAs: Ctas;
  cTAslinkType: string;
}

interface document extends aboutStoreItems {
  document: aboutStoreItems;
}

interface AboutupdateItems {
  image?: { url: string } | undefined;
  heading?: string;
  description?: string[];
  cTAs?: Ctas;
}

export interface AboutUpdate {
  c_aboutupdate: AboutupdateItems;
}

export interface LocationDocument {
  id: string;
  _site: SiteData;
  c_directionUrl: string;
  description: string;
  name: string;
  hours: any;
  address: AddressType;
  c_googlePlaceId: string;
  slug: string;
  mainPhone: number;
  yextDisplayCoordinate: Coordinate;
  dm_directoryParents: DirectoryParent;
  deliveryHours: Hours;
  c_store_name: string;
  c_store_info_heading: string;
  c_store_hours_heading: string;
  c_tagline: string;
  c_locationsService: [];
  c_banner_image: BannerImage;
  timezone: string;
  additionalHoursText: string;
  c_storeReview: string;
  googlePlaceId: string;
  c_serviceHeading: string;
  c_aboutupdate: AboutupdateItems;
  c_related_FAQs: [];
  c_viewMoreFAQs: [];
  c_onlineOrderAndReservationsTime: string;
  c_amenitiesHeading: string;
  c_specific_day: [] | undefined;
  c_aboutourstore: document;
  c_viewAllLocations: Ctas;
  c_reviewSectionHeading: string;
  c_googleReviewsHeading: string;
  c_nearbyStoreHeading: string;
  displayCoordinate: { longitude: number; latitude: number };
  cityCoordinate: [];
  c_orderNow: Ctas;
  c_waitlist: Ctas;
  c_googleReviewUrl: string;
  c_onlineOrderingAndReservations: any;
  c_amenitiesList: [];
  c_rewardSection: RewardElements;
  c_whatsHotItems: [];
  c_viewDineInMenuCTA: Ctas;
  c_aboutTheStoreDeals: [];
  c_eCLMenu: [];
  c_yelpWidget?:string;
  c_promotionImage:ComplexImage;
  c_promotionHeading:string;
  c_promotionTagline:string;
  c_promotionCTA:CTA;
}

type entityType = {
  id: string;
};
type meta = {
  entityType: entityType;
};
export interface ParentDirectoryType {
  meta: meta;
  slug: string;
}

export interface SiteData {
  address: AddressType;
  c_appLinks: [];
  c_bottomFooterLinks: [];
  c_cookieAcceptLabel: string;
  c_cookieText: string;
  c_drinkResponsiblyLogo: {
    description: string;
    details: string;
    image: ImageThumbnail;
  };
  c_footerDescription: string;
  c_footerLinks: [];
  c_footerLinks2: [];
  c_header_links: [];
  c_header_logo: { image: ImageThumbnail };
  c_locatorBannerImage: { image: ImageThumbnail };
  c_meta_description: string;
  c_meta_title: string;
  c_noResultFoundMessage: string;
  c_socialIcons: [];
  c_topHeaderLinks: [];
  id: string;
  mainPhone: number;
  meta: { entityType: { id: string; uid: number }; locale: string };
  name: string;
  uid: number;
}

export type SetCurrentActiveOpenCloseType = React.Dispatch<
  React.SetStateAction<null | string>
>;

export interface ContactUsDataType {
  additionalHoursText: undefined | string;
  address: AddressType;
  c_directionUrl: undefined | string;
  c_googlePlaceId: undefined | string;
  c_onlineOrderAndReservationsTime: string;
  c_onlineOrderingAndReservations: DayHour;
  c_orderNow: Ctas;
  c_specific_day: undefined | [];
  c_waitlist: Ctas;
  document: LocationDocument;
  hours: HoursDataType;
  latitude: number | undefined;
  longitude: number | undefined;
  phone: number;
  timezone: string;
  c_directionLabel?:string;
  ContactUsDataType?:string;
  c_yelpWidget?:string;
  deliveryHours?:[]
  }