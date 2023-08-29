import * as React from "react";
import GetDirection from "../components/commons/GetDirection";
import constant from "../constant";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import PhoneIcon from "../images/phone.svg";
import mapIcon from "../images/map.svg";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
  googleAnalyticsScripts,
  metaBots,
  siteURL,
  stagingBaseurl,
} from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";
import OpenClose from "../components/commons/openClose";
import timeIcon from "../images/watch-icn.svg";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import { CityTemplate, TemplateMeta } from "../types/search/locations";
import { formatPhoneNumber } from "../components/locatorPage/LocationCard";

/**
 *
 *
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "city",
    /**
     *
     *
     *  Specifies the exact data that each generated document will contain. This data is passed in
     *  directly as props to the default exported function.
     */
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_meta_title",
      "c_meta_description",
      "dm_baseEntityCount",
      "dm_directoryParents.name",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryParents.c_addressCountryDisplayName",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildren.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.geomodifier",
      "dm_directoryChildren.c_orderNow",
      "dm_directoryChildren.c_waitlist",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.c_directionUrl",
      "dm_directoryChildren.c_directionLabel",
      "dm_directoryChildren.c_googlePlaceId",
      "dm_directoryChildren.timezone",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    /**
     *
     *  Defines the scope of entities that qualify for this stream.
     */
    filter: {
      entityTypes: ["ce_city"],
      savedFilterIds: ["dm_restaurants-directory_address_city"],
    },
    /**
     *
     *
     * The entity language profiles that documents will be generated for.
     */
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 *
 *  Generate path for country page
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url: any = "";
  document.dm_directoryParents &&
    document.dm_directoryParents?.map((i: any) => {
      if (i.meta.entityType.id == "ce_region") {
        url = `${url}/${i.slug}/${document.slug.toString()}.html`;
      }
    });
  return url;
};

/**
 *
 *
 *  SEO Point (Head Config)
 * @param param0
 * @returns
 */

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let url: any = "";
  document.dm_directoryParents &&
    document.dm_directoryParents?.map((i: any) => {
      if (i.meta.entityType.id == "ce_region") {
        url = `${i.slug}/${document.slug.toString()}.html`;
      }
    });
  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `TGI Fridays Restaurants in ${document.name}`
    }`,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Browse all TGI Fridays restaurant in ${document.name} for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.BrandName,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: metaBots,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${stagingBaseurl + url}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${
            document.c_meta_title
              ? document.c_meta_title
              : `TGI Fridays Restaurants in ${document.name}`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Browse all TGI Fridays restaurant in ${document.name} for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl + url}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: document._site?.c_header_logo?.image?.url
            ? document._site?.c_header_logo?.image?.url
            : "",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${
            document.c_meta_title
              ? document.c_meta_title
              : `TGI Fridays Restaurants in ${document.name}`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Browse all TGI Fridays restaurant in ${document.name} for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "twitter:image",
          content: document._site?.c_header_logo?.image?.url
            ? document._site?.c_header_logo?.image?.url
            : "",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${stagingBaseurl + url}`,
        },
      },
    ],
    other: googleAnalyticsScripts,
  };
};

/**
 *
 * Render Country HTMl
 * @param param0
 * @returns
 */

interface CityTemplateProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: CityTemplate;
  relativePrefixToRoot: string;
  path: string;
}

