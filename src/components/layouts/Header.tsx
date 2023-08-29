import * as React from "react";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { siteURL } from "../../../sites-global/global";
import { Link } from "@yext/pages/components";
import { HumBurgerIcon } from "../Svg/HumBurgerIcon";
import { CtaData } from "@yext/search-ui-react";
import { SiteData } from "../../types/search/locations";

/** Initialize header links */
const Header = (props: { _site: SiteData }) => {
  useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const [mobileToggle, setMobileToggle] = useState(false);
  const handleMobileToggle = () => {
    const bodyElement = document.body as HTMLInputElement;
    if (mobileToggle == false) {
      setMobileToggle(true);
      bodyElement.classList.add("menu-opened");
    } else {
      setMobileToggle(false);
      bodyElement.classList.remove("menu-opened");
    }
  };

  return (
    <>
      <div className="top-bar">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TW3LWNF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ul>
          {props._site.c_topHeaderLinks.map(
            (
              topHeaderLink: { cTA: CtaData; logo: { url: string } },
              i: number
            ) => {
              return (
                <>
                  <li key={i}>
                    {topHeaderLink.cTA && (
                      <Link
                        eventName={"TopBarLink_" + (i + 1)}
                        data-ya-track={"TopBarLink_" + (i + 1)}
                        rel="noopener noreferrer"
                        href={topHeaderLink.cTA?.link}
                      >
                        {topHeaderLink.logo?.url ? (
                          <img
                            className="inline"
                            src={topHeaderLink.logo?.url}
                            alt="icon"
                            loading="lazy"
                            width={"86"}
                            height={"100"}
                          ></img>
                        ) : (
                          ""
                        )}{" "}
                        <span>{topHeaderLink.cTA?.label}</span>
                      </Link>
                    )}
                  </li>
                </>
              );
            }
          )}
        </ul>
      </div>
      <header className="site-header">
        <div className="desktop">
          <div className="logo">
            <div className="container">
              <div className="mx-auto">
                {props._site.c_header_logo.image.url && (
                  <Link
                    eventName={"logo"}
                    data-ya-track={"logo"}
                    rel="noopener noreferrer"
                    href={siteURL}
                  >
                    <img
                      src={props._site.c_header_logo.image.url}
                      width={"150"}
                      height={"57"}
                      alt="HeaderLogo"
                      loading="lazy"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <nav className="nav">
            <ul className="flex">
              {props._site?.c_header_links.map(
                (menu: CtaData, index: number) => {
                  return (
                    <>
                    {menu.link && menu?.label && (
                      <li key={index}>
                        <Link
                          href={menu.link}
                          data-ya-track={"HeaderLink_" + (index + 1)}
                          eventName={"HeaderLink_" + (index + 1)}
                          rel="noopener noreferrer"
                        >
                          {menu?.label}
                        </Link>
                      </li>
                    )}
                  </>
                  )
                }
              )}
            </ul>
          </nav>
        </div>

        <div
          className="mobile-nav"
          style={{ display: mobileToggle == true ? "block" : "none" }}
        >
          <MobileMenu _site={props._site} />
        </div>

        <button
          type="button"
          className="menu-btn"
          id="menu-btn"
          title="menu-btn"
          onClick={() => handleMobileToggle()}
        >
          <HumBurgerIcon />
          <span />
        </button>
      </header>
    </>
  );
};

export default Header;
