import { useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  twMerge,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import MapIcon from "../../images/hovermarker.png";
import clusterIcon from "../../images/cluster-n.png";
import mapImage from "../../images/map.svg";
import timeIconSvg from "../../images/watch-icn.svg";
import HoverMap from "../../images/mouseover.png";
import UserMarker from "../../images/map-center.svg";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Address from "../commons/Address";
import phoneSvg from "../../images/phone.svg";
import OpenClose from "../commons/openClose";
import { stagingBaseurl } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import useFetchResults from "../../hooks/Fsefetchresult";
import { Link } from "@yext/pages/components";
import constant from "../../constant";
import { formatPhoneNumber } from "./LocationCard";
import { centerLatitude, centerLongitude } from "./SearchLayout";
import { Hours } from "../../types/search/locations";

/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
declare global {
  interface Window {
    getDirection: string;
  }
}
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/** Defined types for coordinates */
interface yextDisplayCoordinate {
  latitude: number;
  longitude: number;
}

interface rowdata {
  yextDisplayCoordinate: yextDisplayCoordinate;
  displayCoordinate: yextDisplayCoordinate;
}

interface LocationResult {
  rawData: rowdata;
  yextDisplayCoordinate: yextDisplayCoordinate;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */

export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  check: boolean;
  mobile: boolean;
  setMobile: (value: boolean) => void;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void } | null = null;
const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: "locator-map-block",
};

