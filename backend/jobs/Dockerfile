# Use the official OpenJDK base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle files
COPY ./jobs/build.gradle.kts ./settings.gradle.kts /app/
COPY ./gradlew /app/gradlew
COPY ./gradle /app/gradle

# Copy the source code
COPY ./jobs/src /app/src

# Make the gradlew script executable
RUN chmod +x /app/gradlew

# Build the application
RUN /app/gradlew build

# Expose the port that your application will run on
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "build/libs/your-app-name.jar"]
