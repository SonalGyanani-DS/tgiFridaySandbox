import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "@yext/pages/components";
import { ItemImage, WhatHotSectionType } from "../../types/LocationSections";

/**
 * What Hot In sections
 * @param props :data
 * @returns : HTML
 */

const WhatHotIn = (props: WhatHotSectionType) => {
  const { c_whatsHotItems, name, address, c_viewDineInMenuCTA } = props;
  const length = c_whatsHotItems?.length;

  let desktopSliderType = "";
  let tabSliderType = "";
  let mobileSliderType = "";
  let desktopSliderCenter = "";
  let tabSliderCenter = "";
  let mobileSliderCenter = "";

  desktopSliderType = length > 4 ? "loop" : "slide";
  tabSliderType = length > 2 ? "loop" : "slide";
  mobileSliderType = length > 1 ? "loop" : "slide";
  desktopSliderCenter = length > 4 ? "" : "center-4";
  tabSliderCenter = length > 2 ? "" : "center-2";
  mobileSliderCenter = length > 1 ? "" : "center-1";

  const SplideOptions = {
    rewind: false,
    type: desktopSliderType,
    perPage: 4,
    perMove: 1,
    arrows: true,
    drag: false,
    pagination: false,
    lazyLoad: "Brand",
    breakpoints: {
      "1279": {
        perPage: 3,
        drag: true,
        type: tabSliderType,
      },
      "840": {
        perPage: 2,
        drag: true,
        type: tabSliderType,
      },
      "575": {
        perPage: 1,
        type: mobileSliderType,
      },
    },
  };

  return (
    <div className="products">
      {c_whatsHotItems ? (
        <div
          className={`product-list ${desktopSliderCenter} ${tabSliderCenter} ${mobileSliderCenter}`}
        >
          <div className="container">
            {c_whatsHotItems ? (
              <div className="flex sec-title">
                <h2>
                  {name ? "What's Hot in " + name : ""}{" "}
                  {address?.city ? address.city : ""}
                  {""}
                  {address.region ? <>{", " + address.region}</> : ""}
                </h2>
                {c_viewDineInMenuCTA?.link && c_viewDineInMenuCTA?.label && (
                  <div className="button-bx-detail">
                    <Link
                      href={c_viewDineInMenuCTA.link}
                      className="btn"
                      data-ya-track="DineMenuLink"
                      rel="noopener noreferrer"
                      eventName="DineMenuLink"
                    >
                      {c_viewDineInMenuCTA?.label}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <Splide options={SplideOptions}>
              {c_whatsHotItems &&
                c_whatsHotItems?.map((item: ItemImage, index: number) => {
                  return (
                    <SplideSlide key={index}>
                      <div className="slide-img relative z-0">
                        {item?.image ? (
                          <img src={item?.image.url} alt="sliderImage" height={410} width={342}/> // <Image image={item?.image} height={410} width={342} />
                        ) : (
                          <></>
                        )}
                        <div className="product-content">
                          {item.title && <p>{item.title}</p>}
                        </div>
                        {item.cTA?.label && item.cTA.link && (
                          <div className="button-bx-detail !-mt-5 relative z-10">
                            <Link
                              eventName={item.cTA?.label}
                              data-ya-track={item.cTA?.label}
                              rel="noopener noreferrer"
                              className="btn"
                              href={item.cTA.link}
                            >
                              {item.cTA?.label}
                            </Link>
                          </div>
                        )}
                      </div>
                    </SplideSlide>
                  );
                })}
            </Splide>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WhatHotIn;
