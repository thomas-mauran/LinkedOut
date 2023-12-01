package com.linkedout.common.utils

import com.linkedout.proto.RequestOuterClass
import com.linkedout.proto.ResponseOuterClass
import java.util.UUID

class RequestResponseFactory private constructor() {
    companion object {
        fun newRequest(): RequestOuterClass.Request.Builder {
            return RequestOuterClass.Request.newBuilder()
                .setRequestId(UUID.randomUUID().toString())
        }

        fun newSuccessfulResponse(): ResponseOuterClass.Response.Builder {
            return ResponseOuterClass.Response.newBuilder()
                .setSuccess(true)
        }

        fun newFailedResponse(message: String): ResponseOuterClass.Response.Builder {
            return ResponseOuterClass.Response.newBuilder()
                .setSuccess(false)
                .setErrorMessage(message)
        }
    }
}
