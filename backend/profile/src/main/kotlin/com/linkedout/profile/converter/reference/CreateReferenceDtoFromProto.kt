package com.linkedout.profile.converter.reference

import com.linkedout.profile.dto.reference.CreateReferenceDto
import com.linkedout.proto.dto.reference.CreateReferenceDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.util.*

class CreateReferenceDtoFromProto : Converter<CreateReferenceDtoOuterClass.CreateReferenceDto, CreateReferenceDto> {
    override fun convert(source: CreateReferenceDtoOuterClass.CreateReferenceDto): CreateReferenceDto {
        return CreateReferenceDto(
            source.firstName,
            source.lastName,
            source.address.firstLine,
            source.address.zipCode,
            source.address.city,
            source.phone,
            source.email,
            UUID.fromString(source.companyId)
        )
    }
}
