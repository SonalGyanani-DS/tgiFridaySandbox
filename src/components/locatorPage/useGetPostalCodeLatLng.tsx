import { useState } from "react";
import {
  Matcher,
  SelectableFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import {
  AnswerExperienceConfig,
  LocationResultLimitOnSearch,
  googleApikey,
} from "../../../sites-global/global";

const useGetPostalCodeLatLng = () => {
  const searchActions = useSearchActions();
  const [postalLoading, setPostalLoading] = useState(false);
  const setLoading = (value: boolean) => {
    setPostalLoading(value);
  };

  let params: { latitude: number; longitude: number };
  interface geometry {
    location: { lat: number; lng: number };
  }
  interface AddressComponent {
    long_name: string;
    short_name: string;
    geometry: geometry;
    types: string[];
    length: number;
  }
  interface NewAddressComponent extends AddressComponent {
    address_components: AddressComponent[];
  }
  /** User address component type */
  // Get the element with the specified class
  const postalCode = (
    postal: string,
    coordinates: { latitude: number; longitude: number },
    checkAllowed: boolean
  ) => {
    if (checkAllowed !== true) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&key=${googleApikey}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "ZERO_RESULTS") {
            searchActions.setQuery("gkhvfdjgbdbg");
            searchActions.setUserLocation(coordinates);
            searchActions.setOffset(0);
            if (postal == "United States" || postal == "USA") {
              searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
            } else {
              searchActions.setVerticalLimit(LocationResultLimitOnSearch);
            }
            searchActions.executeVerticalQuery();
          } else if (json.results) {
            let status = false;
            json.results.map((components: NewAddressComponent) => {
              for (let i = 0; i < components.address_components.length; i++) {
                params = {
                  latitude: components.geometry.location.lat,
                  longitude: components.geometry.location.lng,
                };
                if (
                  components.address_components[i].types.includes("country")
                ) {
                  if (components.address_components[i].short_name != "US") {
                    status = true;
                  }
                }
              }
            });
            const locationFilter: SelectableFilter = {
              selected: true,
              fieldId: "builtin.location",
              value: {
                lat: params.latitude,
                lng: params.longitude,
                radius: 2414016,
              },
              matcher: Matcher.Near,
            };
            if (status) {
              searchActions.setQuery(postal);
              searchActions.setOffset(0);
              searchActions.setStaticFilters([locationFilter]);
              searchActions.setUserLocation({
                latitude: params.latitude,
                longitude: params.longitude,
              });
              if (postal == "United States" || postal == "USA") {
                searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
              } else {
                searchActions.setVerticalLimit(LocationResultLimitOnSearch);
              }
              searchActions.executeVerticalQuery();
            } else {
              searchActions.setQuery("");
              searchActions.setStaticFilters([locationFilter]);
              searchActions.setUserLocation({
                latitude: params.latitude,
                longitude: params.longitude,
              });
              searchActions.setOffset(0);
              if (postal == "United States" || postal == "USA") {
                searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
              } else {
                searchActions.setVerticalLimit(LocationResultLimitOnSearch);
              }
              searchActions.executeVerticalQuery();
            }
          }
        })
        .catch(() => {
          console.log("Something went wrong Please try after some time");
        });
    } else {
      searchActions.setVertical("locations");
      searchActions.setQuery("");
      searchActions.setUserLocation(coordinates);
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();
    }
  };
  return { postalCode, setLoading, postalLoading };
};

export default useGetPostalCodeLatLng;