const City: Template<CityTemplateProps> = ({
  document,
  __meta,
  relativePrefixToRoot,
}: CityTemplateProps) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    c_banner_image,
    c_bannerHeading,
    _site,
  } = document;

  const templateData = { document: document, __meta: __meta };
  let address;

  /**
   *
   *
   * Render location card
   */
  const childrenElements = dm_directoryChildren?.map(
    (entity: any, index: number) => {
      const url =
        "/" +
        constant.getLocationSlugUri(entity.id, entity.address, entity.slug);

      let locationTitle = "";
      if (entity?.name) {
        locationTitle += entity?.name;
      }
      if (entity?.address?.city) {
        locationTitle += " " + entity?.address?.city;
      }
      if (entity?.address?.region) {
        locationTitle += ", " + entity.address.region;
      }

      return (
        <div className="c_location" key={index}>
          <div className=" city-location">
            <div className="location-name-miles icon-row">
              <div className="icon">
                {" "}
                <img src={mapIcon} width="20" height="20" alt="Map" />
              </div>
              <h2>
                <Link
                  eventName="DirectoryLocationName"
                  data-ya-track="DirectoryLocationName"
                  rel="noopener noreferrer"
                  className="inline-block notHighlight"
                  href={url}
                >
                  {locationTitle}
                </Link>
              </h2>
            </div>
            <div className="icon-row">
              <Address address={entity.address} />
            </div>
            {entity.mainPhone ? (
              <div className="icon-row">
                <div className="icon">
                  <img
                    src={PhoneIcon}
                    width="20"
                    height="20"
                    alt="PhoneNumber"
                  />
                </div>
                <div className="content-col">
                  <h3>{StaticData.Telephone}</h3>
                  <Link
                    eventName={"DirectoryPhoneNumber"}
                    data-ya-track={"DirectoryPhoneNumber"}
                    rel="noopener noreferrer"
                    href={`tel:${entity.mainPhone}`}
                  >
                    {formatPhoneNumber(entity.mainPhone)}
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {entity?.hours ? (
              <div className="icon-row">
                <div className="icon">
                  {" "}
                  <img src={timeIcon} width="20" height="20" alt="Clock" />{" "}
                </div>
                <div className="content-col open-now-string">
                  {typeof entity.hours?.reopenDate != "undefined" ? (
                    <h6>{StaticData.tempClosed}</h6>
                  ) : entity?.hours ? (
                    <>
                      {" "}
                      <OpenClose
                        ArrowIcon={"ArrowIconFalse"}
                        timezone={entity.timezone}
                        hours={entity?.hours}
                        deliveryHours={entity?.hours}
                      ></OpenClose>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="button-bx">
              {entity?.c_orderNow?.label && entity?.c_orderNow?.link && (
                <Link
                  eventName="DirectoryCTA_1"
                  data-ya-track="DirectoryCTA_1"
                  rel="noopener noreferrer"
                  className="btn"
                  href={entity.c_orderNow.link}
                >
                  {entity.c_orderNow.label}
                </Link>
              )}
              {entity?.c_directionUrl ? (
                <Link
                  data-ya-track="DirectoryCTA_2"
                  eventName="DirectoryCTA_2"
                  className="btn notHighlight direction"
                  href={entity?.c_directionUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {entity?.c_directionLabel ? (
                    <>{entity?.c_directionLabel}</>
                  ) : (
                    StaticData.getDirection
                  )}
                </Link>
              ) : (
                <>
                  <GetDirection
                    buttonText={StaticData.getDirection}
                    googlePlaceId={entity.c_googlePlaceId}
                    address={entity.address}
                    latitude={entity.yextDisplayCoordinate.latitude}
                    longitude={entity.yextDisplayCoordinate.longitude}
                  />
                </>
              )}
            </div>
            <div className="wait-list-btn">
              {entity?.c_waitlist?.link && entity?.c_waitlist?.label && (
                <Link
                  eventName="DirectoryCTA_3"
                  data-ya-track="DirectoryCTA_3"
                  rel="noopener noreferrer"
                  className="ghost-btn"
                  href={entity.c_orderNow.link}
                >
                  {entity.c_waitlist.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }
  );

  let url: string;

  /**
   *
   *
   * Generate url of location page
   */
  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    } else if (i.meta.entityType.id == "ce_region") {
      url = `${url}/${i.slug}/${document.slug?.toString()}.html`;
    }
  });

  /**
   *
   *
   * Bread Crumb Schema
   */
  const breadcrumbScheme: any = [];

  /**
   *
   *
   * create bread crumb schema
   */

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 1,
    item: {
      "@id": `${siteURL}`,
      name: "Home",
    },
  });
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 2,
    item: {
      "@id": `${stagingBaseurl}`,
      name: "Store Locator",
    },
  });

  /**
   *
   *
   * Current Index
   */
  const currentIndex: any = 2;

  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      if (index != 0) {
        let breadcrumbName = "";
        if (i.meta.entityType.id == "ce_country") {
          breadcrumbName = i.c_addressCountryDisplayName;
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: currentIndex + index,
            item: {
              "@id": `${stagingBaseurl}${i.slug}.html`,
              name: breadcrumbName,
            },
          });
        } else {
          breadcrumbName = i.c_addressRegionDisplayName;
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: currentIndex + index,
            item: {
              "@id": `${stagingBaseurl}${i.slug}.html`,
              name: breadcrumbName,
            },
          });
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: 5,
            item: {
              "@id": `${stagingBaseurl}${i.slug}/${document.slug}.html`,
              name: document.name,
            },
          });
        }
      }
    });

  /**
   *
   *
   * Banner Image
   */
  const bannerImage = c_banner_image && c_banner_image.image.url;
  const socialLinks: any = [];
  _site?.c_socialIcons?.map((c_socialIcon: any) => {
    socialLinks.push(c_socialIcon.cTA.link);
  });

  /**
   *
   *
   * Render page HTMl with MarkUp Schema
   */
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TGI Fridays",
          url: "",
          logo: document._site?.c_header_logo?.image?.url
            ? document._site?.c_header_logo?.image?.url
            : "",
          address: {
            "@type": "PostalAddress",
            streetAddress: _site.address.line1 ? _site.address.line1 : "",
            addressLocality: _site.address.city ? _site.address.city : "",
            addressRegion: _site.address.region ? _site.address.region : "",
            postalCode: _site.address.postalCode
              ? _site.address.postalCode
              : "",
            addressCountry: "US",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: _site.mainPhone ? _site.mainPhone : "",
          },
          sameAs: socialLinks,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <PageLayout _site={_site}>
            <Banner
              name={c_bannerHeading ? c_bannerHeading : name}
              c_bannerImage={bannerImage}
            />
            <BreadCrumbs
              name={name}
              address={address}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
            ></BreadCrumbs>
            <div className="content-list city-page">
              <div className="container mx-auto">
                <div className="sec-title">
                  <h2>
                    {document.dm_baseEntityCount} TGI Fridays in {name}
                  </h2>
                </div>
                <div className="flex flex-wrap justify-center -mx-2.5 lg:-mx-[.9375rem]">
                  {childrenElements}
                </div>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default City;
