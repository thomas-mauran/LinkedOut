import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    `java-library`
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("org.jlleitschuh.gradle.ktlint")
    kotlin("jvm")
    kotlin("plugin.spring")
    kotlin("plugin.jpa")
}

group = "com.linkedout"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":protobuf"))
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework:spring-messaging")
    implementation("io.nats:jnats:2.17.1")
    implementation("com.google.protobuf:protobuf-kotlin:3.25.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.getByName<BootJar>("bootJar") {
    enabled = false
}
