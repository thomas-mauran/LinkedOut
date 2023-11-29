import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("com.google.protobuf") version "0.9.4"
    kotlin("jvm")
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
    api("com.google.protobuf:protobuf-kotlin:3.25.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
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
