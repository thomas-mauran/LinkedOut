package com.linkedout.backend.converter.reference

import com.linkedout.backend.dto.reference.CreateReferenceDto
import com.linkedout.proto.dto.reference.CreateReferenceDtoOuterClass
import com.linkedout.proto.models.AddressOuterClass
import org.springframework.core.convert.converter.Converter

class CreateReferenceDtoToProto : Converter<CreateReferenceDto, CreateReferenceDtoOuterClass.CreateReferenceDto.Builder> {
    override fun convert(source: CreateReferenceDto): CreateReferenceDtoOuterClass.CreateReferenceDto.Builder {
        return CreateReferenceDtoOuterClass.CreateReferenceDto.newBuilder()
            .setFirstName(source.firstName)
            .setLastName(source.lastName)
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.address.firstLine)
                    .setZipCode(source.address.zipCode)
                    .setCity(source.address.city)
            )
            .setPhone(source.phone)
            .setEmail(source.email)
    }
}
