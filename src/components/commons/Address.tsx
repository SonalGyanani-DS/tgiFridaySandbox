import * as React from "react";
import { AddressType } from "../../types/search/locations";

/**
 *
 * @param props : Get the props from locator/location page.
 * @returns : Address.
 */
const Address = (props: { address: AddressType }) => {
  const { address } = props;
  return (
    <div className="address notHighlight">
      <div className=" notHighlight">{address.line1}</div>
      {address.line2 && <div>{address.line2}</div>}
      <div className=" notHighlight">
        {address.city}, {address.region}, {address.postalCode}{" "}
      </div>
    </div>
  );
};

export default Address;
