import * as React from "react";
import "../../index.css";
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../../sites-global/staticData";
import AnalyticsLink from "../commons/AnalyticsLink";
import { Link } from "@yext/pages/components";
import RtfConverter from "@yext/rtf-converter";
import { ImageThumbnail, SiteData } from "../../types/search/locations";
import { CtaData } from "@yext/search-ui-react";

/**
 * Fetch data and map in HTMl.
 * @param props : Footer Data.
 * @returns : Footer.
 */
const Footer = (props: {_site:SiteData}) => {
  const { _site } = props;
  return (
    <>
      <footer className="site-footer">
        <div className="copyright-bx">
          <div className="w-[100%]">
            <ul className="social-media-bx">
              {_site?.c_socialIcons &&
                _site?.c_socialIcons.map(
                  (
                    c_socialIcon: { logo: ImageThumbnail; cTA: CtaData },
                    index: number
                  ) => {
                    return (
                      <li className="component" key={index}>
                        <Link
                          href={c_socialIcon.cTA.link}
                          data-ya-track={"social_link" + (index + 1)}
                          eventName={"social_link" + (index + 1)}
                          rel="noopener noreferrer"
                        >
                          {c_socialIcon.logo.url && (
                            <img
                              src={c_socialIcon.logo.url}
                              alt={c_socialIcon.cTA.label}
                              width={c_socialIcon.logo.width}
                              height={c_socialIcon.logo.height}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </div>
        <div className="link-sec-footer ">
          <div className="footer-block">
            <ul className="list-none">
              {_site?.c_footerLinks &&
                _site?.c_footerLinks?.map(
                  (c_footerLink: {label:string, link:string, linkType?:string;}, index: number) => {
                    return (
                      <li key={index}>
                        <AnalyticsLink props={c_footerLink} tagName={"footerLink_" + (index + 1)}/>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
          <div className="footer-block">
            <ul className="list-none">
              {_site?.c_footerLinks2 &&
                _site?.c_footerLinks2?.map(
                  (c_footerLink: {label:string, link:string, linkType?:string;}, index: number) => {
                    return (
                      <li key={index}>
                        <AnalyticsLink props={c_footerLink} tagName={"footerLink_" + (index + 8)}/>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
          <div className="app-links">
            <h4 className="uppercase">{StaticData.GetTheApp}</h4>
            <ul>
              {_site?.c_appLinks &&
                _site.c_appLinks.map((c_appLink: {uRl:string, logo:ImageThumbnail}, index: number) => {
                  return (
                    <li key={index}>
                      <Link
                        href={c_appLink.uRl}
                        data-ya-track={"App_" + (index + 1)}
                        rel="noopener noreferrer"
                        eventName={
                          c_appLink.logo.alternateText
                            ? c_appLink.logo.alternateText
                            : "App"
                        }
                        title={
                          c_appLink.logo.alternateText
                            ? c_appLink.logo.alternateText
                            : "App"
                        }
                      >
                        {c_appLink.logo.url && (
                          <img
                            src={c_appLink.logo.url}
                            alt={
                              index == 0
                                ? c_appLink.logo.alternateText
                                  ? c_appLink.logo.alternateText
                                  : "App"
                                : "playStoreApp"
                            }
                            loading="lazy"
                            width={c_appLink.logo.width}
                            height={c_appLink.logo.height}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="Footer-logo-Element">
          {props._site.c_drinkResponsiblyLogo.image.url && (
            <div>
              {props._site.c_drinkResponsiblyLogo.image.url && (
                <img
                  src={props._site.c_drinkResponsiblyLogo.image.url}
                  alt={props._site.c_drinkResponsiblyLogo.image.alternateText}
                  width={props._site.c_drinkResponsiblyLogo.image.width}
                  height={props._site.c_drinkResponsiblyLogo.image.height}
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
        <p>{_site?.c_footerDescription}</p>
        <ul>
          {_site?.c_bottomFooterLinks &&
            _site?.c_bottomFooterLinks?.map(
              (bottomFooterLink: {label:string, link:string, linkType?:string;}, index: number) => {
                return (
                  <li key={index}>
                    <AnalyticsLink props={bottomFooterLink} tagName={"footerBottomLink_" + (index + 1)}/>
                  </li>
                );
              }
            )}
        </ul>
      </div>
      <CookieConsent
        buttonText={
          _site.c_cookieAcceptLabel
            ? _site.c_cookieAcceptLabel
            : StaticData.CookieButtonText
        }
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: RtfConverter.toHTML(_site.c_cookieText),
          }}
        />
      </CookieConsent>
    </>
  );
};

export default Footer;
