package com.linkedout.backend.converter.availability

import com.linkedout.backend.dto.availability.UpdateAvailabilityDto
import com.linkedout.proto.dto.availability.UpdateAvailabilityDtoOuterClass
import org.springframework.core.convert.converter.Converter

class UpdateAvailabilityDtoToProto : Converter<UpdateAvailabilityDto, UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto> {
    override fun convert(source: UpdateAvailabilityDto): UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto {
        val targetBuilder = UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto.newBuilder()
        if (source.startDate != null) targetBuilder.setStartDate(source.startDate.toEpochDay())
        if (source.endDate != null) targetBuilder.setEndDate(source.endDate.toEpochDay())
        if (source.range != null) targetBuilder.setRange(source.range)
        if (source.jobCategoryId != null) targetBuilder.setJobCategoryId(source.jobCategoryId)

        if (source.address != null) {
            targetBuilder.setAddressFirstLine(source.address.firstLine)
            targetBuilder.setAddressZip(source.address.zipCode)
            targetBuilder.setAddressCity(source.address.city)
        }

        return targetBuilder.build()
    }
}
