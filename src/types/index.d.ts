declare module '*.png';
declare module '*.webp';
declare module '*.jpeg';
declare module '*.jpg'
declare module '*.svg';
declare module '*.ico';
declare module "uuid";
declare module '@yext/rtf-converter'
declare module "react-modal"
declare module "react-geocode"
declare module "@splidejs/react-splide" {
    export const Splide: React.ComponentType<
      Partial<typeof import("@splidejs/react-splide")> & {
        className?: string;
        options?: any;
        id?:string;
      }
    >;
  
    export const SplideSlide: React.ComponentType<
      Partial<typeof import("@splidejs/react-splide")> & {
        className?: string;
      }
    >;
    export default Splide;
  }