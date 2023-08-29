import * as React from "react";
import defaultImage from "../../images/Rectangle393.webp";
import { Link } from "@yext/pages/components";
import { BannerDatatype } from "../../types/LocationSections";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

/**
 *
 * @param props : Banner data
 * @returns : Hero Banner
 */
const Banner = (props: BannerDatatype) => {
  const { name, c_orderNow, c_bannerImage } = props;
  return (
    <>
      <div className="hero-section">
        <img
          className="hero-image"
          alt="SiteTopBanner"
          src={c_bannerImage ? c_bannerImage : defaultImage}
          width="1500"
          height="300"
        />
        <div className="hero-content">
          <div className="container">
            <div className={`banner-text  banner-dark-bg`}>
              <h1>{name}</h1>
              {c_orderNow?.label && c_orderNow?.link ? (
                <div className="button-bx-detail">
                  <Link
                    target={
                      c_orderNow?.cTAslinkType == "OTHER" ? "_blank" : "tab"
                    }
                    eventName="BannerCTA_1"
                    data-ya-track="BannerCTA_1"
                    rel="noopener noreferrer"
                    href={c_orderNow?.link}
                    className="btn !w-full !px-5"
                  >
                    {c_orderNow?.label}
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
