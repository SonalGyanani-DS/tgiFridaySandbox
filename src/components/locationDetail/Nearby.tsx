import * as React from "react";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose";
import timeIconSvg from "../../images/watch-icn.svg";
import mapImage from "../../images/map.svg";
import phoneSvg from "../../images/phone.svg";
import {
  geoSearchEndpoint,
  stagingBaseurl,
  yextApiKey,
} from "../../../sites-global/global";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import { StaticData } from "../../../sites-global/staticData";
import constant from "../../constant";
import { formatPhoneNumber } from "../locatorPage/LocationCard";
import { Coordinate, Location } from "../../types/search/locations";
import { useEffect, useState } from "react";

/**
 * Function to show nearby location on location page
 * @param props : Locations
 * @returns : Nearby Location
 */

interface NearbyLocationType {
  geocodedCoordinate: Coordinate;
  id: string;
  c_viewAllLocations: { link: string; label: string };
  c_nearbyStoreHeading: string;
}

type NearbyAPIConfig = {
  endpoint: string;
  params: {
    api_key: string;
    entityTypes?: string;
    limit?: string;
    radius?: string;
    savedFilterIds?: string;
    v: string;
  };
};

const getConfig = (api_key: string): NearbyAPIConfig => {
  return {
    endpoint: geoSearchEndpoint,
    params: {
      api_key,
      entityTypes: "location",
      limit: "4",
      radius: "1500",
      savedFilterIds: "1298130161",
      v: "20220927",
    },
  };
};

