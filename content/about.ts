import { TO_CONFIRM } from "./legal";

/**
 * About page. Items whose text is "[TO CONFIRM]" are filtered out at render time, so the values
 * row and timeline stay hidden until the team fills them in. Replace the placeholders below.
 */
export const about = {
  heading: [{ t: "What makes us " }, { t: "tick", em: true }],
  mission:
    "Zekured aims to provide innovative and accessible financial services to underserved entrepreneurs and individuals in Nigeria.",
  values: [
    { title: TO_CONFIRM, text: TO_CONFIRM },
    { title: TO_CONFIRM, text: TO_CONFIRM },
    { title: TO_CONFIRM, text: TO_CONFIRM },
  ],
  timeline: [
    { when: TO_CONFIRM, what: TO_CONFIRM },
    { when: TO_CONFIRM, what: TO_CONFIRM },
  ],
};
