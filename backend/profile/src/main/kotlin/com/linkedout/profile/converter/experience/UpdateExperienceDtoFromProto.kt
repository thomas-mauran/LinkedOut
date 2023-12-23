package com.linkedout.profile.converter.experience

import com.linkedout.profile.dto.experience.UpdateExperienceDto
import com.linkedout.proto.dto.experience.UpdateExperienceDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate
import java.util.*

class UpdateExperienceDtoFromProto : Converter<UpdateExperienceDtoOuterClass.UpdateExperienceDto, UpdateExperienceDto> {
    override fun convert(source: UpdateExperienceDtoOuterClass.UpdateExperienceDto): UpdateExperienceDto {
        return UpdateExperienceDto(
            if (source.hasStartDate()) LocalDate.ofEpochDay(source.startDate) else null,
            if (source.hasEndDate()) LocalDate.ofEpochDay(source.endDate) else null,
            if (source.hasAddressFirstLine()) source.addressFirstLine else null,
            if (source.hasAddressZip()) source.addressZip else null,
            if (source.hasAddressCity()) source.addressCity else null,
            if (source.hasCompanyId()) UUID.fromString(source.companyId) else null,
            if (source.hasJobId()) UUID.fromString(source.jobId) else null
        )
    }
}
