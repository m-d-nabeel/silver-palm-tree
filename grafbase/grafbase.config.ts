import { g, auth, config } from "@grafbase/sdk";

const User = g.model("User", {
  name: g.string().length({ min: 3, max: 30 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ max: 500 }).optional(),
  gitHubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g
    .relation(() => Project)
    .list()
    .optional(),
});

const Project = g.model("Project", {
  title: g.string().length({ min: 3 }),
  description: g.string().length({ max: 500 }).optional(),
  image: g.url(),
  liveSiteUrl: g.url().optional(),
  gitHubUrl: g.url().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});
