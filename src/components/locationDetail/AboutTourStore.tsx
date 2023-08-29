import { Link } from "@yext/pages/components";
import * as React from "react";
import { AboutTourStoreProps } from "../../types/LocationSections";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ImageThumbnail } from "../../types/search/locations";
import { CtaData } from "@yext/search-ui-react";

/** Store information component */

export const AboutTourStore = (props: AboutTourStoreProps) => {
  const { c_aboutTheStoreDeals } = props;

  const SplideOptions = {
    rewind: false,
    perPage: 1,
    perMove: 1,
    arrows: true,
    drag: false,
    pagination: false,
    lazyLoad: "Brand",
    type: "loop",
  };

  return (
    <section className="img-with-content">
      <div className="container">
        <Splide options={SplideOptions}>
          {c_aboutTheStoreDeals?.map((c_aboutourstore: {description:[]; heading:string; image:ImageThumbnail; cTAs:CtaData; cTAslinkType:string}, index: number) => {
            return (
              <SplideSlide key={index}>
                <div
                  className={
                    c_aboutourstore.image?.url
                      ? "with-image content-wrapper"
                      : "content-wrapper"
                  }
                >
                  {c_aboutourstore?.image
                    ? c_aboutourstore.image?.url && (
                        <div className="img-block">
                          <img
                            src={c_aboutourstore.image?.url}
                            width={"550"}
                            height={"400"}
                            alt={
                              c_aboutourstore?.image?.alternateText
                                ? c_aboutourstore?.image?.alternateText
                                : "ServiceImage"
                            }
                            loading="lazy"
                          />
                        </div>
                      )
                    : ""}
                  <div className="content-block">
                    {c_aboutourstore?.heading ? (
                      <h3>{c_aboutourstore.heading}</h3>
                    ) : (
                      ""
                    )}

                    {c_aboutourstore.description?.map(
                      (data: string, index: number) => (
                        <p key={index}>{data}</p>
                      )
                    )}
                    {c_aboutourstore.cTAs?.link &&
                    c_aboutourstore.cTAs?.label ? (
                      <Link
                        target={
                          c_aboutourstore?.cTAslinkType == "OTHER"
                            ? "_blank"
                            : "tab"
                        }
                        eventName={`${c_aboutourstore?.heading} ${c_aboutourstore.cTAs?.label} ${index+1}`}
                        data-ya-track={`${c_aboutourstore?.heading} ${c_aboutourstore.cTAs?.label} ${index+1}`}
                        rel="noopener noreferrer"
                        href={c_aboutourstore.cTAs.link}
                        className="cta-btn"
                      >
                        {c_aboutourstore.cTAs?.label}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};
