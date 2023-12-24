package com.linkedout.profile.converter.reference

import com.linkedout.profile.dto.reference.UpdateReferenceDto
import com.linkedout.proto.dto.reference.UpdateReferenceDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.util.*

class UpdateReferenceDtoFromProto : Converter<UpdateReferenceDtoOuterClass.UpdateReferenceDto, UpdateReferenceDto> {
    override fun convert(source: UpdateReferenceDtoOuterClass.UpdateReferenceDto): UpdateReferenceDto {
        return UpdateReferenceDto(
            if (source.hasFirstName()) source.firstName else null,
            if (source.hasLastName()) source.lastName else null,
            if (source.hasAddressFirstLine()) source.addressFirstLine else null,
            if (source.hasAddressZip()) source.addressZip else null,
            if (source.hasAddressCity()) source.addressCity else null,
            if (source.hasPhone()) source.phone else null,
            if (source.hasEmail()) source.email else null,
            if (source.hasCompanyId()) UUID.fromString(source.companyId) else null
        )
    }
}
