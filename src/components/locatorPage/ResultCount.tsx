import { useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import { FilterSearchCssClasses } from "./FilterSearch";

interface ResultsCountCssClasses {
  container?: string;
  text?: string;
  number?: string;
}

const builtInCssClasses: ResultsCountCssClasses = {
  container: "pb-7 md:pb-4",
  text: "",
  number: "",
};

export interface ResultsCountConfig {
  resultsCount?: number;
  resultsLength?: number;
  searchString?: string;
  offset?: number;
  customCssClasses?: FilterSearchCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * Function to calculate location count With search String
 * @param props : Custom CSS
 * @returns : Location Count
 */
export default function ResultsCount(props: ResultsCountConfig) {
  const { searchString } = props;
  const resultsCount =
    useSearchState((state) => state.vertical?.resultsCount) || 0;
  const resultsLength =
    useSearchState((state) => state.vertical?.results?.length) || 0;
  const offset = useSearchState((state) => state.vertical?.offset) || 0;

  return (
    <ResultsCountDisplay
      resultsCount={resultsCount}
      resultsLength={resultsLength}
      offset={offset}
      searchString={searchString}
      {...props}
    />
  );
}
export function ResultsCountDisplay({
  resultsCount = 0,
  resultsLength = 0,
  searchString,
  customCssClasses,
  cssCompositionMethod,
}: ResultsCountConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  if (resultsLength === 0) {
    return null;
  }

  return (
    <div className={cssClasses.container}>
      {searchString ? (
        <>
          <h3 className="uppercase">{StaticData.LocationResults}</h3>
          <div className="text-[#464646] text-base">
            {resultsCount + " Locations near "} <span>{searchString}</span>{" "}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
