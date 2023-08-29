import * as React from "react";
import "@splidejs/react-splide/css";
import EclMenuSections from "./EclMenuSections";
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

interface EclMenusType {
  eclMenus: {
    eclMenu_currency: string;
    eclMenu_section: MenuSection[];
    name: string;
  }[];
  id: string;
  name:string;
  address:AddressType;
}

const EclMenus = (props: EclMenusType) => {
  const { id, eclMenus, name, address } = props;  
  return (
    <React.Fragment key={"menu-section"}>
      {eclMenus &&
        eclMenus.map(
          (
            eclMenus: {
              eclMenu_currency: string;
              eclMenu_section: MenuSection[];
              name: string;
            },
            index: number
          ) => {
            const { eclMenu_section, eclMenu_currency } = eclMenus;

            return (
              <React.Fragment key={"menu-" + index}>
                {eclMenu_section &&
                  eclMenu_section.map(
                    (eclMenuSection: MenuSection, index: number) => {
                      if (eclMenuSection.sectionName === "Fridays Favs") {
                        return (
                          <>
                            <EclMenuSections
                              key={index}
                              eclMenuCurrency={eclMenu_currency}
                              eclMenuSection={eclMenuSection}
                              sectionId={"eclmenu-section-" + index}
                              id={id}
                              name={name}
                              address={address}
                            />
                          </>
                        );
                      }
                    }
                  )}
              </React.Fragment>
            );
          }
        )}
    </React.Fragment>
  );
};

export default EclMenus;
