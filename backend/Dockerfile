# Build stage
FROM amazoncorretto:17-alpine AS build
ARG SERVICE_NAME
WORKDIR /app

COPY ./$SERVICE_NAME ./$SERVICE_NAME
COPY ./common ./common
COPY ./protobuf ./protobuf
COPY ./gradle ./gradle
COPY ./gradle.properties .
COPY ./gradlew .
COPY ./settings.gradle.kts .

RUN --mount=type=cache,target=/root/.gradle ./gradlew clean build -x test

# Run stage
FROM amazoncorretto:17-alpine AS run
ARG SERVICE_NAME
WORKDIR /app

COPY --from=build /app/$SERVICE_NAME/build/libs/*-SNAPSHOT.jar ./app.jar

ENTRYPOINT ["java", "-jar", "./app.jar"]
