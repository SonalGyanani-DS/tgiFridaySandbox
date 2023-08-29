import { Link } from "@yext/pages/components";
import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import { AddressType } from "../../types/search/locations";

/**
 * Direction function to redirect on google map with direction with the selected location.
 * @param props : get values
 * @returns : Function
 */
interface GetDirectionDataType {
  buttonText: string | Element;
  address: AddressType;
  googlePlaceId: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}
const GetDirection = (props: GetDirectionDataType) => {
  const getDirectionUrl = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        let getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          props.address.line1 +
          "," +
          props.address.city +
          props.address.region +
          "," +
          props.address.countryCode +
          "&origin=" +
          currentLatitude +
          "," +
          currentLongitude;
        if (props.googlePlaceId)
          getDirectionUrl += `&destination_place_id=` + props.googlePlaceId;
        window.open(getDirectionUrl, "_blank");
      });
    }
  };
  return (
    <Link
      data-ya-track="getDirections"
      eventName={`getDirections`}
      className="btn notHighlight direction"
      onClick={getDirectionUrl}
      href="javascript:void(0);"
      rel="noopener noreferrer"
    >
      {" "}
      {StaticData.getDirection}{" "}
    </Link>
  );
};

export default GetDirection;
