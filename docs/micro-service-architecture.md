# LinkedOut Architecture

The goal of this document is to provide a clear overview of our microservice infrastructure, explain our choices and provide a clear OpenAPI definition.

## Summary

- [LinkedOut Architecture](#linkedout-architecture)
  - [Summary](#summary)
  - [Technologies](#technologies)
    - [Kubernetes](#kubernetes)
    - [Docker](#docker)
    - [NATS](#nats)
      - [NATS vs Kafka](#nats-vs-kafka)
        - [NATS](#nats-1)
        - [Kafka](#kafka)
    - [Kotlin](#kotlin)
      - [Kotlin vs Java](#kotlin-vs-java)
        - [Kotlin](#kotlin-1)
        - [Java](#java)
    - [Spring](#spring)
    - [React Native and Expo](#react-native-and-expo)
      - [React Native vs flutter](#react-native-vs-flutter)
        - [React Native](#react-native)
        - [Flutter](#flutter)
    - [GitHub](#github)
      - [GitHub vs GitLab](#github-vs-gitlab)
        - [GitHub](#github-1)
        - [GitLab](#gitlab)
    - [Keycloak](#keycloak)
      - [Keycloak vs Zitadel vs Auth0](#keycloak-vs-zitadel-vs-auth0)
        - [Keycloak](#keycloak-1)
        - [Zitadel](#zitadel)
        - [Auth0](#auth0)
  - [Services](#services)
    - [API Gateway](#api-gateway)
    - [Recommendation Service](#recommendation-service)
    - [Profile Service](#profile-service)
    - [Job Service](#job-service)
    - [Notification Service](#notification-service)
    - [Message Service](#message-service)
    - [Employer Service](#employer-service)
  - [OpenAPI](#openapi)

## Technologies

### Kubernetes

Our production environment leverages Kubernetes for container orchestration.

This powerful combination provides scalability, flexibility, and efficient management of containerized applications.

### Docker

We use Docker in the local development environment with Docker Composes to bring up the microservices and their databases.

This solution allows us to start our development stack without having to depend on the environment of the developer, and have more reproducible results.

### NATS

NATS is a "Message-oriented Middleware": it allows services to communicate with each other easily.

NATS is the central element in our distributed and scalable infrastructure because it provides dynamic discovery and a message broker.

This will allow us to manage replica sets of services easily since NATS will abstract the concrete connection to the service using its mechanism of "subjects" (which are like Kafka's topics) and will load balance messages between all consumers subscribed to a subject in particular.

We chose this solution instead of Kafka for its lightweight design, low latency and overall simplicity.

It also has a built-in mechanism for doing synchronous request-reply messaging, which will be very useful for communication between the API gateway and the microservices.

#### NATS vs Kafka

##### NATS

**Pros**

- Low latency, designed for real-time messaging.
- Lightweight protocol minimizes overhead.
- Horizontal scalability with clustering support.
- Fault-tolerant, resilient in challenging network conditions.
- Well-suited for distributed systems.

**Cons**

- Smaller community compared to Kafka.
- Limited features for complex event processing.
- May not be as feature-rich as Kafka for large-scale systems.

##### Kafka

**Pros**

- Robust and scalable for large-scale data streaming.
- Durable, fault-tolerant, and high-throughput.
- Rich ecosystem with strong community support.
- Comprehensive features for event sourcing and complex processing.
- Well-established in big data and enterprise environments.

**Cons**

- Requires additional resources for setup and maintenance.
- Higher learning curve due to its feature richness.
- Overhead may be unnecessary for smaller-scale projects.

### Kotlin

We chose Kotlin as our main language for the backend because we wanted to learn a new language that could work in the same environment that Java does.

#### Kotlin vs Java

##### Kotlin

**Pros**

- Concise syntax reduces boilerplate code.
- Modern language features, including null safety.
- 100% interoperability with Java, easing migration.
- Enhanced developer productivity.
- Officially supported by JetBrains.

**Cons**

- Smaller community compared to Java.
- Learning curve for developers transitioning from Java.
- Limited presence in legacy systems.

##### Java

**Pros**

- Widespread adoption and community support.
- Mature ecosystem with extensive libraries and frameworks.
- Platform independence through the Java Virtual Machine (JVM).
- Strong static typing for early error detection.
- Long-standing presence in enterprise development.

**Cons**

- Verbosity in code, requiring more boilerplate.
- Slower adoption of modern language features.
- Null pointer exceptions can be a challenge.

### Spring

Our backend uses Spring as the framework for building our microservices.

Spring Boot simplifies the development process, enhances productivity, and provides a solid foundation for microservices.

### React Native and Expo

As for the frontend, we are using React Native to build a mobile application, which will be the primary way of interacting with LinkedOut.

We are also using Expo, which is a framework that brings build tools and rapid development for React Native-based application by providing features such as hot reload, and the generation of package files for Android and iOS. It also abstracts and exposes the services that the mobile operating system provides to the applications.

#### React Native vs flutter

##### React Native

**Pros**

- Large, mature community.
- Smooth transition with JavaScript/React.
- Easy access to native modules.
- Flexibility for native code integration.
- Strong industry adoption.

**Cons**

- Slightly lower performance than Flutter.
- Communication overhead between JS and native.
- Dependency on native modules for complex components.

##### Flutter

**Pros**

- Single codebase for iOS and Android.
- Rich, customizable interfaces.
- Quick development with hot reload.
- High performance with Dart language.
- Growing community support.

**Cons**

- Learning curve for Dart.
- Limited access to certain native modules.
- Smaller ecosystem compared to React Native.

### GitHub

We use GitHub as our code host and collaboration platform since we both use it on a daily basis, and we know it the most.

We will also use the CI integrated in GitHub for our CI/CD pipelines, and use its GitHub Actions to simplify this process.

#### GitHub vs GitLab

##### GitHub

**Pros**

- Large community and ecosystem.
- User-friendly interface.
- Robust documentation.
- Powerful collaboration features.
- GitHub Actions for CI/CD.

**Cons**

- Charges for private repositories.
- Limited built-in CI/CD features.
- Dependency on Microsoft.

##### GitLab

**Pros**

- Integrated CI/CD.
- Free private repositories.
- Comprehensive DevOps platform.
- Flexible deployment options.
- Built-in container registry.

**Cons**

- Learning curve for the interface.
- Smaller community compared to GitHub.
- Extensive feature set may overwhelm for simpler projects.

### Keycloak

[Keycloak](https://www.keycloak.org/) is an open source identity and access management solution.

It is used to provide a secure authentication and authorization experience for the users.

We decided to use Keycloak instead of another service like Zitadel or Auth0 to acquire more experience on it since it is one of the most popular identity providers.

#### Keycloak vs Zitadel vs Auth0

##### Keycloak

**Pros**

- Open source
- Widely use with a strong community
- Wide range of features

**Cons**

- Complexity: when first trying Keycloak, it can be kind of complex to understand its role and implications
- Its documentation might be very hard to get through on some topics

##### Zitadel

**Pros**

- Strong focus on user experience and user-centric identity management.
- Open source and free to use.
- More modern and lightweight compared to Keycloak.

**Cons**

- Zitadel has fewer users and community support compared to more established solutions like Keycloak or Auth0.
- Less flexibility and customization compared to Keycloak.

##### Auth0

**Pros**

- Easy to use and quick to set up.
- Widely adopted with a large community.
- Well-organized documentation.

**Cons**

- While Auth0 has a free tier, it is limited to 7,500 active users.
- Its free tier also has limited features compared to the paid tiers.
- Proprietary software.
- Not self-hosted.

## Services

![microservices](./assets/ms.png)

### API Gateway

The API Gateway is a single entry point for all clients.

It provides HTTP endpoints to access the different services in the infrastructures, and does so while checking the authorization claims of the user doing the request.

This service works closely with the Keycloak service to validate the tokens.

### Recommendation Service

The Recommendation Service is used to recommend job offers to seasonal workers.

It will have read access to the job and profile services and replicate the data in a graph database (such as Neo4j) to find connections between related items and provide scores on the job offers for a seasonal worker.

### Profile Service

The Profile Service is responsible for managing the profiles of the users.

Profiles will be stored in a Postgres database and also uses R2DBC as its database driver.

### Job Service

The Job Service is responsible for managing jobs, job categories, job offers and companies. This service is implemented in Kotlin using Spring R2DBC as a reactive database driver.

We chose R2DBC instead of JPA because we need to have asynchronous requests in our architecture to optimize latency.
Having a synchronous system would mean we could only treat one request at a time which, at larger scale, would not be efficient enough.

The service uses a Postgres database to store its data.

### Notification Service

The Notification Service is responsible for storing and sending notifications to the users.

### Message Service

The Message Service is here to manage communications between seasonal workers and employers, allowing them to chat using instant messaging.

This service will have persistent storage provided by a Postgres database.

### Employer Service

The Employer Service represents the external software that employers uses to manage their job offers.

LinkedOut calls to this external software for retrieving job offers, or giving evaluations to employers for instance.
On the other hand, this external software calls to LinkedOut when an employer wants to message a seasonal worker, or to give an evaluation to a seasonal worker for instance.

Since the employer service is normally an external service, we will only implement something that mocks it.

## OpenAPI

We decided to create an OpenAPI specification document that documents every route accessible from the API gateway for the mobile application to normalize our interfaces and make the whole process easier by allowing us to architecture our API early and implement a mock server for it.

The document is available [here](./openapi/api_gateway.yml).
