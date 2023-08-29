import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { SiteData } from "../../types/search/locations";

type Props = {
  title?: string;
  _site?: SiteData;
  children?: React.ReactNode;
};

/** Here all the global data is map and call header  & Footer*/
const PageLayout = ({ _site, children }: Props) => {
  return (
    <>
      {typeof _site != "undefined" ? <Header _site={_site} /> : ""}
      {children}
      {typeof _site != "undefined" ? <Footer _site={_site} /> : ""}
    </>
  );
};

export default PageLayout;
