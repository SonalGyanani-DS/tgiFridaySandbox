import { Link } from "@yext/pages/components";
import { CtaData } from "@yext/search-ui-react";
import * as React from "react";
import { ImageThumbnail, SiteData } from "../../types/search/locations";

/**
 * get header data in props and map in HTML.
 * @param props : Header Data.
 * @returns : Menus.
 */
function MobileMenu(props: {_site:SiteData}) {
  return (
      <nav className="main-mobile-nav">
        <ul className="user-links">
          {props._site.c_topHeaderLinks.map(
            (
              topHeaderLink: { cTA: CtaData; icon: { url: string } },
              i: number
            ) => {
              return (
                <>
                  <li key={i}>
                    {topHeaderLink.cTA && (
                      <Link
                        eventName={topHeaderLink.cTA?.label}
                        data-ya-track={topHeaderLink.cTA?.label}
                        rel="noopener noreferrer"
                        href={topHeaderLink.cTA?.link}
                      >
                        {topHeaderLink.icon?.url ? (
                          <img
                            className="inline"
                            src={topHeaderLink.icon?.url}
                            alt="icon"
                            loading="lazy"
                            width={30}
                          />
                        ) : (
                          ""
                        )}{" "}
                        {topHeaderLink.cTA?.label}
                      </Link>
                    )}
                  </li>
                </>
              );
            }
          )}
        </ul>
        <ul className="flex links">
          {props._site?.c_header_links.map((menu: CtaData, index: number) => (
            <>
              {menu.link && menu?.label && (
                <li key={index}>
                  <Link
                    href={menu.link}
                    data-ya-track={menu?.label}
                    eventName={"header-links"}
                    rel="noopener noreferrer"
                  >
                    {menu?.label}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
        <ul className="social-media-bx">
          {props._site?.c_socialIcons &&
            props._site?.c_socialIcons.map(
              (
                c_socialIcon: { cTA: CtaData; logo: ImageThumbnail },
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
      </nav>
  );
}

export default MobileMenu;
