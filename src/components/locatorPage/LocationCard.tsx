import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import Hours from "../commons/hours";
import GetDirection from "../commons/GetDirection";
import mapImage from "../../images/map.svg";
import phoneSvg from "../../images/phone.svg";
import timeIconSvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";
import constant from "../../constant";
import { OpenAccordian } from "../commons/openClose";

/**
 * Function to format phone number
 * @param phoneNumberString : Number
 * @returns : Phone number
 */
export function formatPhoneNumber(phoneNumberString: number) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return ["(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
}

/** function of meter to miles */
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(0);
};

/** Component on location card */
const LocationCard: CardComponent<Location> | string = (result) => {
  const { currentActiveOpenClose, setCurrentActiveOpenClose } = result;
  const { id, slug, address } = result.result.rawData;
  const url = constant.getLocationSlugUri(id, address, slug);

  /**
   * Function to open location page
   * @param e : Param
   */
  function OpenLocationPage(e: any) {
    if (!(e.target as HTMLInputElement).classList.contains("notHighlight")) {
      window.open(url, "_self");
    }
  }

  let locationTitle = "";
  if (result.result.rawData?.name) {
    locationTitle += result.result.rawData?.name;
  }
  if (result.result.rawData?.address?.city) {
    locationTitle += " " + result.result.rawData?.address?.city;
  }
  if (result.result.rawData.address.region) {
    locationTitle += ", " + result.result.rawData.address.region;
  }

  return (
    <div
      onClick={OpenLocationPage}
      className={`location result-list-inner-${result.result.index} result `}
      id={`result-${result.result.index}`}
    >
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row notHighlight">
              <div className="icon notHighlight">
                {" "}
                <img
                  src={mapImage}
                  className="notHighlight"
                  width="20"
                  height="20"
                  alt="Map"
                />
              </div>
              <h2 className="notHighlight">
                <Link
                  eventName={"locationCardName"}
                  data-ya-track={"locationCardName"}
                  rel="noopener noreferrer"
                  className="inline-block notHighlight w-fit"
                  href={url}
                >
                  {locationTitle}
                </Link>
              </h2>
              {typeof result.result.distance != "undefined" ? (
                <div className="distance">
                  {metersToMiles(result.result.distance)}{" "}
                  <span>{StaticData.miles}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="icon-row content-col address-with-availablity notHighlight w-fit">
              <Address address={address} />
            </div>
            {result.result.rawData.mainPhone ? (
              <div className="icon-row w-fit">
                <div className="icon notHighlight">
                  {" "}
                  <img
                    src={phoneSvg}
                    className="notHighlight"
                    width="20"
                    height="20"
                    alt="PhoneNumber"
                  />
                </div>
                <div className="content-col w-fit">
                  <h3 className="notHighlight w-fit">{StaticData.Telephone}</h3>
                  <Link
                    eventName={"cardPhoneNumber"}
                    data-ya-track={"cardPhoneNumber"}
                    rel="noopener noreferrer"
                    className="notHighlight w-fit"
                    href={`tel:${result.result.rawData.mainPhone}`}
                  >
                    {formatPhoneNumber(result.result.rawData.mainPhone)}
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {result.result.rawData?.hours ? (
              <>
                <div className="icon-row">
                  {result.result.rawData.hours?.reopenDate ? (
                    <>
                      <div className="icon">
                        {" "}
                        <img
                          src={timeIconSvg}
                          width="20"
                          height="20"
                          alt="Clock"
                        />{" "}
                      </div>
                      <div
                        className="cursor-pointer flex open-now-string items-center "
                        data-id={`main-shop-${result.result.rawData.id}`}
                      >
                        {StaticData.tempClosed}
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="icon">
                        {" "}
                        <img
                          src={timeIconSvg}
                          width="20"
                          height="20"
                          alt="Clock"
                        />{" "}
                      </div>
                      <div
                        className="flex open-now-string w-fit items-center"
                        data-id={`main-shop-${result.result.rawData.id}`}
                      >
                        <OpenClose
                          timezone={result.result.rawData.timezone}
                          hours={result.result.rawData?.hours}
                          deliveryHours={result.result.rawData?.hours}
                          currentActiveOpenClose={currentActiveOpenClose}
                          setCurrentActiveOpenClose={(value: string | null) =>
                            setCurrentActiveOpenClose(value)
                          }
                          locationId={result.result.rawData.id}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`storeLocation-openCloseTime  capitalize ${
                      currentActiveOpenClose === result.result.rawData.id
                        ? ""
                        : "hidden"
                    }`}
                  >
                    {OpenAccordian == false ? (
                      typeof result.result.rawData?.hours === "undefined" ? (
                        ""
                      ) : (
                        <Hours
                          key={result.result.rawData.name}
                          additionalHoursText={
                            result.result.rawData.additionalHoursText
                          }
                          hours={result.result.rawData?.hours}
                          timezone={result.result.rawData.timezone}
                          document={document}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="button-bx w-fit">
              {result.result.rawData.c_orderNow?.label &&
                result.result.rawData.c_orderNow.link && (
                  <Link
                    type="button bg-red text-white"
                    href={result.result.rawData.c_orderNow.link}
                    className=" btn notHighlight "
                    data-ya-track={"locationCardCTA_1"}
                    eventName={"locationCardCTA_1"}
                    rel="noopener noreferrer"
                  >
                    {result.result.rawData.c_orderNow?.label}
                  </Link>
                )}

              {result.result.rawData.displayCoordinate ? (
                <>
                  {result.result.rawData.c_directionUrl ? (
                    <Link
                      data-ya-track={"locationCardCTA_2"}
                      eventName={"locationCardCTA_2"}
                      className="btn notHighlight direction"
                      href={result.result.rawData.c_directionUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {result.result.rawData?.c_directionLabel ? (
                        <>{result.result.rawData?.c_directionLabel}</>
                      ) : (
                        StaticData.getDirection
                      )}
                    </Link>
                  ) : (
                    <>
                      {" "}
                      <GetDirection
                        googlePlaceId={result.result.rawData.c_googlePlaceId}
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={
                          result.result.rawData.displayCoordinate?.latitude
                        }
                        longitude={
                          result.result.rawData.displayCoordinate?.longitude
                        }
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {result.result.rawData.c_directionUrl ? (
                    <Link
                      data-ya-track="getDirections"
                      eventName={"locationCardCTA_2"}
                      className={"btn notHighlight direction"}
                      href={result.result.rawData.c_directionUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {result.result.rawData?.c_directionLabel ? (
                        <>{result.result.rawData?.c_directionLabel}</>
                      ) : (
                        StaticData.getDirection
                      )}
                    </Link>
                  ) : (
                    <>
                      <GetDirection
                        googlePlaceId={result.result.rawData.c_googlePlaceId}
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={
                          result.result.rawData.yextDisplayCoordinate?.latitude
                        }
                        longitude={
                          result.result.rawData.yextDisplayCoordinate?.longitude
                        }
                      />
                    </>
                  )}
                </>
              )}
            </div>
            {result.result.rawData.c_waitlist?.label &&
              result.result.rawData.c_waitlist.link && (
                <Link
                  target={
                    result.result.rawData.c_waitlist?.linkType
                      ? "_blank"
                      : "tab"
                  }
                  data-ya-track={"locationCardCTA_3"}
                  eventName={"locationCardCTA_3"}
                  href={result.result.rawData.c_waitlist.link}
                  rel="noopener noreferrer"
                  className="ghost-btn notHighlight"
                >
                  {result.result.rawData.c_waitlist?.label}
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationCard;
