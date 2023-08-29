module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}",
     // New
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '740px',
      // => @media (min-width: 740px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'Dark-red': '#ad1e1f',
      'red': '#D31A21',
      'red-eb': '#eb0000',
      'light-red': '#FFCCCB',
      'gray-dark': '#111111',
      'gray-light': '#ececec',
      'button-light': '#F5F5F7',
      'border-light': '#B2B3B5',
      'seachbutton-bg':'#E8E8ED',
      'nav-link': '#747474',
      'nav-li-border': '#d7d7d7',
      'right-menu-b': '#ebebeb',
      'search-text': '#9c9c9c',
      'location-bg': '#F3F3F3',
      'home-icon-bg': '#E5E5E1',
      'address-bg': '#FBFBFD',
      'hours-bg': '#eeeeee',
      'light-grey': '#F8F8F8',
      'faq-border': '#cfcfcf',
      'text-light': '#3D3935',
      'cookies-link': '#d61a0c'
    },

    fontFamily: {
      'main-font': ['"Figtree", Helvetica, Arial, Lucida, sans-serif'],
    },

    extend: {
      backgroundImage: {
        shapet: "url('images/shape-t.svg')",
        shapeb: "url('images/shape-b.svg')",
        dots: "url('images/dots.svg')",
        newslettter_bg: "url('images/newsletter-bg.png')",
        plus_icon:"url('images/plus-sym.svg')",
        minus_icon:"url('images/minus-sym.svg')",
      },
    },
  },
  plugins: [
   
  ],
};