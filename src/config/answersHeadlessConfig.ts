import { AnswersHeadlessProvider } from "@yext/answers-headless-react";

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

/** API endpoints */
export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: "3365764e059cba3e68438a1a16330511",
  experienceKey: "tgi-fridays-search",
  locale: "en",
  sessionTrackingEnabled: true,
};
