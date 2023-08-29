import { useRef, useState } from "react";
import {
  useSearchActions,
  FilterSearchResponse,
  SearchParameterField,
  Filter,
} from "@yext/search-headless-react";
import { processTranslation } from "./utils/processTranslation";
import { useSynchronizedRequest } from "../../hooks/useSynchronizedRequest";
import renderAutocompleteResult, {
  AutocompleteResultCssClasses,
} from "./utils/renderAutocompleteResult";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import { AnswerExperienceConfig } from "../../../sites-global/global";
import * as React from "react";
import GoogleInput from "./GoogleInput";
import { Options } from "@splidejs/splide";

const SCREENREADER_INSTRUCTIONS = "";

interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}

export interface DropdownSectionCssClasses {
  sectionContainer?: string;
  sectionLabel?: string;
  optionsContainer?: string;
  optionContainer?: string;
  focusedOption?: string;
}

export interface FilterSearchCssClasses
  extends InputDropdownCssClasses,
    DropdownSectionCssClasses,
    AutocompleteResultCssClasses {
  container?: string;
  label?: string;
  filterSearchContainer?: string;
}

const builtInCssClasses: FilterSearchCssClasses = {
  container: "mb-2 w-full",
  label: "mb-4 text-sm font-medium text-gray-900",
  dropdownContainer:
    "absolute z-10 shadow-lg w-full border border-[#8c8c8c] bg-white pt-3 pb-1 px-4 mt-1",
  inputElement:
    "text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600",
  sectionContainer: "pb-2",
  sectionLabel: "text-sm text-gray-700 font-semibold pb-2",
  focusedOption: "bg-gray-100",
  option: "text-sm text-gray-700 pb-1 cursor-pointer",
};

type LatLngParams = { latitude: number; longitude: number };
export interface FilterSearchProps {
  label: string;
  sectioned: boolean;
  searchFields: Omit<SearchParameterField, "fetchEntities">[];
  customCssClasses?: FilterSearchCssClasses;
  cssCompositionMethod?: CompositionMethod;
  searchInputValue?: (value: string) => void;
  handleInputValue: () => void;
  handleSetUserShareLocation: (value: string, userShareStatus: boolean) => void;
  inputValue: string;
  params: LatLngParams;
  setSearchString: (value: string) => void;
  setuserLocationStatus: (value: boolean) => void;
  userLocationStatus: boolean;
  displayMessage: boolean;
  setDisplayMessage: (value: boolean) => void;
  setSearchInputValue: (value: string) => void;
  startGeoCode: boolean;
  setStartGeoCode: (value: boolean) => void;
  getCoordinates: (value: string) => void;
  setCheckAllowed: (value: boolean) => void;
  errorStatus: boolean;
  setErrorStatus: (value: boolean) => void;
  checkAllowed: boolean;
  handleEndPoimtCallBack: string;
  Placeholder?: string;
}

type FilterHandle = {
  setInputValue: (value: string) => void;
  setParam: (param: LatLngParams) => void;
  getInputValue: () => string;
};

/** Function to Filter Result based on user query */
const FilterSearch = React.forwardRef<FilterHandle, FilterSearchProps>(
  (
    {
      sectioned,
      searchFields,
      customCssClasses,
      cssCompositionMethod,
      handleInputValue,
      handleSetUserShareLocation,
      inputValue,
      params,
      displayMessage,
      setDisplayMessage,
      setSearchString,
      setuserLocationStatus,
      userLocationStatus,
      setStartGeoCode,
      getCoordinates,
      setCheckAllowed,
      errorStatus,
      setErrorStatus,
      Placeholder,
    }: FilterSearchProps,
    ref
  ): JSX.Element => {
    /** Defined states to used in search */
    const searchAction = useSearchActions();
    const [input, setInput] = useState(inputValue);
    const [newParam, setNewParam] = useState<LatLngParams>(params);
    const selectedFilterOptionRef = useRef<Filter | null>(null);

    /** Push search fields */
    const searchParamFields = searchFields.map((searchField) => {
      return { ...searchField, fetchEntities: false };
    });

    /** set input value and return result  */
    React.useImperativeHandle(ref, () => {
      return {
        setInputValue: (value: string) => setInput(value),
        setParam: (param: LatLngParams) => setNewParam(param),
        getInputValue: () => {
          return input;
        },
      };
    });

    /** Css Classes */
    const cssClasses = useComposedCssClasses(
      builtInCssClasses,
      customCssClasses,
      cssCompositionMethod
    );

    /** State to get response */
    const [filterSearchResponse] = useSynchronizedRequest<
      string,
      FilterSearchResponse
    >((inputValue) =>
      searchAction.executeFilterSearch(
        inputValue ?? "",
        sectioned,
        searchParamFields
      )
    );
    let sections: { results: Options; label?: string }[] = [];

    /** Return response */
    if (filterSearchResponse) {
      sections = filterSearchResponse.sections.map((section) => {
        return {
          results: section.results.map((result) => {
            return {
              value: result.value,
              onSelect: () => {
                setInput(result.value);

                if (result?.filter) {
                  if (selectedFilterOptionRef.current) {
                    searchAction.setFilterOption({
                      ...selectedFilterOptionRef.current,
                      selected: false,
                    });
                  }

                  selectedFilterOptionRef.current = result.filter;
                  searchAction.setFilterOption({
                    ...result.filter,
                    selected: true,
                  });
                  searchAction.setOffset(0);
                  searchAction.setVerticalLimit(AnswerExperienceConfig.limit);
                  searchAction.executeVerticalQuery();
                }
              },
              display: renderAutocompleteResult(result, cssClasses),
            };
          }),
          label: section.label,
        };
      });
    }

    sections = sections.filter((section) => section.results.length > 0);

    let screenReaderText = processTranslation({
      phrase: `0 autocomplete option found.`,
      pluralForm: `0 autocomplete options found.`,
      count: 0,
    });
    if (sections.length > 0) {
      const screenReaderPhrases = sections.map((section) => {
        const optionInfo = section.label
          ? `${section.results.length} ${section.label}`
          : `${section.results.length}`;
        return processTranslation({
          phrase: `${optionInfo} autocomplete option found.`,
          pluralForm: `${optionInfo} autocomplete options found.`,
          count: section.results.length,
        });
      });
      screenReaderText = screenReaderPhrases.join(" ");
    }

    /** Initialize map  based on the locations list*/
    return (
      <div className={cssClasses.container}>
        <GoogleInput
          inputValue={input}
          errorStatus={errorStatus}
          setErrorStatus={setErrorStatus}
          setCheckAllowed={setCheckAllowed}
          getCoordinates={getCoordinates}
          setSearchString={setSearchString}
          displayMessage={displayMessage}
          setDisplayMessage={setDisplayMessage}
          params={newParam}
          setStartGeoCode={setStartGeoCode}
          placeholder={Placeholder}
          screenReaderInstructions={SCREENREADER_INSTRUCTIONS}
          screenReaderText={screenReaderText}
          onlyAllowDropdownOptionSubmissions={true}
          setuserLocationStatus={setuserLocationStatus}
          userLocationStatus={userLocationStatus}
          onInputChange={(newInput: string) => {
            setInput(newInput);
            handleInputValue();
          }}
          cssClasses={cssClasses}
          handleSetUserShareLocation={handleSetUserShareLocation}
          handleInputValue={handleInputValue}
        />
      </div>
    );
  }
);
FilterSearch.displayName = "FilterSearch";
export default FilterSearch;
