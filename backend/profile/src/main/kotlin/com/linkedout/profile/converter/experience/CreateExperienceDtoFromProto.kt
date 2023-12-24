package com.linkedout.profile.converter.experience

import com.linkedout.profile.dto.experience.CreateExperienceDto
import com.linkedout.proto.dto.experience.CreateExperienceDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate
import java.util.*

class CreateExperienceDtoFromProto : Converter<CreateExperienceDtoOuterClass.CreateExperienceDto, CreateExperienceDto> {
    override fun convert(source: CreateExperienceDtoOuterClass.CreateExperienceDto): CreateExperienceDto {
        return CreateExperienceDto(
            LocalDate.ofEpochDay(source.startDate),
            LocalDate.ofEpochDay(source.endDate),
            source.address.firstLine,
            source.address.zipCode,
            source.address.city,
            UUID.fromString(source.companyId),
            UUID.fromString(source.jobId)
        )
    }
}
