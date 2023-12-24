package com.linkedout.backend.converter.reference

import com.linkedout.backend.dto.reference.UpdateReferenceDto
import com.linkedout.proto.dto.reference.UpdateReferenceDtoOuterClass
import org.springframework.core.convert.converter.Converter

class UpdateReferenceDtoToProto : Converter<UpdateReferenceDto, UpdateReferenceDtoOuterClass.UpdateReferenceDto.Builder> {
    override fun convert(source: UpdateReferenceDto): UpdateReferenceDtoOuterClass.UpdateReferenceDto.Builder {
        val targetBuilder = UpdateReferenceDtoOuterClass.UpdateReferenceDto.newBuilder()
        if (source.firstName != null) targetBuilder.setFirstName(source.firstName)
        if (source.lastName != null) targetBuilder.setLastName(source.lastName)
        if (source.phone != null) targetBuilder.setPhone(source.phone)
        if (source.email != null) targetBuilder.setEmail(source.email)

        if (source.address != null) {
            targetBuilder.setAddressFirstLine(source.address.firstLine)
            targetBuilder.setAddressZip(source.address.zipCode)
            targetBuilder.setAddressCity(source.address.city)
        }

        return targetBuilder
    }
}
