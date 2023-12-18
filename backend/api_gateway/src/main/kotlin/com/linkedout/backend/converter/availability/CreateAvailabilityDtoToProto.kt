package com.linkedout.backend.converter.availability

import com.linkedout.backend.dto.availability.CreateAvailabilityDto
import com.linkedout.proto.dto.availability.CreateAvailabilityDtoOuterClass
import com.linkedout.proto.models.AddressOuterClass
import org.springframework.core.convert.converter.Converter

class CreateAvailabilityDtoToProto : Converter<CreateAvailabilityDto, CreateAvailabilityDtoOuterClass.CreateAvailabilityDto> {
    override fun convert(source: CreateAvailabilityDto): CreateAvailabilityDtoOuterClass.CreateAvailabilityDto {
        return CreateAvailabilityDtoOuterClass.CreateAvailabilityDto.newBuilder()
            .setStartDate(source.startDate.toEpochDay())
            .setEndDate(source.endDate.toEpochDay())
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.address.firstLine)
                    .setZipCode(source.address.zipCode)
                    .setCity(source.address.city)
            )
            .setRange(source.range)
            .setJobCategoryId(source.jobCategoryId)
            .build()
    }
}
