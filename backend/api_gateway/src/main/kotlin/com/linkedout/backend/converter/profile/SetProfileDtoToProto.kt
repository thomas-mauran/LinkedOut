package com.linkedout.backend.converter.profile

import com.linkedout.backend.dto.profile.SetProfileDto
import com.linkedout.proto.dto.profile.SetProfileDtoOuterClass
import org.springframework.core.convert.converter.Converter

class SetProfileDtoToProto : Converter<SetProfileDto, SetProfileDtoOuterClass.SetProfileDto> {
    override fun convert(source: SetProfileDto): SetProfileDtoOuterClass.SetProfileDto {
        return SetProfileDtoOuterClass.SetProfileDto.newBuilder()
            .setFirstName(source.firstName)
            .setLastName(source.lastName)
            .setGenderValue(source.gender)
            .setBirthday(source.birthday.toEpochDay())
            .setNationality(source.nationality)
            .setAddressFirstLine(source.address.firstLine)
            .setAddressZip(source.address.zipCode)
            .setAddressCity(source.address.city)
            .setPhone(source.phone)
            .setEmail(source.email)
            .setShortBio(source.shortBiography)
            .build()
    }
}
