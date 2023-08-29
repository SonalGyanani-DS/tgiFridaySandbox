import * as React from "react";
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
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
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
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";

/**
 *
 *
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "country",
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
      "c_addressCountryDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.c_addressRegionDisplayName",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.geomodifier",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.address",
    ],
    /**
     *
     *  Defines the scope of entities that qualify for this stream.
     */
    filter: {
      entityTypes: ["ce_country"],
      savedFilterIds: ["dm_restaurants-directory_address_countrycode"],
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
  // return `/index.html`;
  let slugUri = document.id?.toString() + ".html";
  if (document.slug) {
    slugUri = document.slug?.toString() + ".html";
  }
  return slugUri;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `TGI Fridays Restaurants in ${
            document.c_addressCountryDisplayName &&
            document.c_addressCountryDisplayName
          }`
    }`,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
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
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Browse all TGI Fridays restaurant in ${
                  document.c_addressCountryDisplayName &&
                  document.c_addressCountryDisplayName
                } for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
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
          name: "keywords",
          content:
            document.c_addressCountryDisplayName &&
            document.c_addressCountryDisplayName,
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
          href: `${stagingBaseurl + document.slug + ".html"}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl + document.slug + ".html"}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${
            document.c_meta_title
              ? document.c_meta_title
              : `TGI Fridays Restaurants in ${
                  document.c_addressCountryDisplayName &&
                  document.c_addressCountryDisplayName
                }`
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
              : `Browse all TGI Fridays restaurant in ${
                  document.c_addressCountryDisplayName &&
                  document.c_addressCountryDisplayName
                } for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
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
              : `TGI Fridays Restaurants in ${
                  document.c_addressCountryDisplayName &&
                  document.c_addressCountryDisplayName
                }`
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
              : `Browse all TGI Fridays restaurant in ${
                  document.c_addressCountryDisplayName &&
                  document.c_addressCountryDisplayName
                } for your favorite appetizers, entrees, beer & cocktails. Come celebrate with us!`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${stagingBaseurl + document.slug + ".html"}`,
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

const country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const {
    _site,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  const templateData = { document: document, __meta: __meta };
  const childrenElements = dm_directoryChildren
    ? dm_directoryChildren.map((entity: any, index: number) => {
        let detailPageSlug;
        /**
         *
         *
         * Page Redirection based on region count
         */
        if (typeof entity.dm_directoryChildren != "undefined") {
          if (entity.dm_baseEntityCount == 1) {
            entity.dm_directoryChildren.map((res: any) => {
              res.dm_directoryChildren.map((location: any) => {
                if (!location.slug) {
                  let finalResult: any = "";
                  if (typeof location?.address?.line1 != "undefined") {
                    finalResult += location?.address.line1;
                  }
                  if (typeof location?.address?.line2 != "undefined") {
                    finalResult += " " + location?.address.line2;
                  }

                  if (finalResult) {
                    finalResult = constant.slugify(finalResult);
                  } else {
                    finalResult = constant.slugify(location.id);
                  }

                  detailPageSlug = `${constant.slugify(
                    location.address?.region
                  )}/${constant.slugify(location.address.city)}/${finalResult}`;
                } else {
                  detailPageSlug = `${constant.slugify(
                    location.address?.region
                  )}/${constant.slugify(
                    location.address.city
                  )}/${constant.slugify(location.slug)}`;
                }
                detailPageSlug = detailPageSlug + ".html";
              });
            });
          } else {
            detailPageSlug = "/" + entity.slug + ".html";
          }
        }

        /**
         *
         * Render Region name with count
         */
        return (
          <li className="storeLocation-category" key={index}>
            <Link
              eventName="DirectoryLink"
              data-ya-track="DirectoryLink"
              rel="noopener noreferrer"
              key={entity.slug}
              href={detailPageSlug}
            >
              {entity.c_addressRegionDisplayName} ({entity.dm_baseEntityCount})
            </Link>
          </li>
        );
      })
    : "";
  /**
   *
   *
   * Banner Image
   */
  const bannerImg = c_banner_image && c_banner_image.image.url;

  /**
   *
   *
   * Bread crumb schema
   */
  const breadcrumbScheme = [];
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
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 3,
    item: {
      "@id": `${stagingBaseurl}${document.slug}.html`,
      name: document.c_addressCountryDisplayName,
    },
  });

  // Organization Schema Link
  const socialLinks: any = [];
  _site?.c_socialIcons.map((c_socialIcon: any) => {
    socialLinks.push(c_socialIcon.cTA.link);
  });

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
            <div className="location-dtl">
              <Banner
                name={
                  c_bannerHeading
                    ? c_bannerHeading
                    : document.c_addressCountryDisplayName
                }
                c_bannerImage={bannerImg}
              />
            </div>
            <BreadCrumbs
              name={document.c_addressCountryDisplayName}
              address={address}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
            ></BreadCrumbs>
            <div className="content-list">
              <div className="container">
                <div className="sec-title">
                  <h2>
                    {document.dm_baseEntityCount} TGI Fridays in{" "}
                    {document.c_addressCountryDisplayName}
                  </h2>
                </div>
                <ul className="region-list">{childrenElements}</ul>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default country;