/**
 * A component that renders a map with markers to show result locations.

 * @param props - {@link GoogleMapsProps}
 * @returns A React element containing a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <UnwrappedGoogleMaps {...props} />
    </div>
  );
}

function UnwrappedGoogleMaps({
  defaultZoom: zoom,
  showEmptyMap,
  providerOptions,
  customCssClasses,
  mobile,
  setMobile,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  let center: {
    lat: number;
    lng: number;
  } = {
    lat: centerLatitude,
    lng: centerLongitude,
  };

  const locationResults = useFetchResults() || [];

  /** get Coordinate of locations */
  locationResults.map((result: LocationResult, i: number) => {
    if (i == 0) {
      center = {
        lat: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.latitude
          : result.rawData.displayCoordinate.latitude,
        lng: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.longitude
          : result.rawData.displayCoordinate.longitude,
      };
    }
  });

  /** State to handle map cases */
  let info = false;
  const [hover, setHover] = useState(true);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;

  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }

  /** Marker UI */
  const pinStyles = {
    fill: "#da261b", //default google red
    stroke: "#da261b",
    text: "white",
    fill_selected: "#000",
    stroke_selected: "#000",
    text_selected: "#fff",
  };

  const marker_icon = {
    url: MapIcon,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
   
  };

  /** Set map lat long to marker | declare bound function to bound markers */
  const bounds = new google.maps.LatLngBounds();
  const markers1 = useRef<google.maps.Marker[]>([]);
  const userMarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());

  /** Function to delete marker */
  deleteMarkers();

  /** Function to delete user markers */
  userDeleteMarkers();

  /** Set lat long for location markers */
  const userLat: any = useSearchState((s) => s.location.locationBias) || [];
  const IpLat: any = parseFloat(userLat.latitude);
  const IpLong: any = parseFloat(userLat.longitude);
  const position = {
    lat: parseFloat(IpLat),
    lng: parseFloat(IpLong),
  };

  /** Declare user marker & set position */
  const UserMarkerIcon = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  userMarker.current.push(UserMarkerIcon);

  /** case to create clusters of markers */
  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {
    console.log("Error");
  }

  /** Set position of locations markers based on listing */
  for (const result of locationResults) {
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
      title: result.rawData.name,
    });

    const location: any = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markers1.current.push(marker);
  }

  /** Render markers if result found */
  if (markers1.current.length > 0) {
    const markers = markers1.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clusterIcon,
            label: {
              text: String(markers?.length),
              color: "white",
            },
          });
        },
      },
    });
  }

  /** Bound marker after search */
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  useEffect(() => {
    setHover(true);
  }, [loading]);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      map?.setZoom(4);
    }
  };

  /** set map with markers */
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          ...providerOptions,
        })
      );
    } else if (markers1.current.length > 0 && map && hover) {
      const mediaQuery = window.matchMedia("(max-width: 1023px)");
      mediaQuery.addListener(handleMediaQueryChange);
      if (mobile) {
        handleMediaQueryChange(mediaQuery);
        setMobile(false);
      }
      setTimeout(function () {
        bounds.extend(center);
        bounds.extend(position);
        map.fitBounds(bounds);
      }, 1000);
    } else if (hover) {
      map?.setZoom(zoom);
    }
  }, [center, map, providerOptions, zoom, mobile]);

  /** Initialize location marker and render on map */
  for (let i = 0; i < markers1.current.length; i++) {
    markers1.current[i].addListener("click", () => {
      locationResults.map((result: Location, index: number) => {
        const resultElement: NodeList = document.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultElement.length; index++) {
          (resultElement[index] as HTMLElement).classList.remove(
            "active",
            "fixed-hover"
          );
        }
      });
      setHover(false);
      if (!info) {
        markers1.current[i].setIcon(HoverMap);
      }
      locationResults.map((result: rawData, index: number) => {
        if (i == index) {
          const resultElement: NodeList = document.querySelectorAll(
            `.result-list-inner-${index + 1}`
          );
          for (let index = 0; index < resultElement.length; index++) {
            (resultElement[index] as HTMLElement).classList.add("active");
            (resultElement[index] as HTMLElement).classList.add("fixed-hover");
          }

          const position = getPosition(locationResults[index]);
          map?.setCenter(position);
          map?.setZoom(18);
          InfoWindow(i, result);
          scrollToRow(index);
        }
        infoWindow.current.open(map, markers1.current[i]);
      });
    });
    markers1.current[i].addListener("mouseover", () => {
      if (hover) {
        markers1.current[i].setIcon(HoverMap);
        addActiveGrid(i);
      }
    });
    markers1.current[i].addListener("mouseout", () => {
      if (hover) {
        markers1.current[i].setIcon(marker_icon);
      }
      if (hover) {
        removeActiveGrid(i);
      }
    });
  }

  /** Info-window close event */
  if (infoWindow.current != null) {
    infoWindow.current.addListener("closeclick", () => {
      setHover(true);
      info = false;
      infoWindow.current.close();
      locationResults.map((result: Location, index: number) => {
        const resultElement: NodeList = document.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultElement.length; index++) {
          (resultElement[index] as HTMLElement).classList.remove(
            "active",
            "fixed-hover"
          );
        }
      });
    });
  }

  useEffect(() => {
    /** Function for highlight locations on hover on marker or location */
    gridHover(markers1, HoverMap, marker_icon);
    /** Function for highlight locations on click on marker or location */
  }, [markers1.current]);

  /** Function to active location on hours and click on marker or location */
  function addActiveGrid(index: number) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.add("active");
  }

  /** Function to remove active locations  */
  function removeActiveGrid(index: any) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.remove("active");
  }

  /** Function of fire mouseover event */

  function gridHover(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", () => {
        if (hover) {
          markerPins.current[index].setIcon(marker_hover_icon);
          addActiveGrid(index);
        }
      });
      elements[index].addEventListener("mouseout", () => {
        if (hover) {
          if (elements[index].classList.contains("fixed-hover")) {
            markerPins.current[index].setIcon(marker_hover_icon);
          } else {
            markerPins.current[index].setIcon(marker_icon);
          }
          removeActiveGrid(index);
        }
      });
    }
  }

  /**
   * Function to convert Meters to Miles
   * @param meters : Value
   * @returns : Miles
   */
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(0);
  };

  /**
   * Function to create info-window
   * @param i : Info-window content
   * @param result : index
   */
  interface address {
    city: string;
    region: string;
    countryCode: string;
  }
  interface dataItems {
    id: string;
    address: address;
    slug: string;
    name: string;
    mainPhone: number;
    hours: Hours;
    timezone: string;
    c_orderNow: { label: string; link: string };
    c_waitlist: { label: string; link: string };
    displayCoordinate: yextDisplayCoordinate;
    c_directionUrl: string;
    c_directionLabel: string;
    yextDisplayCoordinate: yextDisplayCoordinate;
  }
  interface rawData {
    rawData: dataItems;
    distance: number;
  }

  function InfoWindow(i: number, result: rawData): void {
    info = true;
    const url = constant.getLocationSlugUri(
      result.rawData?.id,
      result.rawData?.address,
      result.rawData?.slug
    );

    let locationTitle = "";
    if (result.rawData?.name) {
      locationTitle += result.rawData?.name;
    }
    if (result.rawData?.address?.city) {
      locationTitle += " " + result.rawData?.address?.city;
    }
    if (result.rawData.address.region) {
      locationTitle += ", " + result.rawData.address.region;
    }
    const MarkerContent = (
      <>
        {" "}
        <div className="flex flex-col max-w-[24rem] w-64 lg:w-[22.5rem] font-main-font text-xs sm:text-sm lg:text-base">
          <div className="location-name-miles icon-row">
            <div className="icon">
              {" "}
              <img
                src={mapImage}
                width="20"
                height="20"
                alt="Map"
              />
            </div>
            <h2>
              <Link
                eventName={"Name:" + locationTitle}
                data-ya-track={"Name:" + locationTitle}
                rel="noopener noreferrer"
                className="inline-block notHighlight"
                href={stagingBaseurl + url}
              >
                {locationTitle}
              </Link>
            </h2>
            {result.distance ? (
              <div className="distance">
                {metersToMiles(result.distance ?? 0)}{" "}
                <span>{StaticData.miles}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="icon-row content-col">
            <Address address={result.rawData.address} />
          </div>
          {result.rawData.mainPhone ? (
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
                <h3>Telephone</h3>
                <Link
                  eventName={"PhoneNumber"}
                  data-ya-track={"PhoneNumber"}
                  rel="noopener noreferrer"
                  className="notHighlight"
                  href={`tel:${result.rawData.mainPhone}`}
                >
                  {formatPhoneNumber(result.rawData.mainPhone)}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}

          {result.rawData?.hours && result.rawData?.hours.reopenDate ? (
            ""
          ) : result.rawData?.hours ? (
            <>
              <div className="icon-row !mb-0">
                <div className="icon">
                  {" "}
                  <img
                    src={timeIconSvg}
                    width="20"
                    height="20"
                    alt="Clock"
                  />{" "}
                </div>
                <div className="cursor-default">
                  <OpenClose
                    ArrowIcon={"ArrowIconFalse"}
                    timezone={result.rawData.timezone}
                    hours={result.rawData?.hours}
                    deliveryHours={result.rawData?.hours}
                  ></OpenClose>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="button-bx notHighligh">
            {result.rawData.c_orderNow?.label &&
              result.rawData.c_orderNow.link && (
                <Link
                  type="button bg-red text-white"
                  href={result.rawData.c_orderNow.link}
                  className=" btn notHighlight "
                  eventName={result.rawData.c_orderNow?.label}
                  data-ya-track={result.rawData.c_orderNow?.label}
                  rel="noopener noreferrer"
                >
                  {result.rawData.c_orderNow?.label}
                </Link>
              )}
            {result.rawData.displayCoordinate ? (
              <>
                {result.rawData.c_directionUrl ? (
                  <Link
                    data-ya-track="getDirections"
                    eventName={`getDirections`}
                    className="btn notHighlight direction"
                    href={result.rawData.c_directionUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {result.rawData?.c_directionLabel ? (
                      <>{result.rawData?.c_directionLabel}</>
                    ) : (
                      StaticData.getDirection
                    )}
                  </Link>
                ) : (
                  <>
                    <span
                      data-listener="false"
                      data-latitude={result.rawData.displayCoordinate.latitude}
                      data-longitude={
                        result.rawData.displayCoordinate.longitude
                      }
                      className="getDirection btn"
                      data-city={result.rawData.address.city}
                      data-country={result.rawData.address.countryCode}
                      data-region={result.rawData.address.region}
                    >
                      {StaticData.getDirection}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                {result.rawData.c_directionUrl ? (
                  <Link
                    data-ya-track="getDirections"
                    eventName={`getDirections`}
                    className="btn notHighlight direction"
                    href={result.rawData.c_directionUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {result.rawData?.c_directionLabel ? (
                      <>{result.rawData?.c_directionLabel}</>
                    ) : (
                      StaticData.getDirection
                    )}
                  </Link>
                ) : (
                  <>
                    <span
                      data-listener="false"
                      data-latitude={
                        result.rawData.yextDisplayCoordinate.latitude
                      }
                      data-longitude={
                        result.rawData.yextDisplayCoordinate.longitude
                      }
                      data-city={result.rawData.address.city}
                      data-country={result.rawData.address.countryCode}
                      data-region={result.rawData.address.region}
                      className="cursor-pointer getDirection1 btn"
                    >
                      {StaticData.getDirection}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          {result.rawData.c_waitlist.link &&
            result.rawData.c_waitlist.label && (
              <Link
                href={result.rawData.c_waitlist.link}
                className="Link ghost-btn map-link w-fit"
                data-ya-track={result.rawData.c_waitlist.label}
                eventName={result.rawData.c_waitlist.label}
                rel="noopener noreferrer"
              >
                {result.rawData.c_waitlist.label}
              </Link>
            )}
        </div>
      </>
    );
    const string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);
  }

  /** Get direction CTA on info-window */
  google.maps.event.addListener(infoWindow.current, "domready", () => {
    let inputs;
    inputs = document.getElementsByClassName("getDirection");
    if (inputs.length == 0) {
      inputs = document.getElementsByClassName("getDirection1");
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", GetDirection);
    }
  });

  /**
   * Function to direction on location , it will redirect user to google map with direction
   * @param e : address
   */
  function GetDirection(e: Event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (e.target) {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          const getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            (e.target as HTMLElement).dataset.latitude +
            "," +
            (e.target as HTMLElement).dataset.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        }
      });
    }
  }

  /** Function to delete marker from Map */
  function deleteMarkers(): void {
    for (let i = 0; i < markers1.current.length; i++) {
      markers1.current[i].setMap(null);
    }
    markers1.current = [];
  }

  /** delete user marker */
  function userDeleteMarkers(): void {
    for (let i = 0; i < userMarker.current.length; i++) {
      userMarker.current[i].setMap(null);
    }
    userMarker.current = [];
  }
  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

/** Get coordinate value for marker position */
function getPosition(result: LocationResult) {
  const lat = result.rawData.yextDisplayCoordinate
    ? result.rawData.yextDisplayCoordinate.latitude
    : result.rawData.displayCoordinate.latitude;
  const lng = result.rawData.yextDisplayCoordinate
    ? result.rawData.yextDisplayCoordinate.longitude
    : result.rawData.displayCoordinate.longitude;
  return { lat, lng };
}

/** Initialize Scroller */
export function scrollToRow(index: number) {
  const result: HTMLElement = [].slice.call(
    document.querySelectorAll(`.result`) || []
  )[0];
  const offset: HTMLElement = [].slice.call(
    document.querySelectorAll(`.result`) || []
  )[index];

  const o = offset?.offsetTop - result?.offsetTop;

  [].slice
    .call(document.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: HTMLElement) {
      el.scrollTop = o;
    });
}
