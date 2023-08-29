/* eslint-disable react/no-unescaped-entities */
import * as React from "react";

import { useState } from "react";
import AccordionItem from "./AccordianItem";
import { Faqs } from "../../types/LocationSections";

/**
 * Initialize FAQs se section
 * @param props : FAQs
 * @returns : HTMl
 */

export default function Faq(props: Faqs) {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderedQuestionsAnswers = props.faqs.map(
    (item: { question: string; answer: string }, index: number) => {
      const showDescription = index === activeIndex ? "current" : "hidden";
      const background = index === activeIndex ? "active" : "";
      const fontWeightBold =
        index === activeIndex ? " font-weight-bold faq-tab py-0 mt-2" : "";
      const ariaExpanded = index === activeIndex ? true : false;
      return (
        <AccordionItem
          key={index}
          showDescription={showDescription}
          fontWeightBold={fontWeightBold}
          ariaExpanded={ariaExpanded}
          background={background}
          item={item}
          index={index}
          onClick={() => {
            setActiveIndex(index);
          }}
        />
      );
    }
  );

  return (
    <>
      <div className=" faq-main-sec">
        <div className=" faq-card ">
          <div className="faq-sec-inner">
            <h2 className="!text-black">FAQ's</h2>
            <div className="faq-tabs">{renderedQuestionsAnswers}</div>
          </div>
        </div>
      </div>
    </>
  );
}
