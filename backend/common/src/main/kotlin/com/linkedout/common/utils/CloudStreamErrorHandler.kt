package com.linkedout.common.utils

import com.linkedout.proto.ResponseOuterClass.Response

inline fun handleRequestError(block: () -> Response): Response {
    return try {
        block()
    } catch (e: Throwable) {
        RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
    }
}
