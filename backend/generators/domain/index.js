/**
 *
 * @type {import('plop').PlopGenerator}
 */
export const domainGenerator = {
  description: 'Domain Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'domain name',
    },
    {
      type: 'input',
      name: 'folder',
      message: 'folder for domain',
    },
  ],
  actions: (answers) => {
    const domainGeneratedPath = 'src/{{folder}}/{{kebabCase name}}';
    return [
      ...generateApplicationFiles(domainGeneratedPath),
      ...generateDomainFiles(domainGeneratedPath),
      ...generateInfrastructure(domainGeneratedPath),
      ...generateInterfaceFiles(domainGeneratedPath),
    ]
  },
};

const generateApplicationFiles = (basePath) => {
  const appPath = basePath + "/application";
  return [
    {
      type: "add",
      path: appPath + "/queries/index.ts",
      templateFile: "generators/domain/application/queries/index.ts.hbs"
    },
    {
      type: "add",
      path: appPath + "/injection-token.ts",
      templateFile: "generators/domain/application/injection-token.ts.hbs"
    }
  ]
}

const generateDomainFiles = (basePath) => {
  const appPath = basePath + "/domain";
  return [
    {
      type: "add",
      path: appPath + "/{{kebabCase name}}.ts",
      templateFile: "generators/domain/domain/entity.ts.hbs"
    },
    {
      type: "add",
      path: appPath + "/{{kebabCase name}}.spec.ts",
      templateFile: "generators/domain/domain/entity.spec.ts.hbs"
    }
  ]
}

const generateInfrastructure = (basePath) => {
  const appPath = basePath + "/infrastructure";
  return [
    {
      type: "add",
      path: appPath + "/entities/{{kebabCase name}}.entity.ts",
      templateFile: "generators/domain/infrastructure/entities/entity.entity.ts.hbs"
    },
    {
      type: "add",
      path: appPath + "/queries/{{kebabCase name}}-query-implementation.ts",
      templateFile: "generators/domain/infrastructure/queries/entity-query-implementation.ts.hbs"
    },
    {
      type: "add",
      path: appPath + "/repositories/{{kebabCase name}}-repositories-implementation.ts",
      templateFile: "generators/domain/infrastructure/repositories/entity-repository-implementation.ts.hbs"
    }
  ]
}

const generateInterfaceFiles = (basePath) => {
  const appPath = basePath + "/interface";
  return [
    {
      type: "add",
      path: appPath + "/{{kebabCase name}}.controller.ts",
      templateFile: "generators/domain/interface/entity.controller.ts.hbs"
    },
    {
      type: "add",
      path: appPath + "/{{kebabCase name}}.controller.spec.ts",
      templateFile: "generators/domain/interface/entity.controller.spec.ts.hbs"
    }
  ]
}