export default function Nearby1(props: NearbyLocationType) {
  const { geocodedCoordinate, id, c_nearbyStoreHeading, c_viewAllLocations } =
    props;
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);

  const SplideOptions = {
    rewind: false,
    type: "slide",
    perPage: 3,
    perMove: 1,
    arrows: false,
    drag: false,
    pagination: false,
    lazyLoad: "nearby",
    breakpoints: {
      1279: {
        perPage: 2,
        drag: true,
        pagination: true,
        arrows: false,
        type: "splide",
      },
      800: {
        perPage: 1,
        drag: true,
        pagination: true,
        arrows: false,
        type: "splide",
      },
    },
  };

  useEffect(() => {
    if (!geocodedCoordinate) {
      return;
    }

    const config = getConfig(yextApiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${geocodedCoordinate.latitude},${geocodedCoordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });

    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setNearbyLocations(data.response.entities || []))
      .catch((error) => console.error(error));
  }, [geocodedCoordinate, id]);

  if (!nearbyLocations.length) {
    return null;
  }

  return (
    <>
      <div className="nearby-sec">
        <div className="container">
          {nearbyLocations && (
            <div className="sec-title" id="nearBy-title">
              {c_nearbyStoreHeading && <h2>{c_nearbyStoreHeading}</h2>}
            </div>
          )}
          <div className="nearby-sec-inner">
            <Splide id="splide-nearby" options={SplideOptions}>
              {nearbyLocations &&
                nearbyLocations.map((location: Location, index: number) => {
                  const url = constant.getLocationSlugUri(
                    location.id,
                    location.address,
                    location.slug ? location.slug : ""
                  );
                  if (index > 0) {
                    let locationTitle = "";
                    if (location?.name) {
                      locationTitle += location?.name;
                    }
                    if (location?.address?.city) {
                      locationTitle += " " + location?.address?.city;
                    }
                    if (location.address.region) {
                      locationTitle += ", " + location.address.region;
                    }

                    return (
                      <>
                        <SplideSlide key={index}>
                          <div className="nearby-card">
                            <div className="location-name-miles icon-row">
                              <div className="icon">
                                {" "}
                                <img
                                  src={mapImage}
                                  width="20"
                                  height="20"
                                  alt="Map"
                                  loading="lazy"
                                />
                              </div>
                              <h2>
                                <Link
                                  eventName="Nearby_Location_name"
                                  data-ya-track="Nearby_Location_name"
                                  rel="noopener noreferrer"
                                  className="inline-block notHighlight"
                                  href={stagingBaseurl + url}
                                >
                                  {locationTitle}
                                </Link>
                              </h2>
                            </div>
                            <div className="icon-row content-col">
                              <Address address={location.address} />
                            </div>
                            {location.mainPhone ? (
                              <div className="icon-row">
                                <div className="icon">
                                  {" "}
                                  <img
                                    src={phoneSvg}
                                    width="20"
                                    height="20"
                                    alt="PhoneNumber"
                                  />
                                </div>
                                <div className="content-col">
                                  <h3>{StaticData.Telephone}</h3>
                                  <Link
                                    href={`tel:${location.mainPhone}`}
                                    data-ya-track={"nearby_PhoneNumber"}
                                    eventName={"nearby_PhoneNumber"}
                                    rel="noopener noreferrer"
                                  >
                                    {formatPhoneNumber(location.mainPhone)}
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="icon-row">
                              <div className="icon">
                                {" "}
                                <img
                                  src={timeIconSvg}
                                  width="20"
                                  height="20"
                                  alt="Clock"
                                />
                              </div>
                              {location?.hours && location?.timezone ? (
                                <div className="openCloseStatus">
                                  <OpenClose
                                    ArrowIcon={"ArrowIconFalse"}
                                    timezone={location.timezone}
                                    hours={location?.hours}
                                    deliveryHours={location?.hours}
                                  ></OpenClose>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="button-bx notHighligh">
                              {location.c_orderNow &&
                                location.c_orderNow.link &&
                                location.c_orderNow?.label && (
                                  <Link
                                    className="btn notHighligh"
                                    href={location.c_orderNow?.link}
                                    eventName="nearbyCTA_1"
                                    data-ya-track={location.c_orderNow?.label}
                                    rel="noopener noreferrer"
                                  >
                                    {location.c_orderNow?.label}
                                  </Link>
                                )}
                              {location?.c_directionUrl ? (
                                <Link
                                  data-ya-track="nearbyCTA_2"
                                  eventName={`nearbyCTA_2`}
                                  className="btn notHighlight direction"
                                  href={location.c_directionUrl}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {location?.c_directionLabel ? (
                                    <>{location?.c_directionLabel}</>
                                  ) : (
                                    StaticData.getDirection
                                  )}
                                </Link>
                              ) : (
                                <>
                                  {" "}
                                  <GetDirection
                                    buttonText={StaticData.getDirection}
                                    googlePlaceId={location.c_googlePlaceId}
                                    address={location.address}
                                    latitude={
                                      location.displayCoordinate
                                        ? location.displayCoordinate.latitude
                                        : location.yextDisplayCoordinate &&
                                          location.yextDisplayCoordinate
                                            .latitude
                                    }
                                    longitude={
                                      location.displayCoordinate
                                        ? location.displayCoordinate.longitude
                                        : location.yextDisplayCoordinate &&
                                          location.yextDisplayCoordinate
                                            .longitude
                                    }
                                  />
                                </>
                              )}
                            </div>
                            {location.c_waitlist &&
                              location.c_waitlist.link &&
                              location.c_waitlist?.label && (
                                <div>
                                  {location?.c_waitlist?.label &&
                                    location?.c_waitlist?.link && (
                                      <Link
                                        target={
                                          location?.c_waitlist?.linkType
                                            ? "_blank"
                                            : "tab"
                                        }
                                        data-ya-track="nearbyCTA_3"
                                        eventName="nearbyCTA_3"
                                        href={location?.c_waitlist?.link}
                                        rel="noopener noreferrer"
                                        className="ghost-btn"
                                      >
                                        {location?.c_waitlist?.label}
                                      </Link>
                                    )}
                                </div>
                              )}
                          </div>
                        </SplideSlide>
                      </>
                    );
                  }
                })}
            </Splide>
          </div>
        </div>
        {nearbyLocations && (
          <div className="content-center w-full text-center ">
            <Link
              eventName="LocatorPageLink"
              data-ya-track="LocatorPageLink"
              rel="noopener noreferrer"
              href={
                c_viewAllLocations?.link
                  ? c_viewAllLocations.link
                  : stagingBaseurl
              }
              className="button-red"
            >
              {" "}
              {c_viewAllLocations?.label
                ? c_viewAllLocations.label
                : StaticData.AllLocationText}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
