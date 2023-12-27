package com.linkedout.profile.config

import org.springframework.boot.context.properties.ConfigurationProperties
import java.net.URL

@ConfigurationProperties(prefix = "s3")
data class S3ClientConfigurationProperties(
    val endpoint: URL,
    val accessKey: String,
    val secretKey: String,
    val bucket: String,
    val multipartMinPartSize: Long = 5 * 1024 * 1024
)
