import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  AnswerExperienceConfig,
  center_latitude,
  center_longitude,
} from "../../../sites-global/global";
import * as React from "react";
import { KeyboardEvent, useRef, useEffect, useState } from "react";
import { Matcher, SelectableFilter } from "@yext/answers-headless-react";
import { scrollToRow } from "./GoogleMaps";
import { SearchIcon } from "../Svg/SearchIcon";
import { StaticData } from "../../../sites-global/staticData";

export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  filterSearchContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}

interface Props {
  setSearchString: (value: string) => void;
  setuserLocationStatus: (value: boolean) => void;
  userLocationStatus: boolean;
  params: { latitude: number; longitude: number };
  setStartGeoCode: (value: boolean) => void;
  getCoordinates: (value: string) => void;
  setCheckAllowed: (value: boolean) => void;
  errorStatus: boolean;
  setErrorStatus: (value: boolean) => void;
  inputValue?: string;
  displayMessage?: boolean;
  setDisplayMessage: (value: boolean) => void;
  placeholder?: string;
  screenReaderInstructions: string;
  screenReaderText: string;
  onlyAllowDropdownOptionSubmissions?: boolean;
  forceHideDropdown?: boolean;
  onSubmit?: (value: string) => void;
  renderSearchButton?: () => JSX.Element | null;
  renderLogo?: () => JSX.Element | null;
  onInputChange: (value: string) => void;
  onInputFocus?: (value: string) => void;
  onDropdownLeave?: (value: string) => void;
  cssClasses?: InputDropdownCssClasses;
  handleSetUserShareLocation: (value: string, userShareStatus: boolean) => void;
  handleInputValue: () => void;
}

/**
 *  Get input value and set suggestions | Show result based on selected query from suggestions
 *
 */
