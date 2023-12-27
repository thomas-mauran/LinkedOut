package com.linkedout.profile.service

import com.linkedout.profile.config.S3ClientConfigurationProperties
import io.minio.GetObjectArgs
import io.minio.MinioClient
import io.minio.PutObjectArgs
import io.minio.errors.ErrorResponseException
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*

@Service
class AttachmentService(
    private val s3Client: MinioClient,
    private val s3ClientConfigurationProperties: S3ClientConfigurationProperties
) {
    fun findCvOfUser(userId: UUID): ByteArray {
        return getObject("user:$userId/cv")
    }

    fun setCvOfUser(userId: UUID, cv: ByteArray) {
        putObject("user:$userId/cv", cv, MediaType.APPLICATION_PDF_VALUE)
    }

    fun findProfilePictureOfUser(userId: UUID): ByteArray {
        return getObject("user:$userId/profile-picture")
    }

    fun setProfilePictureOfUser(userId: UUID, profilePicture: ByteArray) {
        putObject("user:$userId/profile-picture", profilePicture, MediaType.IMAGE_PNG_VALUE)
    }

    private fun getObject(key: String): ByteArray {
        val data = try {
            s3Client.getObject(
                GetObjectArgs.builder()
                    .bucket(s3ClientConfigurationProperties.bucket)
                    .`object`(key)
                    .build()
            ).readAllBytes()
        } catch (e: ErrorResponseException) {
            throw ResponseStatusException(
                HttpStatus.resolve(e.response().code) ?: HttpStatus.INTERNAL_SERVER_ERROR,
                e.errorResponse().message(),
                e
            )
        }

        return data
    }

    private fun putObject(key: String, data: ByteArray, contentType: String) {
        s3Client.putObject(
            PutObjectArgs.builder()
                .bucket(s3ClientConfigurationProperties.bucket)
                .`object`(key)
                .stream(data.inputStream(), data.size.toLong(), -1)
                .contentType(contentType)
                .build()
        )
    }
}
