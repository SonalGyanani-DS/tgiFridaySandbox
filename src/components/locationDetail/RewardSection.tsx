import { Link } from "@yext/pages/components";
import * as React from "react";
import { RewardSectionType } from "../../types/LocationSections";

/**
 * RewardSection
 * @param props :data
 * @returns : HTML
 */

export const RewardSection = (props: RewardSectionType) => {
  const { c_rewardSection } = props;
  return (
    <>
      {" "}
      <div>
        {c_rewardSection?.heading ? (
          <section
            className={
              c_rewardSection.image?.url
                ? "img-with-content with-image"
                : "img-with-content"
            }
          >
            <div className="container">
              <div className="content-wrapper">
                {c_rewardSection?.image
                  ? c_rewardSection.image?.url && (
                      <div className="img-block">
                        <img
                          src={c_rewardSection.image?.url}
                          height={"1180"}
                          width={"1440"}
                          alt={
                            c_rewardSection?.image?.alternateText
                              ? c_rewardSection?.image?.alternateText
                              : "Reward"
                          }
                        />
                      </div>
                    )
                  : ""}

                <div className="content-block">
                  {c_rewardSection?.heading ? (
                    <h3>{c_rewardSection.heading}</h3>
                  ) : (
                    ""
                  )}

                  {c_rewardSection?.description?.map(
                    (data: string, index: number) => (
                      <p key={index}>{data}</p>
                    )
                  )}
                  {c_rewardSection?.cTAs ? (
                    <Link
                      target={
                        c_rewardSection?.cTAslinkType == "OTHER"
                          ? "_blank"
                          : "tab"
                      }
                      eventName="Reward_Section_CTA_1"
                      data-ya-track="Reward_Section_CTA_1"
                      rel="noopener noreferrer"
                      href={c_rewardSection.cTAs.link}
                      className="cta-btn"
                    >
                      {c_rewardSection.cTAs?.label}
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
