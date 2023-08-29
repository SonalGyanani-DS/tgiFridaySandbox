import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../../images/Vector.png";
import { googleApikey } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import { Coordinate } from "../../types/search/locations";
import useDimensions from "../../hooks/useDimensions";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type props = {
  prop: Coordinate;
  placeId: string;
  googleReviewUrl:string;
};

/**
 * Initialize custom Map for location page
 * @param coords : Location Coordinate
 * @returns : Map
 */
function CustomMap(coords: props) {
  const { width } = useDimensions();
  function initReviewMap(event: any) {
    const request = {
      placeId: coords.placeId,
      fields: [
        "name",
        "rating",
        "formatted_phone_number",
        "geometry",
        "user_ratings_total",
        "url"
      ],
    };
    if (event?.data?.map) {
      const service: any = new google.maps.places.PlacesService(
        event?.data?.map
      );
      service.getDetails(request, getReviewCallback);
    }
  }

  function getReviewCallback(
    place: { rating: number; user_ratings_total: number, url:string },
    status: string
  ) {
    let GoogleRedirectionURl = `https://www.google.com/maps/place/?q=place_id:' ${coords.placeId}`;
    if(coords.googleReviewUrl){
      GoogleRedirectionURl = coords.googleReviewUrl;
    }
   
    const mobileWidth = width;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      if(typeof place.url != "undefined" && mobileWidth < 767){
        GoogleRedirectionURl = place.url;
      }
      if (typeof place.rating != "undefined") {
        const rating = place.rating;
        const user_ratings_total = place.user_ratings_total;

        let width = 0;
        if (place.rating > 0) {
          width = 2 * (place.rating * 10);
        }

        const html =
          '<div class="rating-result" id="rating-result"><span style="width:' +
          width +
          '%"> <span> </span> </span></div><span class="star-rating-value">' +
          rating +
          "</span>( <!-- -->" +
          user_ratings_total + 
          ' Reviews<!-- --> )<div class="all-review"><a class="Link" href='+GoogleRedirectionURl+' rel="noopener" style="unicode-bidi:bidi-override;direction:ltr" target="_blank">' +
          StaticData.SeeAllGoogleReviews
          "</a></div>";
        const starterElement = document.getElementById("star-rating");
        starterElement ? (starterElement.innerHTML = html) : "";
      }
    }
  }

  return (
    <LoadScript googleMapsApiKey={googleApikey} libraries={["places"]}>
      {coords.prop.latitude && coords.prop.longitude ? (
        <>
          {" "}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: coords.prop && coords.prop.latitude,
              lng: coords.prop && coords.prop.longitude,
            }}
            onLoad={(e) => {
              initReviewMap(e);
            }}
            zoom={10}
            options={{
              styles: [
                {
                  featureType: "administrative",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "simplified",
                    },
                  ],
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
              ],
            }}
          >
            <Marker
              position={{
                lat: coords.prop && coords.prop.latitude,
                lng: coords.prop && coords.prop.longitude,
              }}
              icon={marker}
            />
          </GoogleMap>
        </>
      ) : (
        <></>
      )}
    </LoadScript>
  );
}

export default CustomMap;
