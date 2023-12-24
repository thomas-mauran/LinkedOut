package com.linkedout.profile.converter.availability

import com.linkedout.profile.dto.availability.UpdateAvailabilityDto
import com.linkedout.proto.dto.availability.UpdateAvailabilityDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate
import java.util.*

class UpdateAvailabilityDtoFromProto : Converter<UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto, UpdateAvailabilityDto> {
    override fun convert(source: UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto): UpdateAvailabilityDto {
        return UpdateAvailabilityDto(
            if (source.hasStartDate()) LocalDate.ofEpochDay(source.startDate) else null,
            if (source.hasEndDate()) LocalDate.ofEpochDay(source.endDate) else null,
            if (source.hasAddressFirstLine()) source.addressFirstLine else null,
            if (source.hasAddressZip()) source.addressZip else null,
            if (source.hasAddressCity()) source.addressCity else null,
            if (source.hasRange()) source.range else null,
            if (source.hasJobCategoryId()) UUID.fromString(source.jobCategoryId) else null
        )
    }
}
