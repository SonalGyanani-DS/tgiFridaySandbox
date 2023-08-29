import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "@yext/pages/components";
import { AddressType } from "../../types/search/locations";

/**
 * ECL menu sections
 * @param props :data
 * @returns : HTML
 */

interface MenuItem {
  itemDescription: string;
  itemID: string;
  itemName: string[];
  itemPhoto: {
    height: number;
    url: string;
    width: number;
  };
}

interface MenuSection {
  menuItem: MenuItem[];
  sectionID: string;
  sectionName: string;
}

interface EclMenuSectionsType {
  eclMenuCurrency: string;
  eclMenuSection: MenuSection;
  sectionId: string;
  id: string;
  name:string;
  address:AddressType;
}

const EclMenuSections = (props: EclMenuSectionsType) => {
  const { eclMenuSection, sectionId, id, name, address } = props;
  const length = eclMenuSection.menuItem?.length;

  let desktopSliderType = "";
  let tabSliderType = "";
  let mobileSliderType = "";
  let desktopSliderCenter = "";
  let tabSliderCenter = "";
  let mobileSliderCenter = "";
  let arrowsSlider = false;

  desktopSliderType = length > 4 ? "loop" : "slide";
  tabSliderType = length > 2 ? "loop" : "slide";
  mobileSliderType = length > 1 ? "loop" : "slide";
  desktopSliderCenter = length > 4 ? "" : "center-4";
  tabSliderCenter = length > 2 ? "" : "center-2";
  mobileSliderCenter = length > 1 ? "" : "center-1";
  arrowsSlider = length > 4 ? true : false;

  const SplideOptions = {
    rewind: false,
    type: desktopSliderType,
    perPage: 4,
    perMove: 1,
    arrows: arrowsSlider,
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
      {eclMenuSection.menuItem ? (
        <div
          className={`product-list ${desktopSliderCenter} ${tabSliderCenter} ${mobileSliderCenter}`}
        >
          <div className="container">
            {eclMenuSection.menuItem ? (
              <div className="flex sec-title">
                <h2>{eclMenuSection.sectionName}</h2>
              </div>
            ) : (
              ""
            )}
            <Splide options={SplideOptions} id={sectionId}>
              {eclMenuSection.menuItem &&
                eclMenuSection.menuItem?.map(
                  (item: MenuItem, index: number) => {
                    return (
                      <SplideSlide key={index}>
                        <div className="slide-img relative z-0">
                          {item?.itemPhoto ? (
                            <img
                              src={item?.itemPhoto.url}
                              alt="sliderImage"
                              height={410}
                              width={342}
                            />
                          ) : (
                            <></>
                          )}
                          <div className="product-content">
                            {item.itemName && <p>{item.itemName}</p>}
                          </div>
                          <div className="button-bx-detail !-mt-5 relative z-10">
                            <Link
                              eventName={`${name}_${address.city}_${address.region}_${item.itemName[0].replaceAll(" ","_")}_OrderNow`}
                              data-ya-track={`${name} ${address.city}, ${address.region} - ${item.itemName} OrderNow`}
                              rel="noopener noreferrer"
                              className="btn"
                              target="_blank"
                              href={
                                "https://order.tgifridays.com/menu/" +
                                id +
                                "/products/" +
                                item.itemID
                              }
                            >
                              Order Now
                            </Link>
                          </div>
                        </div>
                      </SplideSlide>
                    );
                  }
                )}
            </Splide>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EclMenuSections;
