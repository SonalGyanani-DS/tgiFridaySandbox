import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import moment from "moment";
import { Interval } from "../../types/search/locations";

/** Function to format data  */
export function join(t: string) {
  return moment(t).format("DD MMM YYYY");
}

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

export type OpenIntervals = {
  start: string;
  end: string;
};

let todayIndex: number;
let todaysTime: Date;

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function convertTo12HourFormat(time: string): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  const meridiem = hour < 12 || hour === 24 ? " AM" : " PM"; // Set AM/PM
  hour = hour % 12 || 12; // Adjust hours

  return hour?.toString() + ":" + minutesString + (meridiem ? meridiem : "");
}

export function convertTo24HourFormat(time: string): string {
  const timeParts = time.split(":");
  const hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  // const meridiem = hour < 12 || hour === 24 ? " AM" : " PM"; // Set AM/PM

  return hour?.toString() + ":" + minutesString;
}
/**
 * Function to initialize week days
 * @param week : week
 * @returns : Days
 */
function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }
  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

/**
 * Calculate random hours
 * @param week : Week
 * @param c_specific_day : Special day
 * @returns : Hours
 */

const renderHours = (week: Week, c_specific_day: [] | undefined) => {
  const dayDom: JSX.Element[] = [];
  let i = 0;
  for (const [k, v] of Object.entries(sortByDay(week))) {
    let dayDate: any = todaysTime;

    if (i > 0) {
      dayDate = new Date(dayDate.getTime() + i * 24 * 60 * 60 * 1000);
    }

    const s = join(dayDate);
    dayDate = s;
    dayDom.push(
      <DayRow
        key={k}
        dayDate={dayDate}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        holidayHours={week.holidayHours}
        c_specific_day={c_specific_day}
      />
    );
    i++;
  }

  //delivery hours
  return <tbody className="notHighlight">{dayDom}</tbody>;
};

const renderDeliveryHours = (
  deliveryWeek: Week,
  c_specific_day: [] | undefined
) => {
  const dayDomHappy: JSX.Element[] = [];
  let i = 0;
  for (const [kk, vv] of Object.entries(sortByDay(deliveryWeek))) {
    let dayDate = new Date();
    if (i > 0) {
      dayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    }
    dayDomHappy.push(
      <DayRow
        key={kk}
        dayDate={dayDate}
        dayName={kk}
        day={vv}
        isToday={isDayToday(kk)}
        holidayHours={deliveryWeek.holidayHours}
        c_specific_day={c_specific_day}
      />
    );
    i++;
  }
  return <tbody className="notHighlight">{dayDomHappy}</tbody>;
  //delivery hours
};

/**
 * Function to Check for current day
 * @param dayName : Day Name
 * @returns : Days
 */
function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

/**
 * Function to convert hours formate
 * @param time : Time
 * @param includeMeridiem : includeMeridiem
 * @returns : Converted Hours formate
 */

/**
 * Define types of data
 */
type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  dayDate: any;
  holidayHours: any;
  c_specific_day: [] | undefined;
};

/**
 * Function to return days row
 * @param props : data
 * @returns : Day Row /
 * >
 */
