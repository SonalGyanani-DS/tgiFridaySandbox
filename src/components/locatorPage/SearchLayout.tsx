import { Matcher, useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import ResultsCount from "./ResultCount";
import VerticalResults from "./VerticalResults";
import LocationCard from "./LocationCard";
import { SelectableFilter } from "@yext/answers-headless-react";
import { GoogleMaps, scrollToRow } from "./GoogleMaps";
import Geocode from "react-geocode";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import LoadingSpinner from "../commons/LoadingSpinner";
import { UserLocationIcon } from "../Svg/UserLocationIcon";
import {
  AnswerExperienceConfig,
  LocationResultLimitOnSearch,
  center_latitude,
  center_longitude,
  googleApikey,
  siteURL,
} from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";

import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";
import useFetchResults from "../../hooks/Fsefetchresult";
import { Wrapper } from "@googlemaps/react-wrapper";
import useGetPostalCodeLatLng from "./useGetPostalCodeLatLng";
import { Link } from "@yext/pages/components";

/** set center lat long */
const params1: {
  latitude: number;
  longitude: number;
} = { latitude: center_latitude, longitude: center_longitude };
let mapZoom = 12;
export let centerLatitude = center_latitude;
export let centerLongitude = center_longitude;

/**
 * Function to search configuration
 * @param props : Location data
 * @returns : Location
 */
const SearchLayout = (props: any): JSX.Element => {
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useFetchResults() || [];
  const [userLocationStatus, setuserLocationStatus] = useState(false);
  const [startGeoCode, setStartGeoCode] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [checkAllowed, setCheckAllowed] = useState(false);
  const { postalCode } = useGetPostalCodeLatLng();
  const [allowLocation, setAllowLocation] = React.useState("");
  const [searchString, setSearchString] = useState("United States");
  const searchActions = useSearchActions();
  const [check, setCheck] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [newParam, setNewParam] = React.useState({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = React.useState(true);
  let firstTimeRunners = true;

  /** Function to handle initial load */
  const FirstLoad = () => {
    const locationFilterSearch: SelectableFilter = {
      selected: true,
      fieldId: "builtin.location",
      value: {
        lat: centerLatitude,
        lng: centerLongitude,
        radius: 50000000,
      },
      matcher: Matcher.Near,
    };
    /**
     *
     *
     * Show result based on search from location page
     */

    setCheck(true);

    setNewParam(params1);
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.setStaticFilters([locationFilterSearch]);

    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("overflow-hidden");
    }, 2000);
  };

  const onClick = () => {
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setAllowLocation("Please allow your Location");
          setCheckAllowed(false);
        }
      };
      navigator.geolocation.getCurrentPosition(
        function (position: any) {
          Geocode.setApiKey(googleApikey);
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                scrollToRow(0);
                setuserLocationStatus(true);
                setTimeout(() => {
                  setSearchString(response.results[0].formatted_address);
                }, 1000);
                filterRef.current &&
                  filterRef.current.setInputValue(
                    response.results[0].formatted_address
                  );
                setAllowLocation("");
              }
              setCheckAllowed(true);
              setNewParam({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error: any) => {
              console.error(error);
              setCheck(false);
              setCheckAllowed(false);
            }
          );

          const params = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const locationFilter: SelectableFilter = {
            selected: true,
            fieldId: "builtin.location",
            value: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              radius: 402336,
            },
            matcher: Matcher.Near,
          };
          centerLatitude = position.coords.latitude;
          centerLongitude = position.coords.longitude;
          mapZoom = 3;
          searchActions.setStaticFilters([locationFilter]);
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(LocationResultLimitOnSearch);
          searchActions.executeVerticalQuery();
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  /** Get parent Node */

  const handleInputValue = () => {
    setInputValue("");
  };

  const handleSetUserShareLocation = (value: any) => {
    setInputValue(value);
  };

  /** Load data on first load */
  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
    if (isLoading) {
      document.body.classList.add("overflow-hidden");
    }
  }, []);

  /**
   * Change marker position in case of user location allowed
   * @param address :address
   */
  function getCoordinates(address: any) {
    setSearchString(address.trim());
    setCheck(true);
    filterRef.current?.setInputValue(address.trim());
    postalCode(address, newParam, checkAllowed);
  }

  /** Page loader */
  const loader = isLoading ? <LoadingSpinner /> : "";

  /** Add class in mapView in case of mobile view */
  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setMobile(true);
  };

  /** Location result */

  return (
    <>
      {loader}
      <Wrapper
        apiKey={googleApikey}
        language={AnswerExperienceConfig.locale}
        libraries={["places", "geometry"]}
      >
        <div className="breadcrumb">
          <ul>
            <li>
              <Link
                href={siteURL}
                className="home"
                data-ya-track={StaticData.Home}
                eventName={StaticData.Home}
                rel="noopener noreferrer"
              >
                <div />
                {StaticData.Home}
              </Link>
            </li>
            <li>{StaticData.locator_breadcrumb}</li>
          </ul>
        </div>

        <div className="locator-main">
          {allowLocation.length > 0 ? (
            <div className="for-allow">{allowLocation}</div>
          ) : (
            ""
          )}
          <div className="search-bx">
            <div className="location-with-filter">
              <h2 className="font-semibold text-slate-900 uppercase">
                {StaticData.FindsTGIFridaysnearme}
              </h2>

              <button
                className="useMyLocation"
                title="Search using your current location!"
                id="useLocation"
                onClick={onClick}
              >
                <span className="icon">
                  <UserLocationIcon />
                </span>

                {StaticData.UseMyLocation}
              </button>
            </div>
            <div className="search-field">
              <FilterSearch
                ref={filterRef}
                setSearchString={setSearchString}
                setCheckAllowed={setCheckAllowed}
                errorStatus={errorStatus}
                setErrorStatus={setErrorStatus}
                checkAllowed={checkAllowed}
                displayMessage={displayMessage}
                getCoordinates={getCoordinates}
                setDisplayMessage={setDisplayMessage}
                setuserLocationStatus={setuserLocationStatus}
                userLocationStatus={userLocationStatus}
                customCssClasses={{
                  filterSearchContainer: "m-2 w-full",
                  inputElement: "FilterSearchInput pr-[90px]",
                  optionsContainer: "options",
                }}
                inputValue={inputValue}
                setSearchInputValue={setInputValue}
                params={params1}
                startGeoCode={startGeoCode}
                setStartGeoCode={setStartGeoCode}
                searchFields={[
                  {
                    entityType: "location",
                    fieldApiName: "address.postalCode",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.city",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.region",
                  },
                ]}
                handleInputValue={handleInputValue}
                handleSetUserShareLocation={handleSetUserShareLocation}
                label={""}
                sectioned={false}
                handleEndPoimtCallBack={props.handleEndPoimtCallBack}
              />
            </div>
          </div>

          <div className="mobile-button">
            <div className="button-bx notHighligh">
              <button
                className="btn listBtn"
                title="ListView"
                onClick={() => {
                  document.body.classList.remove("mapView");
                }}
              >
                {" "}
                {StaticData.ListView}
              </button>
              <button className="btn mapBtn" title="mapVIew" onClick={addClass}>
                {" "}
                {StaticData.MapView}
              </button>
            </div>
          </div>

          <div className=" map-section ">
            <GoogleMaps
              apiKey={googleApikey}
              centerLatitude={centerLatitude}
              mobile={mobile}
              setMobile={setMobile}
              centerLongitude={centerLongitude}
              check={check}
              defaultZoom={mapZoom}
              showEmptyMap={true}
            />
          </div>
          <div className="left-listing">
            <ResultsCount searchString={searchString} />
            <PerfectScrollbar>
              <div>
                {locationResults && locationResults.length > 0 ? (
                  <VerticalResults
                    displayAllOnNoResults={false}
                    locationResults={locationResults}
                    customCssClasses={{
                      verticalResultsContainer:
                        "result-list flex flex-col scroll-smooth  overflow-auto",
                    }}
                    CardComponent={LocationCard}
                  />
                ) : (
                  !loader && (
                    <div className="p-4 bg-white">
                      <p>
                        {props._site.c_noResultFoundMessage
                          ? props._site.c_noResultFoundMessage
                          : StaticData.NoStoresFound}
                      </p>
                    </div>
                  )
                )}
                <div className="button-bx loadmore-listing">
                  <ViewMore
                    className={" btn notHighlight !mb-2 button view-more"}
                    idName={"view-more-button"}
                    buttonLabel={"View More"}
                  />
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SearchLayout;
