package com.linkedout.backend.converter.experience

import com.linkedout.backend.dto.experience.CreateExperienceDto
import com.linkedout.proto.dto.experience.CreateExperienceDtoOuterClass
import com.linkedout.proto.models.AddressOuterClass
import org.springframework.core.convert.converter.Converter

class CreateExperienceDtoToProto : Converter<CreateExperienceDto, CreateExperienceDtoOuterClass.CreateExperienceDto.Builder> {
    override fun convert(source: CreateExperienceDto): CreateExperienceDtoOuterClass.CreateExperienceDto.Builder {
        return CreateExperienceDtoOuterClass.CreateExperienceDto.newBuilder()
            .setStartDate(source.startDate.toEpochDay())
            .setEndDate(source.endDate.toEpochDay())
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.address.firstLine)
                    .setZipCode(source.address.zipCode)
                    .setCity(source.address.city)
            )
    }
}
