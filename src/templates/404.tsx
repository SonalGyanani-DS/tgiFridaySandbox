import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import * as React from "react";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
import { favicon } from "../../sites-global/global";
import { FourOhFourTemplate, TemplateMeta } from "../types/search/locations";

export const config: TemplateConfig = {
  stream: {
    $id: "404",
    /**
     * Specifies the exact data that each generated document will contain. This data is passed in
     * directly as props to the default exported function.
     */
    fields: ["id", "name", "slug"],
    /**Defines the scope of entities that qualify for this stream. */
    filter: {
      entityIds: ["404-page"],
    },
    /** The entity language profiles that documents will be generated for. */
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/** The path must be exactly 404.html */
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

/** Add a title to the page */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: StaticData.PageNotFound,
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
    ],
  };
};

interface FourOhFourprops extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: FourOhFourTemplate;
}

const FourOhFour: Template<FourOhFourprops> = ({
  document,
}: FourOhFourprops) => {
  const { _site } = document;
  /** Template that will show as the page */
  return (
      <PageLayout _site={_site}>
        <div className="content-list border-b border-b-[#dedede] md:mb-5">
          <div className="container">
            <div className="sec-title text-center">
              <h1 style={{ textAlign: "center" }}>{StaticData.PageNotFound}</h1>
              <p className="no-found">{StaticData.PageNotFoundDescription}.</p>
            </div>
          </div>
        </div>
      </PageLayout>
  );
};

export default FourOhFour;
