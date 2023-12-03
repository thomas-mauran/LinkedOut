package com.linkedout.common.utils

import com.linkedout.proto.RequestOuterClass
import com.linkedout.proto.ResponseOuterClass
import org.springframework.http.HttpStatus

class RequestResponseFactory private constructor() {
    companion object {
        fun newRequest(requestId: String): RequestOuterClass.Request.Builder {
            return RequestOuterClass.Request.newBuilder()
                .setRequestId(requestId)
        }

        fun newSuccessfulResponse(): ResponseOuterClass.Response.Builder {
            return ResponseOuterClass.Response.newBuilder()
        }

        fun newFailedResponse(message: String, errorCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): ResponseOuterClass.Response.Builder {
            return ResponseOuterClass.Response.newBuilder()
                .setError(
                    ResponseOuterClass.Error.newBuilder()
                        .setErrorMessage(message)
                        .setErrorCode(errorCode.value())
                )
        }
    }
}
