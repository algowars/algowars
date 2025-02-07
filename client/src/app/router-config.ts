export const routerConfig = {
  root: {
    path: "/",
  },
  profile: {
    path: "/profile/:username",
    execute: (username: string) => `/profile/${encodeURIComponent(username)}`,
  },
  accountSetup: {
    path: "/account/setup",
  },
  admin: {
    path: "/admin",
  },
  adminViewProblems: {
    path: "/admin/problems",
  },
  settings: {
    path: "/settings",
  },
  rushSolo: {
    path: "/rush/solo/:rushId",
    execute: (rushId: string) => `/rush/solo/${encodeURIComponent(rushId)}`,
  },
  adminCreateProblem: {
    path: "/admin/create-problem",
  },
  problem: {
    path: "/problem/:slug",
    execute: (slug: string) => `/problem/${encodeURIComponent(slug)}`,
  },
  problems: {
    path: "/problems",
  },
  problemSolutions: {
    path: "/problem/:slug/solutions",
    execute: (slug: string) => `/problem/${encodeURIComponent(slug)}/solutions`,
  },
  rush: {
    path: "/rush",
  },
  soloRush: {
    path: "/rush/solo/",
    execute: (rushId: string) => `/rush/solo/${encodeURIComponent(rushId)}`,
  },
  notFound: {
    path: "*",
  },
};
