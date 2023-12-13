package com.linkedout.common.utils

import com.linkedout.proto.ResponseOuterClass.Response

inline fun handleRequestError(block: () -> Response): Response {
    return try {
        block()
    } catch (e: Exception) {
        RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
    }
}
