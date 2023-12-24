package com.linkedout.profile.converter.availability

import com.linkedout.profile.dto.availability.CreateAvailabilityDto
import com.linkedout.proto.dto.availability.CreateAvailabilityDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate
import java.util.*

class CreateAvailabilityDtoFromProto : Converter<CreateAvailabilityDtoOuterClass.CreateAvailabilityDto, CreateAvailabilityDto> {
    override fun convert(source: CreateAvailabilityDtoOuterClass.CreateAvailabilityDto): CreateAvailabilityDto {
        return CreateAvailabilityDto(
            LocalDate.ofEpochDay(source.startDate),
            LocalDate.ofEpochDay(source.endDate),
            source.address.firstLine,
            source.address.zipCode,
            source.address.city,
            source.range,
            UUID.fromString(source.jobCategoryId)
        )
    }
}
