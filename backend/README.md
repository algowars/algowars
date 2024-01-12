# Algowars Backend Application

This is the core repository for algowars. The project is architect using **Domain-Driven Design (DDD)** and **Service-Oriented Architecture (SOA)** principles. The project is built with spring boot and Auth0 for user management.

```sh
#build
./mvnw clean install

#run
./mvnw spring-boot:run
```

## Table of Contents

- [Domains](#domains)
  - [Core Domain](#core-domain)

## Domains

Several Business Capabilities have been identified:

### Core Domain

- **Problems**

  - Create a problem
  - Categorize problems
  - Update a problem
  - Read a problem
  - List problems (paginated)

- **Evaluator**
  - Run tests on code anonymously
    - Rate Limitter
    - Proper Validation
  - Run tests on code from user
    - Rate Limitter (longer than anonymous)
    - Proper Validation
  - Set VM to support other languages (Initially JavaScript)

### Supporting Domains

- **User FeedBack**
  - Gather wanted additions/changes
  - Gather bugs and issues

## Architectural Overview

While no popular architecture ([Onion][onion], [Clean][clean], [Hexagonal][hexagonal], [Trinity][trinity]) was strictly implemented, the used architectural style follows principles and good practices found over all of them.

- Low coupling, high cohesion
- Implementation hiding
- Rich domain model
- Separation of concerns
- The Dependency Rule

The below proposed architecture tries to solve one problem often common for these architectural styles: [exposing internals of objects](https://blog.ttulka.com/object-oriented-design-vs-persistence) and breaking their encapsulation. The proposed architecture employs full object encapsulation and rejects anti-patterns like Anemic Domain Model or JavaBean. An Object is a solid unit of behavior. A Service is an Object on higher level of architectural abstraction.

[onion]: http://jeffreypalermo.com/blog/the-onion-architecture-part-1
[clean]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[hexagonal]: https://alistair.cockburn.us/hexagonal-architecture/
[trinity]: https://github.com/oregor-projects/trinity-demo-java

### Screaming Architecture

The architecture "screams" its intentions just by looking at the code structure:

```
..ecommerce
    billing
        payment
    sales
        category
        order
        product
    shipping
        delivery
    warehouse
```

Going deeper the technical concepts are visible too:

```
..ecommerce
    billing
        payment
            jdbc
        listeners
        rest
```

### Packaging

As shown in the previous section, the code is structured by the domain together with packages for technical concerns (`jdbc`, `rest`, `web`, etc.).

Such a packaging style is the first step for a further modularization.

The semantic of a package is following: `company.product.domain.service.[entity|impl]`, where `entity` and `impl` are optional. Full example: `com.ttulka.ecommerce.billing.payment.jdbc`.

### Assembling

While a physically monolithic deployment is okay for most cases, a logically monolithic design, where everything is coupled with everything, is evil.

To show that the Monolith architectural pattern is not equal to the Big Ball Of Mud, a modular monolithic architecture was chosen as the start point.

The services can be further cut into separate modules (eg. Maven artifacts) by feature:

```
com.algowars.backend:backend-application
com.algowars.backend.problems:category-service
com.algowars.backend.problems:problem-service
com.algowars.backend.evaluator:evaluator-service
```

Note: Events are actually part of the domain, that's why they are in the package `..ecommerce.billing.payment` and not in `..ecommerce.billing.payment.events`. They are in a separate module to break the build cyclic dependencies: a dependent module (Listener) needs to know only Events and not the entire Domain.

See this approach in an alternative branch: [modulith](https://github.com/ttulka/ddd-example-ecommerce/tree/modulith).

### Anatomy of a Service

**[Service](http://udidahan.com/2010/11/15/the-known-unknowns-of-soa/)** is the technical authority for a specific business capability.

- There is a one-to-one mapping between a Bounded Context and a Subdomain (ideal case).
- A Bounded Context defines the boundaries of the biggest services possible.
- A Bounded Context can be decomposed into multiple service boundaries.
  - For example, Sales domain contains Catalog, Cart and Order services.
- A service boundaries are based on service responsibilities and behavior.
- A service is defined by its logical boundaries, not a physical deployment unit.

**Application** is a deployment unit. A monolithic Application can have more Services.

- Bootstrap (application container etc.).
- Cross-cutting concerns (security, transactions, messaging, logging, etc.).

![Application and Services](doc/application-services.png)

**Configuration** assemblies the Service as a single component.

- Has dependencies to all inner layers.
- Can be implemented by Spring's context `@Configuration` or simply by object composition and Dependency Injection.
- Implements the Dependency Inversion Principle.

**Gateways** create the published API of the Service.

- Driving Adapters in the Hexagonal Architecture.
- REST, SOAP, or web Controllers,
- Event Listeners,
- CLI.

**Use-Cases** are entry points to the service capabilities and together with **Entities** form the _Domain API_.

- Ports in the Hexagonal Architecture.
- No implementation details.
- None or minimal dependencies.

_Domain Implementation_ fulfills the Business Capabilities with particular technologies.

- Driven Adapters in the Hexagonal Architecture.
- Tools and libraries,
- persistence,
- external interfaces access.

Source code dependencies point always inwards and, except Configuration, are strict: allows coupling only to the one layer below it (for example, Gateways mustn't call Entities directly, etc.).

![Service Anatomy](doc/service-anatomy.png)
