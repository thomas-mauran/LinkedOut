package com.linkedout.backend.converter.profile

import com.linkedout.backend.dto.profile.UpdateProfileDto
import com.linkedout.proto.dto.profile.UpdateProfileDtoOuterClass
import org.springframework.core.convert.converter.Converter

class UpdateProfileDtoToProto : Converter<UpdateProfileDto, UpdateProfileDtoOuterClass.UpdateProfileDto.Builder> {
    override fun convert(source: UpdateProfileDto): UpdateProfileDtoOuterClass.UpdateProfileDto.Builder {
        val targetBuilder = UpdateProfileDtoOuterClass.UpdateProfileDto.newBuilder()
        if (source.firstName != null) targetBuilder.setFirstName(source.firstName)
        if (source.lastName != null) targetBuilder.setLastName(source.lastName)
        if (source.gender != null) targetBuilder.setGenderValue(source.gender)
        if (source.birthday != null) targetBuilder.setBirthday(source.birthday.toEpochDay())
        if (source.nationality != null) targetBuilder.setNationality(source.nationality)
        if (source.phone != null) targetBuilder.setPhone(source.phone)
        if (source.email != null) targetBuilder.setEmail(source.email)
        if (source.shortBiography != null) targetBuilder.setShortBio(source.shortBiography)

        if (source.address != null) {
            targetBuilder.setAddressFirstLine(source.address.firstLine)
            targetBuilder.setAddressZip(source.address.zipCode)
            targetBuilder.setAddressCity(source.address.city)
        }

        return targetBuilder
    }
}
