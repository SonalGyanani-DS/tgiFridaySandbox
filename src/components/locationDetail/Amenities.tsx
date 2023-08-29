import * as React from "react";
import {
  AmenitiesDataType,
  ItemsListDataType,
} from "../../types/LocationSections";

/** Amenities section beside review  */

export const Amenities = (props: AmenitiesDataType) => {
  const { c_amenitiesList, c_amenitiesHeading } = props;

  return (
    <>
      {c_amenitiesList ? (
        <div className="amenities-wrapper">
          {c_amenitiesHeading ? <h3>{c_amenitiesHeading}</h3> : ""}
          {c_amenitiesHeading ? (
            <div className="flex justify-start flex-wrap gap-y-5 md:gap-y-7 mt-7">
              {c_amenitiesList
                ? c_amenitiesList.map((itemsList: ItemsListDataType) => (
                    <>
                      <div className="amenities-inner basis-full md:basis-1/3">
                        <div className="flex">
                          <div>
                            {itemsList?.title ? (
                              <h2>{itemsList?.title}</h2>
                            ) : (
                              ""
                            )}
                            {itemsList?.list ? (
                              <ul className="amenities-list">
                                {itemsList.list.map(
                                  (item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
