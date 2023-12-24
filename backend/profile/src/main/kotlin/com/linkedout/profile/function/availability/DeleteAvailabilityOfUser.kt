package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class DeleteAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val availabilityId = UUID.fromString(request.availabilityId)

        // Delete the availability
        availabilityService.deleteByUserIdAndAvailabilityId(userId, availabilityId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteUserAvailabilityResponse(Profile.DeleteUserAvailabilityResponse.getDefaultInstance())
            .build()
    }
}
