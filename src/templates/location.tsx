import * as React from "react";
import Banner from "../components/locationDetail/banner";
import Contact from "../components/locationDetail/ContactUs";
import Nearby from "../components/locationDetail/Nearby";
import { JsonLd } from "react-schemaorg";
import { nearByLocation } from "../types/nearByLocation";
import Modal from "react-modal";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";

import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Faq from "../components/locationDetail/Faqs";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
  stagingBaseurl,
  metaBots,
  googleAnalyticsScripts,
} from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import { AboutTourStore } from "../components/locationDetail/AboutTourStore";
import { Aboutupdate } from "../components/locationDetail/Aboutupdate";
import { Amenities } from "../components/locationDetail/Amenities";
import { LocationServices } from "../components/locationDetail/Locationservices";
import constant from "../constant";
import { GoogleReview } from "../components/locationDetail/GoogleReview";
import { RewardSection } from "../components/locationDetail/RewardSection";
import {
  LocationDocument,
  ParentDirectoryType,
  TemplateMeta,
} from "../types/search/locations";
import { Ctas } from "../types/LocationSections";
import EclMenus from "../components/locationDetail/EclMenus";
import { Image } from "@yext/pages/components";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "photoGallery",
      "description",
      "c_reviewSectionHeading",
      "c_googleReviewsHeading",
      "c_nearbyStoreHeading",
      "c_canonical",
      "c_meta_title",
      "c_meta_description",
      "c_forthSmith",
      "c_googleReviewUrl",
      "c_googlePlaceId",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.c_addressRegionDisplayName",
      "c_banner_image",
      "additionalHoursText",
      "c_directionLabel",
      "c_onlineOrderAndReservationsTime",
      "c_onlineOrderingAndReservations",
      "hours",
      "c_dineinMenu",
      "deliveryHours",
      "slug",
      "timezone",
      "c_related_FAQs.question",
      "c_related_FAQs.answer",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "services",
      "c_aboutourstore",
      "c_orderNow",
      "c_waitlist",
      "c_aboutupdate",
      "c_locationsService",
      "c_serviceHeading",
      "c_rewardSection",
      "c_amenitiesHeading",
      "c_amenitiesList",
      "c_whatsHotItems",
      "c_directionUrl",
      "c_whatsHotTitle",
      "c_hoursHeading",
      "c_viewDineInMenuCTA",
      "c_viewAllLocations",
      "c_aboutTheStoreDeals",
      "c_promotionImage",
      "c_promotionHeading",
      "c_promotionTagline",
      "c_promotionCTA",
      "c_eCLMenu.name",
      "c_eCLMenu.eclMenu_title",
      "c_eCLMenu.eclMenu_currency",
      "c_eCLMenu.eclMenu_section.sectionID",
      "c_eCLMenu.eclMenu_section.sectionName",
      "c_eCLMenu.eclMenu_section.menuItem.itemDescription",
      "c_eCLMenu.eclMenu_section.menuItem.itemID",
      "c_eCLMenu.eclMenu_section.menuItem.itemName",
      "c_eCLMenu.eclMenu_section.menuItem.itemPhoto",
      // "c_yelpWidget",
      // "c_deliveryHoursHeading"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const url = constant.getLocationSlugUri(
    document.id,
    document.address,
    document.slug
  );
  return url;
};