const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, dayDate, holidayHours, c_specific_day } =
    props;
  const [myDataAccordingToMe, setMyDataAccordingToMe]: any = React.useState({});
  let s, holidayDate;

  const holidayArray: any[] = [];
  const holidayOpenIntervals: any[] = [];
  const keysFromData = holidayHours
    ? holidayHours.map(
        (holiday: { date: string; openIntervals: Interval[] }) => {
          s = join(holiday.date);
          holidayDate = s;
          holidayArray.push(holiday);
          return holidayDate;
        }
      )
    : null;

  React.useEffect(() => {
    if (keysFromData) {
      const keysFromDataUnique = keysFromData.filter(
        (value: string, index: number, self: string) => {
          return self.indexOf(value) === index;
        }
      );

      const dataAccordingToMe: Record<string, Array<string>> = {};
      for (let index = 0; index < keysFromDataUnique.length; index++) {
        const element = keysFromDataUnique[index];
        dataAccordingToMe[element] = holidayArray.filter((fe) => {
          const matchDate = join(fe.date);
          return matchDate == element;
        });
      }

      setMyDataAccordingToMe(dataAccordingToMe);
    }
  }, []);

  let Status = false;
  let boxDay;
  for (const key in myDataAccordingToMe) {
    if (key.includes(dayDate)) {
      Status = true;
      holidayOpenIntervals.push(myDataAccordingToMe[key]);
    }
  }

  return (
    <tr className={isToday ? "currentDay notHighlight" : "notHighlight"}>
      {Status ? (
        <td className="dayName notHighlight">
          <span className="checked notHighlight"></span> {dayName}
          {c_specific_day ? (
            c_specific_day.map(
              (
                res: { holidayDate: string; holidayName: string },
                index: number
              ) => {
                return (
                  <React.Fragment key={index}>
                    {join(res.holidayDate) == dayDate ? (
                      <span>{res.holidayName}</span>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                );
              }
            )
          ) : (
            <span>(Holiday)</span>
          )}
          <span>{boxDay}</span>
        </td>
      ) : (
        <td className="dayName notHighlight">
          <span className="checked notHighlight"></span> {dayName}
        </td>
      )}
      {!day.isClosed && (
        <td className="dayTime notHighlight">
          {Status
            ? holidayOpenIntervals &&
              holidayOpenIntervals.map((res: []) => {
                return res?.map(
                  (
                    openInt: { isClosed: boolean; openIntervals: [] },
                    index: number
                  ) => {
                    return (
                      <React.Fragment key={index}>
                        {openInt.isClosed ? (
                          <div className="time-group notHighlight">
                            <span className="time-b notHighlight">Closed</span>
                          </div>
                        ) : (
                          openInt?.openIntervals &&
                          openInt.openIntervals.map(
                            (
                              res: { start: string; end: string },
                              index: number
                            ) => {
                              return (
                                <React.Fragment key={index}>
                                  <div className="time-group notHighlight">
                                    <span className="time-b notHighlight">
                                      {convertTo12HourFormat(res.start)}
                                    </span>{" "}
                                    <span className="dash notHighlight"></span>{" "}
                                    <span className="time-b notHighlight">
                                      {" "}
                                      {convertTo12HourFormat(res.end)}
                                    </span>
                                  </div>
                                </React.Fragment>
                              );
                            }
                          )
                        )}
                      </React.Fragment>
                    );
                  }
                );
              })
            : day.openIntervals.map(
                (res: { start: string; end: string }, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="time-group notHighlight">
                        <span className="time-b notHighlight">
                          {convertTo12HourFormat(res.start)}
                        </span>{" "}
                        <span className="dash notHighlight"></span>{" "}
                        <span className="time-b notHighlight">
                          {convertTo12HourFormat(res.end)}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                }
              )}
        </td>
      )}
      {day.isClosed &&
        (Status ? (
          <td className="dayTime notHighlight">
            {holidayOpenIntervals.map((res: []) => {
              return res.map((openInt: { openIntervals: [] }) => {
                return openInt.openIntervals.map(
                  (res: { start: string; end: string }, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="time-group notHighlight">
                          <span className="time-b notHighlight">
                            {" "}
                            {convertTo12HourFormat(res.start)}
                          </span>{" "}
                          <span className="dash notHighlight"></span>{" "}
                          <span className="time-b notHighlight">
                            {convertTo12HourFormat(res.end)}
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  }
                );
              });
            })}
          </td>
        ) : (
          <td className="dayTime closed notHighlight">
            <span className="time-b notHighlight">{StaticData.Closed}</span>
          </td>
        ))}
    </tr>
  );
};

/**
 * Function to generate Hours
 * @param props : Hour Value
 * @returns : Hours
 */
const Hours = (props: any) => {
  todaysTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: props.timezone })
  );
  todayIndex = new Date(
    new Date().toLocaleString("en-US", { timeZone: props.timezone })
  ).getDay();
  let s;
  let dateNewFormat;
  const {
    hours,
    additionalHoursText,
    c_onlineOrderAndReservationsTime,
    c_onlineOrderingAndReservations,
    c_specific_day,
    document,
    deliveryHours,
    c_yelpWidget,
  } = props;

  if (hours?.reopenDate) {
    s = join(hours.reopenDate);
    dateNewFormat = s;
  }
