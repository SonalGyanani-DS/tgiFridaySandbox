import { Link } from "@yext/pages/components";
import * as React from "react";
import { stagingBaseurl, siteURL } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import { AddressType } from "../../types/search/locations";
type data = {
  name: string;
  parents: any;
  baseUrl: string;
  address: AddressType | undefined;
};

interface DataType {
  name: string;
  slug: string;
  count: number;
}
/** BreadCrumbs of DM pages */
const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState<Element[] | null>(null);
  let breadcrumbs: any;
  const data: DataType[] = [];
  React.useEffect(() => {
    setURL(props.parents, props.baseUrl);
  }, [setList]);

  const setURL = (parents: any, baseUrl: string) => {
    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        if (parents[i].meta.entityType.id == "ce_country") {
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count: parents[i].dm_baseEntityCount,
          });
        } else if (parents[i].meta.entityType.id == "ce_region") {
          data.push({
            name: parents[i].c_addressRegionDisplayName,
            slug: parents[i].slug,
            count: parents[i].dm_baseEntityCount,
          });
        } else if (parents[i].meta.entityType.id == "ce_city") {
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count: parents[i].dm_baseEntityCount,
          });
        }
      }
      let newIndex;
      breadcrumbs = data?.map(
        (crumb: { slug: string; name: string; count: number }, index:number) => {
          newIndex = index + 2;
          return (
            <li key={crumb.slug}>
            {crumb.count == 1 ? (
              <Link
                eventName="B_1"
                data-ya-track="B_1"
                rel="noopener noreferrer"
                href="javascript:void(0)"
                className="cursor-not-allowed"
              >
                {" "}
                {crumb.name}
              </Link>
            ) : (
              <Link
                href={baseUrl + crumb.slug + ".html"}
                eventName={"B_"+ newIndex}
                data-ya-track={"B_"+ newIndex}
                rel="noopener noreferrer"
              >
                {" "}
                {crumb.name}
              </Link>
            )}
          </li>
          )
         
        }
        
         
        
      );
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };
  let bannerTitle: string | undefined = "";
  if (props.name) {
    bannerTitle += props?.name;
  }
  if (props.address?.city) {
    bannerTitle += " " + props.address?.city;
  }
  if (props.address?.region) {
    bannerTitle += ", " + props.address?.region;
  }
  return (
    <div className="breadcrumb border-b border-[#F3F3F3]">
      <ul className="flex">
        <li>
          <Link
            href={siteURL}
            eventName={"b_1"}
            data-ya-track={"b_1"}
            rel="noopener noreferrer"
            className="home"
          >
            {StaticData.Home}
          </Link>
        </li>
        <li>
          <Link
            href={stagingBaseurl}
            eventName={"b_2"}
            data-ya-track={"b_2"}
            rel="noopener noreferrer"
          >
            Store Locator
          </Link>
        </li>
        {list ? (
          list
        ) : (
          <>
            {props.address && props.address.city ? (
              <li className="inline-block">
                {" "}
                <Link
                  eventName={props.address.city ? props.address.city : ""}
                  data-ya-track={props.address.city ? props.address.city : ""}
                  rel="noopener noreferrer"
                  href={props.baseUrl + props.address.city.replaceAll(" ", "-")}
                >
                  {props.address.city ? props.address.city : ""}
                </Link>
              </li>
            ) : (
              <></>
            )}
          </>
        )}

        <li>{bannerTitle}</li>
      </ul>
    </div>
  );
};
export default BreadCrumbs;
