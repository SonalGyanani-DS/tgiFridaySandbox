import * as React from "react";
import RtfConverter from "@yext/rtf-converter";
import { AccordianItemDataType } from "../../types/LocationSections";
/** Accordion for FAQs  */

const AccordionItem = (props: AccordianItemDataType) => {
  const {
    showDescription,
    ariaExpanded,
    fontWeightBold,
    background,
    item,
    index,
    onClick,
  } = props;
  return (
    <div className="faq-tab py-0 mt-2" key={item.question}>
      <button
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`faq__question-button !px-0 ${fontWeightBold}`}
        onClick={onClick}
      >
        <span className={`faq-tab-label  ${background} `}>{item.question}</span>
      </button>
      <div
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`faq-tab-content ${showDescription}`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: RtfConverter.toHTML(item.answer),
          }}
        />
      </div>
    </div>
  );
};

export default AccordionItem;
