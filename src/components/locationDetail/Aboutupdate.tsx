/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "@yext/pages/components";
import * as React from "react";
import { Ctas } from "../../types/LocationSections";

interface AboutupdateItemsType {
  image?: { url: string } | undefined;
  heading?: string;
  description?: string[];
  cTAs?: Ctas;
}

/** Store information section for detail page */
export const Aboutupdate = (props: { c_aboutupdate: AboutupdateItemsType }) => {
  const { c_aboutupdate } = props;

  return (
    <div>
      <div>
        <section
          className={
            c_aboutupdate?.image?.url
              ? "img-with-content with-image"
              : "img-with-content"
          }
        >
          <div className="container">
            <div className="content-wrapper reverse-blocks">
              {c_aboutupdate?.image?.url && (
                <div className="img-block">
                  <img
                    src={c_aboutupdate?.image.url}
                    height={"1180"}
                    width={"1440"}
                    alt="mockup"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="content-block">
                <h3>{c_aboutupdate?.heading && c_aboutupdate?.heading}</h3>
                {c_aboutupdate?.description &&
                  c_aboutupdate.description.map(
                    (data: string, index: number) => <p key={index}>{data}</p>
                  )}
                {c_aboutupdate?.cTAs ? (
                  <Link
                    eventName={c_aboutupdate?.cTAs?.label}
                    href={c_aboutupdate?.cTAs.link}
                    data-ya-track={c_aboutupdate?.cTAs?.label}
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    {c_aboutupdate.cTAs?.label}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
