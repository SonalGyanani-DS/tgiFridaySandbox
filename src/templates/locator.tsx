import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import PageLayout from "../components/layouts/PageLayout";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  stagingBaseurl,
  AnswerExperienceConfig,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  metaBots,
  favicon,
  googleAnalyticsScripts,
} from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import Banner from "../components/locationDetail/banner";

/**
 *
 *
 * This allows the user to define a function which will take in their template
 * data and procure a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 * @param param0
 * @returns
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document.c_meta_title ? document.c_meta_title : StaticData.Meta_title
    }`,
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
              : StaticData.Meta_description
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
          name: "robots",
          content: metaBots,
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
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document._site?.c_canonical ? document?.c_canonical : stagingBaseurl
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
              : StaticData.Meta_description
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${
            document.c_meta_title
              ? document.c_meta_title
              : StaticData.Meta_title
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: document._site?.c_canonical
            ? document?.c_canonical
            : stagingBaseurl,
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
          name: "twitter:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : StaticData.Meta_title,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : StaticData.Meta_description
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: document._site?.c_header_logo?.image?.url
            ? document._site?.c_header_logo?.image?.url
            : "",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: document._site?.c_canonical
            ? document?.c_canonical
            : stagingBaseurl,
        },
      },
    ],
    other: googleAnalyticsScripts,
  };
};

/**
 *
 * Template config for get KG Data
 */
export const config: TemplateConfig = {
  stream: {
    $id: "Locator",
    /**
     * Specifies the exact data that each generated document will contain. This data is passed in
     * directly as props to the default exported function.
     */
    fields: ["id", "name", "c_locatorBannerImage"],
    /** Defines the scope of entities that qualify for this stream. */
    filter: {
      entityIds: ["global-data"],
    },
    /**  The entity language profiles that documents will be generated for. */
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};

interface datText extends TemplateRenderProps {
  _site: string[];
}

interface cTA {
  link: string;
}
interface SocialIcon extends cTA {
  cTA: cTA;
}
const Locator: Template<datText> = ({ document }: datText) => {
  const { _site, _meta, c_locatorBannerImage } = document;
  const templateData = { document: document, __meta: _meta };

  const socialLinks: string[] = [];
  _site?.c_socialIcons.map((c_socialIcon: SocialIcon) => {
    socialLinks.push(c_socialIcon.cTA.link);
  });
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
        <AnalyticsScopeProvider name={""}>
          <PageLayout _site={_site}>
            <Banner
              name={`Fridays Near Me`}
              c_bannerImage={c_locatorBannerImage?.image.url}
            />
            <SearchHeadlessProvider
              experienceKey={AnswerExperienceConfig.experienceKey}
              locale={AnswerExperienceConfig.locale}
              apiKey={AnswerExperienceConfig.apiKey}
              verticalKey={AnswerExperienceConfig.verticalKey}
              experienceVersion={AnswerExperienceConfig.experienceVersion}
              sessionTrackingEnabled={true}
              endpoints={AnswerExperienceConfig.endpoints}
            >
              <SearchLayout _site={_site} />
            </SearchHeadlessProvider>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Locator;
