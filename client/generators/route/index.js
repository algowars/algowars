export const routeGenerator = {
  description: "Route Generator",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "route name",
    },
  ],
  actions: () => {
    const routeGeneratedPath = "src/app/routes/{{kebabCase name}}.tsx";
    return [
      {
        type: "add",
        path: routeGeneratedPath,
        templateFile: "generators/route/route.tsx.hbs",
      },
    ];
  },
};