export default function GoogleInput({
  inputValue = "",
  setSearchString,
  renderSearchButton = () => null,
  onInputChange,
  cssClasses = {},
  handleInputValue,
  userLocationStatus,
  setuserLocationStatus,
  params,
  getCoordinates,
  setCheckAllowed,
  errorStatus,
  setErrorStatus,
}: React.PropsWithChildren<Props>): JSX.Element | null {
  /** page states to render , handle cases  */
  const [allowLocation] = React.useState("");
  const [latestUserInput, setLatestUserInput] = useState(inputValue);
  const [childrenKey, setChildrenKey] = useState(0);
  const [keyUpStatus, setKeyUpStatus] = useState(true);
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchActions = useSearchActions();
  const [focusedOptionId] = useState<string | undefined>(undefined);

  /**defined google Auto complete */
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const googleLib = typeof google !== "undefined" ? google : null;

  /**
   * Handles changing which section should become focused when focus leaves the currently-focused section.
   * @param pastSectionEnd Whether the section focus left from the end or the beginning of the section.
   */
  const locationFilter: SelectableFilter = {
    selected: true,
    fieldId: "builtin.location",
    value: {
      lat: center_latitude,
      lng: center_longitude,
      radius: 50000000,
    },
    matcher: Matcher.Near,
  };

  /** Handle document key , Function to handle key events */
  function handleDocumentKeyUp(evt: KeyboardEvent<HTMLInputElement>) {
    handleInputValue();
    if (evt.key == "Enter" && latestUserInput == "" && inputValue == "") {
      setErrorStatus(true);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
    if (evt.key === "Backspace" || evt.key === "x" || evt.key === "Delete") {
      if (inputValue == "") {
        setuserLocationStatus(false);
        scrollToRow(0);
        setSearchString("United States");
        setCheckAllowed(false);
        setLatestUserInput("");
        if (keyUpStatus && !loading) {
          searchActions.setStaticFilters([locationFilter]);
          searchActions.setQuery("");
          searchActions.setOffset(0);
          searchActions.setUserLocation(params);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
          setKeyUpStatus(false);
        }
      }
    }
  }

  /** change states & show result accordingly when user search */
  useEffect(() => {
    if (inputValue != "") {
      setKeyUpStatus(true);
      setErrorStatus(false);
      setLatestUserInput(inputValue);
    } else {
      setCheckAllowed(false);
    }
  }, [inputValue]);

  /** Function to show result & select first suggestion on enter */
  useEffect(() => {
    if (googleLib && typeof google.maps === "object") {
      const pacInput: HTMLInputElement = document?.getElementById(
        "pac-input"
      ) as HTMLInputElement;

      const options: google.maps.places.AutocompleteOptions = {
        componentRestrictions: { country: "usa" },
        fields: ["address_component", "geometry"],
      };
      const autoComplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      if (autoComplete) {
        const pacSelectFirst = (input: HTMLInputElement) => {
          const _addEventListener = input.addEventListener;

          const getEvent = () => {
            const keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 40;
              },
            });
            Object.defineProperty(keydown, "which", {
              get: function () {
                return 40;
              },
            });
            input.dispatchEvent(keydown);
          };
          function addEventListenerWrapper(
            type: string,
            listener: EventListenerOrEventListenerObject
          ) {
            if (type === "keydown") {
              const orig_listener = listener;

              listener = function (event: KeyboardEvent | Event) {
                const suggestion_selected =
                  document.getElementsByClassName("pac-item-selected").length >
                  0;
                if (
                  ((event as KeyboardEvent).which == 13 ||
                    (event as KeyboardEvent).which == 9) &&
                  !suggestion_selected
                ) {
                  getEvent();
                  (orig_listener as EventListener).apply(input, [
                    event as Event,
                  ]);
                }

                (orig_listener as EventListener).apply(input, [event as Event]);
              };
            }

            _addEventListener.apply(input, [type, listener]);
          }

          if (input.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        };

        setAutocomplete(autoComplete);
        pacSelectFirst(pacInput);

        google.maps.event.addListener(
          autoComplete,
          "place_changed",
          function () {
            const searchKey: string = pacInput.value;
            const place = autoComplete.getPlace();
            scrollToRow(0);
            if (searchKey && place.address_components != undefined) {
              getCoordinates(searchKey.trim());
            } else {
              setLatestUserInput(inputValue.trim());
              getCoordinates(searchKey.trim());
            }
          }
        );
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);

  /** Search function to return result on button click */
  const FindInput = () => {
    const pacInput: HTMLInputElement = document.getElementById(
      "pac-input"
    ) as HTMLInputElement;
    const Search: string = pacInput.value;
    const suggestion_selected =
      document.getElementsByClassName("pac-item-selected").length > 0;
    if (!suggestion_selected) {
      setLatestUserInput(inputValue.trim());
      getCoordinates(Search.trim());
    } else {
      if (Search != "") {
        getCoordinates(Search.trim());
      } else {
        getCoordinates(inputValue.trim());
      }
    }
  };

  /** Render Input element HTMl */
  return (
    <>
      <div className="locator-find-block">
        {allowLocation.length > 0 ? (
          <div className="for-allow">{allowLocation}</div>
        ) : (
          ""
        )}
        <div id="SearchBarLabel" className="search-form">
          <input
            id="pac-input"
            type="text"
            aria-label="search-form"
            placeholder={"Enter City or ZIP Code"}
            className="FilterSearchInput"
            onChange={(evt) => {
              const value = evt.target.value;
              setLatestUserInput(value);
              onInputChange(value);
              setChildrenKey(childrenKey + 1);
            }}
            onKeyUp={handleDocumentKeyUp}
            value={inputValue !== "" ? inputValue : latestUserInput}
            ref={inputRef}
            aria-labelledby={"SearchBarLabel"}
            aria-activedescendant={focusedOptionId}
          />
          {errorStatus && (
            <span className="Error-msg">{StaticData.fillInput}</span>
          )}

          <div className={cssClasses.searchButtonContainer}>
            {renderSearchButton()}
          </div>
        </div>
      </div>

      <button
        className="search-btn"
        aria-label="Search bar icon"
        id="search-location-button"
        onClick={() => {
          if (userLocationStatus == false) {
            if (latestUserInput == "" && inputValue == "") {
              setErrorStatus(true);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
            const pacInput: HTMLInputElement = document?.getElementById(
              "pac-input"
            ) as HTMLInputElement;
            const keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 13;
              },
            });

            Object.defineProperty(keydown, "which", {
              get: function () {
                return 13;
              },
            });

            pacInput.dispatchEvent(keydown);

            FindInput();
          }
        }}
      >
        <SearchIcon />
        <span />
      </button>
    </>
  );
}
