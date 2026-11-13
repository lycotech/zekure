/** Open roles. Add objects here to list them on /careers; leave empty to show the general-application prompt. */
export type Role = { title: string; team: string; location: string; href?: string };

export const openRoles: Role[] = [];

export const careersCopy = {
  heading: [{ t: "Come " }, { t: "Join Us", em: true }],
  text: "We invite you to explore the exciting career possibilities that await you at Zekured.",
};
