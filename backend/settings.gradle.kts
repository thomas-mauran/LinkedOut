pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
    id("org.springframework.boot") version "3.2.0" apply false
    id("io.spring.dependency-management") version "1.1.4" apply false
    id("org.jlleitschuh.gradle.ktlint") version "11.6.1" apply false
    kotlin("jvm") version "1.9.20" apply false
    kotlin("plugin.spring") version "1.9.20" apply false
    kotlin("plugin.jpa") version "1.9.20" apply false
}

rootProject.name = "linkedout-backend"
include("api_gateway")
include("common")
include("jobs")
include("protobuf")
