import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot")
	id("io.spring.dependency-management")
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
	implementation("org.springframework.boot:spring-boot-starter-actuator:3.1.5")
	implementation("org.springframework.boot:spring-boot-starter-data-r2dbc:3.1.5")
	implementation("org.springframework.boot:spring-boot-starter-validation:3.1.5")
	implementation("org.springframework.boot:spring-boot-starter-webflux:3.1.5")
	implementation("org.springframework.boot:spring-boot-starter-web:3.1.5")
	implementation("org.springframework:spring-jdbc:6.0.13")
	implementation("org.flywaydb:flyway-core:9.22.3")
	implementation("org.postgresql:r2dbc-postgresql:1.0.2.RELEASE")
	implementation("jakarta.validation:jakarta.validation-api:3.0.2")
	implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.20")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("org.postgresql:postgresql")
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