// function to check mobile view to handle hours accordion.
const [isMobile, setIsMobile] = React.useState(false);
React.useLayoutEffect(() => {
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 1200);
  };

  updateIsMobile();

  const resizeListener = () => {
    updateIsMobile();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", resizeListener);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", resizeListener);
    }
  };
}, []);
let checkisMObile:any = false;
if(!c_yelpWidget || isMobile){
  checkisMObile = true
}
  return (
    <>
      <>
        {c_yelpWidget && !isMobile? (
          <>
            {" "}
            <h3 className="box-title notHighlight">
              {document?.c_hoursHeading
                ? document?.c_hoursHeading
                : "Restaurant Hours"}
            </h3>
            <table className="day-hrs notHighlight">
              <thead className="sr-only notHighlight">
                <tr>
                  <th>{StaticData.DayOfWeek}</th>
                  <th>{StaticData.Hours}</th>
                </tr>
              </thead>
              {hours && hours?.reopenDate ? (
                <span className="notHighlight">
                  {additionalHoursText} <br/>
                  <span>
                    {" "}
                    {StaticData.ReopenMessage} {dateNewFormat}{" "}
                  </span>
                </span>
              ) : (
                <>{renderHours(hours, c_specific_day)}</>
              )}
            </table>
          </>
        ):<></>}
      </>
      {(hours && deliveryHours && (!c_yelpWidget || isMobile))? (
        <Accordion preExpanded={["a"]}>
          {!c_yelpWidget || isMobile ?(
            <AccordionItem uuid="a">
              <div className="notHighlight">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="title-with-link notHighlight">
                      <h3 className="box-title notHighlight">
                        {document.c_hoursHeading
                          ? document.c_hoursHeading
                          : "Restaurant Hours"}
                      </h3>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <table className={`day-hrs happyHours notHighlight`}>
                    <thead className="sr-only notHighlight">
                      <tr>
                        <th>{StaticData.DayOfWeek}</th>
                        <th>{StaticData.Hours}</th>
                      </tr>
                    </thead>
                    {hours && hours.reopenDate ? (
                      <span className="notHighlight">
                        {additionalHoursText} <br />
                        <span className="notHighlight">
                          {" "}
                          {StaticData.ReopenMessage} {dateNewFormat}{" "}
                        </span>
                      </span>
                    ) : (
                      <>{renderDeliveryHours(hours, c_specific_day)}</>
                    )}
                  </table>
                </AccordionItemPanel>
              </div>
            </AccordionItem>
          ):<></>}
          {deliveryHours && (
            <AccordionItem uuid={checkisMObile? "b" : "a"}>
              <div className="notHighlight">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="title-with-link notHighlight">
                      <h3 className="box-title notHighlight">
                        {document.c_deliveryHoursHeading
                          ? document.c_deliveryHoursHeading
                          : "Delivery Hours"}
                      </h3>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <table className={`day-hrs happyHours notHighlight`}>
                    <thead className="sr-only notHighlight">
                      <tr>
                        <th>{StaticData.DayOfWeek}</th>
                        <th>{StaticData.Hours}</th>
                      </tr>
                    </thead>
                    {deliveryHours && deliveryHours.reopenDate ? (
                      <span className="notHighlight">
                        {additionalHoursText} <br />
                        <span className="notHighlight">
                          {" "}
                          {StaticData.ReopenMessage} {dateNewFormat}{" "}
                        </span>
                      </span>
                    ) : (
                      <>{renderDeliveryHours(deliveryHours, c_specific_day)}</>
                    )}
                  </table>
                </AccordionItemPanel>
              </div>
            </AccordionItem>
          )}
           
        </Accordion>
      ) : (
        <>
          {(() => {
            const getTitle = () => {
              if (deliveryHours) {
                return document?.c_deliveryHoursHeading || "Delivery Hours";
              }  else {
                return document?.c_hoursHeading || "Restaurant Hours";
              }
            };

            return (
              <>
                <h3 className="box-title notHighlight">{getTitle()}</h3>
                <table className="day-hrs notHighlight">
                  <thead className="sr-only notHighlight">
                    <tr>
                      <th>{StaticData.DayOfWeek}</th>
                      <th>{StaticData.Hours}</th>
                    </tr>
                  </thead>
                  {hours && hours?.reopenDate ? (
                    <span className="notHighlight">
                      {additionalHoursText} <br />
                      <span>
                        {StaticData.ReopenMessage} {dateNewFormat}
                      </span>
                    </span>
                  ) : (
                    <>
                      {renderHours(
                        deliveryHours || hours,
                        c_specific_day
                      )}
                    </>
                  )}
                </table>
              </>
            );
          })()}
        </>
      )}
      {/* 
      
      #NOTE: online Order And Reservations Time status
      
      {c_onlineOrderAndReservationsTime && c_onlineOrderingAndReservations && (
        <>
          <h3 className="font-bold notHighlight">
            {c_onlineOrderAndReservationsTime}
            &nbsp;
            {sortByDay(c_onlineOrderingAndReservations)[
              Object.keys(sortByDay(c_onlineOrderingAndReservations))[0]
            ].openIntervals.map(
              (res: { start: string; end: string }, index: number) => {
                return (
                  <span key={index}>
                    {convertTo12HourFormat(res.start)} -{" "}
                    {convertTo12HourFormat(res.end)}
                  </span>
                );
              }
            )}
          </h3>
        </>
      )} */}
    </>
  );
};

export default Hours;
