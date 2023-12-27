package com.linkedout.common.utils

import com.linkedout.proto.ResponseOuterClass.Response
import org.springframework.web.ErrorResponseException

inline fun handleRequestError(block: () -> Response): Response {
    return try {
        block()
    } catch (e: ErrorResponseException) {
        e.printStackTrace()
        RequestResponseFactory.newFailedResponse(e.message, e.statusCode).build()
    } catch (e: Throwable) {
        e.printStackTrace()
        RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
    }
}
