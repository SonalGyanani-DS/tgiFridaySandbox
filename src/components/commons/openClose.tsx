import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import Timer from "../locationDetail/countdown";
import { convertTo12HourFormat, convertTo24HourFormat, join } from "./hours";
import { useCallback } from "react";
import { SetCurrentActiveOpenCloseType } from "../../types/search/locations";
export const OpenAccordian = false;
/**
 * Function to show open close status of location
 */
const openClose = {
  formatOpenNowString: (
    hoursData: any,
    timeZone: string,
    Nearby: string,
    setCurrentActiveOpenClose: SetCurrentActiveOpenCloseType,
    locationId: string
  ) => {
    const now = new Date();
    const currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    );

    const tomorrow = new Date(currentTime.getTime() + 60 * 60 * 24 * 1000);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    let nextTomorrow = new Date(tomorrow.getTime() + 86400000);
    let Day = 0;
    const yesterday = new Date(tomorrow.getTime() - 86400000 - 86400000);
    const nowTimeNumber =
      currentTime.getHours() + currentTime.getMinutes() / 60;

    const intervalsToday = openClose.getIntervalOnDate(currentTime, hoursData);
    const intervalsTomorrow = openClose.getIntervalOnDate(tomorrow, hoursData);
    const intervalsNextTomorrow = openClose.getIntervalOnDate(
      nextTomorrow,
      hoursData
    );
    const intervalsYesterday = openClose.getIntervalOnDate(
      yesterday,
      hoursData
    );

    let openRightNow = false;
    let currentInterval = null;
    let nextInterval = null;

    if (intervalsYesterday) {
      for (let i = 0; i < intervalsYesterday.length; i++) {
        const interval = intervalsYesterday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          convertTo12HourFormat(interval.start)
        );
        const endIntervalNumber = openClose.timeStringToNumber(
          convertTo12HourFormat(interval.end)
        );

        // If end overflows to the next day (i.e. today).
        if (endIntervalNumber < startIntervalNumber) {
          if (nowTimeNumber < endIntervalNumber) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
      }
    }
    // Assumes no overlapping intervals
    if (intervalsToday) {
      for (let i = 0; i < intervalsToday.length; i++) {
        const interval = intervalsToday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          convertTo24HourFormat(interval.start)
        );
        let endIntervalNumber = openClose.timeStringToNumber(
          convertTo24HourFormat(interval.end)
        );
        // If current time doesn't belong to one of yesterdays interval.
        if (endIntervalNumber < startIntervalNumber) {
          endIntervalNumber += 24;
        }
        if (currentInterval == null) {
          if (endIntervalNumber < startIntervalNumber) {
            if (nowTimeNumber >= startIntervalNumber) {
              currentInterval = interval;
              openRightNow = true;
            }
          } else if (
            nowTimeNumber >= startIntervalNumber &&
            nowTimeNumber < endIntervalNumber
          ) {
            currentInterval = interval;
            openRightNow = true;
          }
        }

        if (nextInterval == null) {
          if (startIntervalNumber > nowTimeNumber) {
            nextInterval = interval;
          }
        } else {
          if (
            startIntervalNumber > nowTimeNumber &&
            startIntervalNumber <
              openClose.timeStringToNumber(
                convertTo12HourFormat(nextInterval.start)
              )
          ) {
            nextInterval = interval;
          }
        }
      }
    }

    let nextIsTomorrow = false;
    // If no more intervals in the day
    if (nextInterval == null) {
      if (intervalsTomorrow) {
        if (intervalsTomorrow.length > 0) {
          nextInterval = intervalsTomorrow[0];
          Day = tomorrow.getDay();
          nextIsTomorrow = true;
        }
      } else if (intervalsNextTomorrow) {
        if (intervalsNextTomorrow.length > 0) {
          nextInterval = intervalsNextTomorrow[0];
          Day = nextTomorrow.getDay();
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000);
        Day = nextTomorrow.getDay();
        const nextIntervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextIntervals.length > 0) {
          nextInterval = nextIntervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 172800000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 172800000);
        Day = nextTomorrow.getDay();
        const nextIntervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextIntervals.length > 0) {
          nextInterval = nextIntervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000 + 172800000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000 + 172800000);
        Day = nextTomorrow.getDay();
        const nextIntervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextIntervals.length > 0) {
          nextInterval = nextIntervals[0];
          nextIsTomorrow = true;
        }
      }
    }

    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    /**
     * Function for the hours accordion
     */
    const openTime = useCallback(() => {
      setCurrentActiveOpenClose((prevValue: null | string) =>
        prevValue === locationId ? null : locationId
      );
    }, []);

    if (openRightNow) {
      if (
        currentInterval.start === "00:00" &&
        currentInterval.end === "23:59"
      ) {
        return (
          <div
            onClick={openTime}
            key={"statusDOM1"}
            className={
              Nearby
                ? " cursor-default flex notHighlight w-fit"
                : "flex items-center notHighlight cursor-pointer w-fit"
            }
          >
            Open 24 Hours{" "}
            {!Nearby && <span className="arrow-down notHighlight"></span>}
          </div>
        );
      } else {
        return (
          <div className={"openDot green-dot"}>
            <div className="location-icon notHighlight"></div>
            <div className="hours-info">
              {" "}
              <div
                className={
                  Nearby
                    ? " cursor-default flex notHighlight w-fit"
                    : "flex items-center notHighlight cursor-pointer w-fit"
                }
                onClick={openTime}
                key={"statusDOM2"}
              >
                {" "}
                <span className="currentStatus notHighlight">
                  {" "}
                  Open Now{" "}
                </span>{" "}
                {!Nearby && <span className="arrow-down notHighlight"></span>}
              </div>
              <span className="notHighlight">Closes at</span>{" "}
              <span className="notHighlight">
                {openClose.formatTime(currentInterval.end).replace(":00", "")}
              </span>{" "}
            </div>
          </div>
        );
      }
    } else if (nextInterval) {
      if (nextIsTomorrow) {
        return (
          <div className={"closedDot 4"}>
            <div className="red-dot">
              <div className="location-icon notHighlight"></div>
              <div className="hours-info">
                <div
                  className={
                    Nearby
                      ? " cursor-default flex notHighlight w-fit"
                      : "flex items-center notHighlight cursor-pointer w-fit"
                  }
                  onClick={openTime}
                  key={"statusDOM3"}
                >
                  {" "}
                  <span className="notHighlight currentStatus close1" key={"close1"}>
                    Closed{" "}
                  </span>{" "}
                  {!Nearby && <span className="arrow-down notHighlight"></span>}
                </div>
                <span className=" notHighlight">{"Opens at "}</span>
                <span className=" notHighlight">
                  {openClose.formatTime(nextInterval.start).replace(":00", "")}
                </span>{" "}
                {week[Day]}
              </div>
            </div>{" "}
          </div>
        );
      } else {
        return (
          <div className={"closedDot 3"}>
            <div className="red-dot closedDot">
              <div className="location-icon notHighlight"></div>
              <div className="hours-info">
                <div
                  className={`cursor-${Nearby ? 'default' : 'pointer'} flex items-center notHighlight w-fit`}
                  onClick={openTime}
                  key={"statusDOM4"}
                >
                  <span className="notHighlight currentStatus close2" key={"close2"}>
                    Closed
                  </span>
                  {!Nearby && <span className="arrow-down notHighlight"></span>}
                </div>
                <span className="notHighlight">Opens at </span>
                <span className="notHighlight">
                  {openClose.formatTime(nextInterval.start).replace(":00", "")}
                </span>
              </div>
            </div>
          </div>
        );        
      }
    } else {
      return (
        <div className="closedDot 2">
          <div className="red-dot closedDot">
            <div className="location-icon notHighlight"></div>
            <div className="hours-info notHighlight currentStatus close3" key={"close3"}>
              Closed
            </div>{" "}
          </div>
        </div>
      );
    }
  },
  getYextTimeWithUtcOffset: (entityUtcOffsetSeconds: number) => {
    const now = new Date();
    let utcOffset = 0;
    if (entityUtcOffsetSeconds) {
      utcOffset = entityUtcOffsetSeconds * 1000;
    }
    if (utcOffset !== 0) {
      const localUtcOffset = now.getTimezoneOffset() * 60 * 1000;
      return new Date(now.valueOf() + utcOffset + localUtcOffset);
    }
    return now;
  },
  parseTimeZoneUtcOffset: (timeString: string) => {
    if (!timeString) {
      return 0;
    }
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    if (hours < 0) {
      return -(Math.abs(hours) + minutes / 60) * 60 * 60;
    }
    return (hours + minutes / 60) * 60 * 60;
  },

  timeStringToNumber: (timeString: string) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours + minutes / 60;
  },
  getIntervalOnDate: (date: Date, hoursData: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const dateString =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    const dayOfWeekString = days[date.getDay()];

    // Check for holiday
    if (hoursData?.holidayHours) {
      for (let i = 0; i < hoursData?.holidayHours.length; i++) {
        const holiday = hoursData?.holidayHours[i];
        if (holiday.date == dateString) {
          if (holiday.openIntervals) {
            return holiday.openIntervals;
          } else if (holiday.isClosed === true) {
            return null; // On holiday but closed
          }
        }
      }
    }

    // Not on holiday
    if (
      hoursData[dayOfWeekString] &&
      hoursData[dayOfWeekString]?.openIntervals
    ) {
      return hoursData[dayOfWeekString]?.openIntervals;
    } else {
      return null;
    }
  },
  formatTime: (time: string) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";
    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
    });
  },
};

/**
 * Function to show open close status of location
 */
function OpenClose(props: any) {
  const { setCurrentActiveOpenClose, locationId } = props;
  let s;
  let dateNewFormat;

  if (props?.hours && props.hours?.reopenDate) {
    s = join(props?.hours.reopenDate);
    dateNewFormat = s;
  }

  return (
    <>
      {props?.hours && props.hours?.reopenDate ? (
        <>
          <h3 className="text-2xl md:text-[28px] notHighlight">
            {StaticData.tempClosed}
          </h3>
          <p className="mt-4">
            <Timer dateNewFormat={dateNewFormat} hours={props?.hours} />
          </p>{" "}
        </>
      ) : props?.hours ? (
        <div className="closing-div">
          {openClose.formatOpenNowString(
            props.hours,
            props.timezone,
            props.ArrowIcon,
            setCurrentActiveOpenClose,
            locationId
          )}
        </div>
      ) : (
        <h3 className=" notHighlight close3" key={"close3"}>Closed</h3>
      )}
    </>
  );
}
export default OpenClose;
