import * as React from "react";
import { Link } from "@yext/pages/components";
import { Ctas } from "../../types/LocationSections";

const AnalyticsLink = (props: { props: Ctas, tagName?:string; }) => {
  return (
    <>
      {props.props.linkType == "URL" ? (
        <>
          <Link
            href={props.props.link}
            data-ya-track={props.tagName}
            eventName={props.tagName}
            rel="noopener noreferrer"
          >
            {props.props.label}
          </Link>
        </>
      ) : props.props.linkType == "OTHER" ? (
        <>
          <Link
            href={props.props.link}
            target="_blank"
            data-ya-track={props.tagName}
            eventName={props.tagName}
            rel="noopener noreferrer"
          >
            {props.props.label}
          </Link>
        </>
      ) : props.props.linkType == "PHONE" ? (
        <>
          <Link
            href={`tel:${props.props.link}`}
            data-ya-track={props.tagName}
            eventName={props.tagName}
            rel="noopener noreferrer"
          >
            {props.props.label}
          </Link>
        </>
      ) : props.props.linkType == "Email" ? (
        <>
          <Link
            href={`mailto:${props.props.link}`}
            data-ya-track={props.tagName}
            eventName={props.tagName}
            rel="noopener noreferrer"
          >
            {props.props.label}
          </Link>
        </>
      ) : (
        <Link
          href="#"
          data-ya-track={props.tagName}
          eventName={props.tagName}
          rel="noopener noreferrer"
        >
          {props.props.label}
        </Link>
      )}
    </>
  );
};

export default AnalyticsLink;