/**
 *
 * This allows the user to define a function which will take in their template
 * data and procure a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const currentUrl = constant.getLocationSlugUri(
    document.id,
    document.address,
    document.slug
  );

  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.geomodifier && document.geomodifier} | ${document.name && document.name
      } Restaurant & Bar`,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description
            ? document.c_meta_description
            : `Visit ${document.name && document.name} Restaurant & Bar in ${document.geomodifier && document.geomodifier
            }for Whiskey-Glazed burgers, wings, or ribs. Find our menu, order delivery, and timings here.`
            }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: "TGI Fridays",
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
          href: `${document._site?.c_canonical
            ? document?.c_canonical + ".html"
            : stagingBaseurl + currentUrl
            }`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description
            ? document.c_meta_description
            : `Visit ${document.name && document.name} Restaurant & Bar in ${document.geomodifier && document.geomodifier
            }for Whiskey-Glazed burgers, wings, or ribs. Find our menu, order delivery, and timings here.`
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
          property: "og:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : `${document.geomodifier && document.geomodifier} | ${document.name && document.name
            } Restaurant & Bar`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${document._site?.c_canonical
            ? document?.c_canonical + ".html"
            : stagingBaseurl + currentUrl
            }`,
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
          name: "twitter:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : `${document.geomodifier && document.geomodifier} | ${document.name && document.name
            } Restaurant & Bar`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${document._site?.c_canonical
            ? document?.c_canonical + ".html"
            : stagingBaseurl + currentUrl
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description
            ? document.c_meta_description
            : `Visit ${document.name && document.name} Restaurant & Bar in ${document.geomodifier && document.geomodifier
            }for Whiskey-Glazed burgers, wings, or ribs. Find our menu, order delivery, and timings here.`
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
    ],
    other: googleAnalyticsScripts,
  };
};

type placeApiData = {
  data: any;
};

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation } & {
  googlePlaceApiData: placeApiData;
  response: { results: [] };
};

export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const googlePlaceData = {};
  const googlePlaceApiData = googlePlaceData as placeApiData;
  return { ...data, googlePlaceApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  googlePlaceApiData: placeApiData;
};

interface LocationProps extends ExternalApiRenderData {
  relativePrefixToRoot: string;
  c_viewAllLocations: Ctas;
  document: LocationDocument;
  path: string;
  __meta: TemplateMeta;
  c_reviewSectionHeading: string;
}


const Location: Template<LocationProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  googlePlaceApiData,
}: LocationProps) => {
  const {
    _site,
    name,
    address,
    hours,
    mainPhone,
    timezone,
    additionalHoursText,
    yextDisplayCoordinate,
    c_banner_image,
    c_locationsService,
    c_serviceHeading,
    dm_directoryParents,
    c_aboutupdate,
    c_related_FAQs,
    c_viewMoreFAQs,
    c_onlineOrderAndReservationsTime,
    c_viewAllLocations,
    c_reviewSectionHeading,
    c_googleReviewsHeading,
    c_nearbyStoreHeading,
    displayCoordinate,
    cityCoordinate,
    c_orderNow,
    c_googlePlaceId,
    c_waitlist,
    c_googleReviewUrl,
    c_amenitiesHeading,
    c_amenitiesList,
    c_rewardSection,
    c_onlineOrderingAndReservations,
    c_specific_day,
    c_aboutTheStoreDeals,
    c_eCLMenu,
    c_yelpWidget,
    deliveryHours,
  } = document;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  interface EntityTypeType {
    entityType: { id: string };
  }
  const closeModal=()=>{
    setIsOpen(false);
  }

  interface DirectoryParentType {
    name: string;
    meta: EntityTypeType;
    c_addressRegionDisplayName?: string;
  }

  React.useEffect(() => {
    if (document.c_promotionImage) {
      setIsOpen(true);
    }
  }, [])
  const templateData = { document: document, __meta: __meta };
  const hoursSchema = [];
  const breadcrumbScheme = [];
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 1,
    item: {
      "@id": " Home",
      name: "Home",
    },
  });
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 2,
    item: {
      "@id": "Store-Locator",
      name: "Store Locator",
    },
  });
  if (hours) {
    for (const key in hours) {
      if (Object.prototype.hasOwnProperty.call(hours, key)) {
        let openIntervalsSchema;
        if (key !== "holidayHours") {
          if (hours[key].isClosed) {
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
          } else {
            let end = "";
            let start = "";
            if (typeof hours[key].openIntervals != "undefined") {
              const openIntervals = hours[key].openIntervals;
              for (const o in openIntervals) {
                if (Object.prototype.hasOwnProperty.call(openIntervals, o)) {
                  end = openIntervals[o].end;
                  start = openIntervals[o].start;
                }
              }
            }
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              closes: end,
              dayOfWeek: key,
              opens: start,
            };
          }
        }
        hoursSchema.push(openIntervalsSchema);
      }
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents.map(
      (i: DirectoryParentType, index: number) => {
        if (i.meta.entityType.id == "ce_country") {
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: index + 2,
            item: {
              "@id":
                stagingBaseurl +
                document.dm_directoryParents[index].slug +
                ".html",
              name: i.name,
            },
          });
        } else if (i.meta.entityType.id == "ce_region") {
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: index + 2,
            item: {
              "@id":
                stagingBaseurl +
                document.dm_directoryParents[index].slug +
                ".html",
              name: i.c_addressRegionDisplayName,
            },
          });
        } else if (i.meta.entityType.id == "ce_city") {
          let url = "";

          document.dm_directoryParents.map((j: ParentDirectoryType) => {
            if (
              j.meta.entityType.id != "ce_city" &&
              j.meta.entityType.id != "ce_root" &&
              j.meta.entityType.id != "ce_country"
            ) {
              if (url) {
                url = url + "/" + j.slug;
              } else {
                url = j.slug;
              }
            }
          });
          breadcrumbScheme.push({
            "@type": "ListItem",
            position: index + 2,
            item: {
              "@id":
                stagingBaseurl +
                url +
                "/" +
                document.dm_directoryParents[index].slug +
                ".html",
              name: i.name,
            },
          });
        }
      }
    );

  const bannerImage = c_banner_image && c_banner_image.image.url;
  let bannerTitle = "";
  if (document?.name) {
    bannerTitle += document?.name;
  }
  if (document?.address?.city) {
    bannerTitle += " " + document?.address?.city;
  }
  if (document.address.region) {
    bannerTitle += ", " + document.address.region;
  }

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 6,
    item: {
      "@id": stagingBaseurl + path,
      name: bannerTitle,
    },
  });  

  return (
    <>
      <JsonLd<Restaurant>
        item={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: bannerTitle,
          hasMap: document.c_directionUrl ? document.c_directionUrl : "",
          description: document.description ? document.description : "",
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1 ? address.line1 : "",
            addressLocality: address.city ? address.city : "",
            addressRegion: address.region ? address.region : "",
            postalCode: address.postalCode ? address.postalCode : "",
            addressCountry: address.countryCode ? address.countryCode : "",
          },
          openingHoursSpecification: hoursSchema,
          telephone: mainPhone,
          url: stagingBaseurl + path,
        }}
      />

      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
        }}
      />
      {c_related_FAQs && (
        <JsonLd<FAQPage>
          item={{
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity:
              c_related_FAQs &&
              c_related_FAQs.map((i: { question: string; answer: string }) => {
                return {
                  "@type": "Question",
                  name: i.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `<p>${i.answer}</p>`,
                  },
                };
              }),
          }}
        />
      )}
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>

          <PageLayout _site={_site}>

            {document.c_promotionImage ?
              <Modal
                isOpen={modalIsOpen}
                contentLabel="Example Modal"
                onRequestClose={closeModal}>
                <Image image={document.c_promotionImage} />
                {document.c_promotionHeading ? <h1>{document.c_promotionHeading}</h1>:""}
                {document.c_promotionTagline ? <p>{document.c_promotionTagline}</p>:""}
                {document.c_promotionCTA && document.c_promotionCTA.link && document.c_promotionCTA.label ? <Link href={document.c_promotionCTA.link}>{document.c_promotionCTA.label}</Link>:""}
                <button onClick={() => setIsOpen(false)}>X</button>
              </Modal>
              :
              ""}
            <Banner
              name={bannerTitle}
              c_bannerImage={bannerImage}
              c_orderNow={c_orderNow}
            />
            <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              address={address}
            />
            <div className="location-information">
              <Contact
                c_googlePlaceId={c_googlePlaceId}
                address={address}
                phone={mainPhone}
                c_specific_day={c_specific_day}
                latitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.latitude
                    : displayCoordinate?.latitude
                }
                longitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.longitude
                    : displayCoordinate?.longitude
                }
                hours={hours}
                deliveryHours={deliveryHours as []}
                additionalHoursText={additionalHoursText}
                c_orderNow={c_orderNow}
                c_waitlist={c_waitlist}
                c_yelpWidget={c_yelpWidget}
                timezone={timezone}
                c_onlineOrderAndReservationsTime={
                  c_onlineOrderAndReservationsTime
                }
                c_directionUrl={document?.c_directionUrl}
                c_onlineOrderingAndReservations={
                  c_onlineOrderingAndReservations
                }
                document={document}
              />
              {hours ? (
                <div className="map-sec" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                    placeId={
                      document.c_googlePlaceId ? document.c_googlePlaceId : ""
                    }
                    googleReviewUrl={c_googleReviewUrl}
                  />
                </div>
              ) : (
                <div className="map-sec without-hours" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                    placeId={
                      document.c_googlePlaceId ? document.c_googlePlaceId : ""
                    }
                    googleReviewUrl={c_googleReviewUrl}
                  />
                </div>
              )}
            </div>
            {c_aboutTheStoreDeals && (
              <AboutTourStore c_aboutTheStoreDeals={c_aboutTheStoreDeals} />
            )}
            {c_locationsService && (
              <LocationServices
                c_locationsService={c_locationsService}
                c_serviceHeading={c_serviceHeading}
              />
            )}

            <EclMenus eclMenus={c_eCLMenu} id={document.id} name={document.name} address={document.address} />
            <RewardSection c_rewardSection={c_rewardSection} />
            <Aboutupdate c_aboutupdate={c_aboutupdate} />
            <div className="amenities-reviews">
              <div className="container flex flex-wrap">
                <GoogleReview
                  reviewSectionHeading={c_reviewSectionHeading}
                  googleReviewsHeading={c_googleReviewsHeading}
                  googleReviewUrl={c_googleReviewUrl}
                  placeData={googlePlaceApiData}
                />
                <Amenities
                  c_amenitiesHeading={c_amenitiesHeading}
                  c_amenitiesList={c_amenitiesList}
                />
              </div>
            </div>
            <div className="faq-sec">
              {c_related_FAQs ? (
                <>
                  <Faq faqs={c_related_FAQs} c_viewMoreFAQs={c_viewMoreFAQs} />
                </>
              ) : (
                <></>
              )}
            </div>
            {yextDisplayCoordinate || cityCoordinate || displayCoordinate ? (
              <Nearby
                c_viewAllLocations={c_viewAllLocations}
                c_nearbyStoreHeading={c_nearbyStoreHeading}
                geocodedCoordinate={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate
                    : displayCoordinate
                }
                id={document.id}
              />
            ) : (
              ""
            )}
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
