import * as React from "react";
import Hours from "../commons/hours";
import mapImage from "../../images/map.svg";
import phoneSvg from "../../images/phone.svg";
import timeIconSvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";
import OpenClose from "../commons/openClose";
import { formatPhoneNumber } from "../locatorPage/LocationCard";
import { ContactUsDataType } from "../../types/search/locations";

/**
 * contact section for user
 * @param props : CONTACT DATA
 * @returns : contact info
 */

const Contact = (props: ContactUsDataType) => {
  const {
    address,
    phone,
    latitude,
    longitude,
    hours,
    additionalHoursText,
    c_orderNow,
    c_yelpWidget,
    timezone,
    c_onlineOrderAndReservationsTime,
    c_directionUrl,
    c_directionLabel,
    c_specific_day,
    c_googlePlaceId,
    c_onlineOrderingAndReservations,
    document,
    deliveryHours,
  } = props;

  let bannerTitle = "";
  if (document?.name) {
    bannerTitle += document?.name;
  }
  if (document?.address?.city) {
    bannerTitle += " " + document?.address?.city;
  }
  if (document.address.region) {
    bannerTitle += ", " + document.address.region;
  }

  return (
    <>
      <div className="address-main-sec">
        <div className="icon-row content-col">
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
          <h3>{bannerTitle}</h3>
          <Address address={address} />
        </div>

        {phone ? (
          <div className="icon-row">
            <div className="icon">
              {" "}
              <img src={phoneSvg} width="20" height="20" alt="PhoneNumber" />
            </div>
            <div className="content-col">
              <h3>{StaticData.Telephone}</h3>
              <Link
                eventName={"detailPhoneNumber"}
                data-ya-track={"detailPhoneNumber"}
                rel="noopener noreferrer"
                href={`tel:${phone}`}
              >
                {formatPhoneNumber(phone)}
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}

        {hours && timezone ? (
          <div className="icon-row">
            <div className="icon">
              {" "}
              <img
                src={timeIconSvg}
                width="20"
                height="20"
                alt="Clock"
                loading="lazy"
              />
            </div>
            <div className="openCloseStatus">
              <OpenClose
                ArrowIcon={"ArrowIconFalse"}
                timezone={timezone}
                hours={hours}
                deliveryHours={hours}
              ></OpenClose>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="button-bx-detail">
          {c_orderNow?.link && c_orderNow?.label && (
            <Link
              href={c_orderNow.link}
              className="btn"
              data-ya-track="DetailCTA_1"
              eventName="DetailCTA_1"
              rel="noopener noreferrer"
            >
              {c_orderNow?.label}{" "}
            </Link>
          )}
          {c_directionUrl ? (
            <Link
              data-ya-track="DetailCTA_2"
              eventName="DetailCTA_2"
              className="btn notHighlight direction"
              href={c_directionUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {c_directionLabel ? (
                <>{c_directionLabel}</>
              ) : (
                StaticData.getDirection
              )}
            </Link>
          ) : (
            <>
              {" "}
              <GetDirection
                googlePlaceId={c_googlePlaceId}
                buttonText={StaticData.getDirection}
                address={address}
                latitude={latitude}
                longitude={longitude}
              />
            </>
          )}
        </div>
        <div className="yelpWidget">
          {c_yelpWidget && (
            <iframe
              src={`https://www.yelp.com/waitlist/${c_yelpWidget}/widget`}
              width="250"
              height="326"
              frameBorder="0"
              title="Join our waitlist"
            ></iframe>
          )}
        </div>
      </div>
      {hours && typeof hours?.monday != "undefined" ? (
        <div className="hours">
          <div className="hours-sec">
            <div className="hours-div mb-5 md:mb-1 flex flex-col">
              {hours && (
                <Hours
                  c_onlineOrderAndReservationsTime={
                    c_onlineOrderAndReservationsTime
                  }
                  title={"Restaurant Hours"}
                  additionalHoursText={additionalHoursText}
                  hours={hours}
                  timezone={timezone}
                  deliveryHours={deliveryHours}
                  c_onlineOrderingAndReservations={
                    c_onlineOrderingAndReservations
                  }
                  document={props.document}
                  c_specific_day={c_specific_day}
                  c_yelpWidget={c_yelpWidget}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
