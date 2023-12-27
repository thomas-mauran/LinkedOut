package com.linkedout.profile.config

import io.minio.MinioClient
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties(S3ClientConfigurationProperties::class)
class S3ClientConfiguration {
    @Bean
    fun s3Client(s3props: S3ClientConfigurationProperties): MinioClient {
        return MinioClient.builder()
            .endpoint(s3props.endpoint)
            .credentials(s3props.accessKey, s3props.secretKey)
            .build()
    }
}
