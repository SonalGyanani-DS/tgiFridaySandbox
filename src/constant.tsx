
export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	subLocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}
const constant = {
  slugify(slugString: string) {
    slugString.toLowerCase().toString();
    slugString = slugString.replace(/[&/\\#^+()$~%.'":*?<>{}!@]/g, "");
    slugString = slugString.replaceAll("  ", "-");
    slugString = slugString.replaceAll(" ", "-");
    slugString = slugString.replaceAll(",", "");
    return slugString.toLowerCase();
  },
  
 
  getLocationSlugUri(id: string, address: Address, slug:string | undefined) {
    let url = "";    
    if (!slug) {
      let slugString = "";
      if (typeof address.line1 != "undefined") {
        slugString += address.line1;
      }
      if (typeof address.line2 != "undefined") {
        slugString += " " + address.line2;
      }

      if (slugString) {
        slugString = constant.slugify(slugString);
      } else {
        slugString = constant.slugify(id);
      }

      url = `${constant.slugify(address.region ?? '')}/${constant.slugify(
        address.city ?? ''
      )}/${slugString}`;
    } else {
      url = `${constant.slugify(address.region ?? '')}/${constant.slugify(
        address.city ?? ''
      )}/${constant.slugify(slug)}`;
    }
    url = url + ".html";
    return url;
  },
};
export default constant;
