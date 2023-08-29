import { Link } from "@yext/pages/components";
import * as React from "react";
import { LocationService, Services } from "../../types/LocationSections";

/**
 * Restaurant service section
 * @param props :data
 * @returns : HTML
 */

export const LocationServices = (props: LocationService) => {
  const { c_serviceHeading, c_locationsService } = props;
  return (
      <div className="services-sec">
        <div className="container">
          <div className="sec-title">
            <h2>{c_serviceHeading ? c_serviceHeading : "Services"}</h2>
          </div>
          <div className="services-list">
            {c_locationsService &&
              c_locationsService?.map((service: Services, index: number) => (
                <div className="service-box" key={index}>
                  <div className="service-inner-box">
                    {service?.logo?.url && (
                      <div className="icon">
                        <img
                          src={service.logo.url}
                          alt="Icon"
                          width={35}
                          loading="lazy"
                        />
                      </div>
                    )}
                    {service?.cTA.label && service.cTA.link && (
                      <Link
                        eventName={"serviceLink_" + (index + 1)}
                        href={
                          service.cTA.link
                            ? service.cTA.link
                            : "javascript:void(0);"
                        }
                        data-ya-track={"serviceLink_" + (index + 1)}
                        rel="noopener noreferrer"
                      >
                        {service.cTA.label}
                      </Link>
                    )}
                    {service?.cTA.label && !service.cTA?.link && (
                      <span> {service.cTA.label}</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
  );
};
