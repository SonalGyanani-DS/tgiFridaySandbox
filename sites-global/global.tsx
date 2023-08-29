import favIcon from "../src/images/favicon.ico";
export const stagingBaseurl = "https://locations.tgifridays.com/";
export const cookieText = "This website uses cookies to ensure you get the best experience on our website.";
export const cookiesUrl = "";
export const siteURL = "https://tgifridays.com";
export const googleApikey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const geoSearchEndpoint = "https://liveapi.yext.com/v2/accounts/me/entities/geosearch";
export const yextApiKey = "92323e23b53e47a6b5c1449782ed7b2c";
export const AnalyticsEnableDebugging = true;
export const AnalyticsEnableTrackingCookie = true;
export const favicon = favIcon; //"https://locations.tgifridays.com/favicon.ico";
export const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export const center_latitude = 37.0902;
export const center_longitude = -95.7129;
export const conversionDetailsDirection = {
  cid: "",
  cv: "1",
};

export const conversionDetailsPhone = {
  cid: "",
  cv: "2",
};

export const metaBots = "index, follow";

/** Search Experience configuration */
export const LocationResultLimitOnSearch = 10;
export const AnswerExperienceConfig = {
  limit: 50,
  locale: "en",
  experienceKey: "tgi-fridays-search",
  apiKey: "96b4f9cb0c9c2f050eeec613af5b5340",
  verticalKey: "locations",
  experienceVersion: "PRODUCTION",
  locationRadius: 2414016,
  sessionTrackingEnabled: true,
  endpoints: {
    universalSearch: " https://liveapi.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      " https://liveapi.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      " https://liveapi.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      " https://liveapi.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      " https://liveapi.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      " https://liveapi.yext.com/v2/accounts/me/answers/filtersearch",
  },
};

export const googleAnalyticsScripts = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TW3LWNF');</script>`;
