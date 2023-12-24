package com.linkedout.backend.converter.experience

import com.linkedout.backend.dto.experience.UpdateExperienceDto
import com.linkedout.proto.dto.experience.UpdateExperienceDtoOuterClass
import org.springframework.core.convert.converter.Converter

class UpdateExperienceDtoToProto : Converter<UpdateExperienceDto, UpdateExperienceDtoOuterClass.UpdateExperienceDto.Builder> {
    override fun convert(source: UpdateExperienceDto): UpdateExperienceDtoOuterClass.UpdateExperienceDto.Builder {
        val targetBuilder = UpdateExperienceDtoOuterClass.UpdateExperienceDto.newBuilder()
        if (source.startDate != null) targetBuilder.setStartDate(source.startDate.toEpochDay())
        if (source.endDate != null) targetBuilder.setEndDate(source.endDate.toEpochDay())

        if (source.address != null) {
            targetBuilder.setAddressFirstLine(source.address.firstLine)
            targetBuilder.setAddressZip(source.address.zipCode)
            targetBuilder.setAddressCity(source.address.city)
        }

        return targetBuilder
    }
}
