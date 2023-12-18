package com.linkedout.profile.converter.profile

import com.linkedout.profile.dto.profile.UpdateProfileDto
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.dto.profile.UpdateProfileDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate

class UpdateProfileDtoFromProto : Converter<UpdateProfileDtoOuterClass.UpdateProfileDto, UpdateProfileDto> {
    override fun convert(source: UpdateProfileDtoOuterClass.UpdateProfileDto): UpdateProfileDto {
        return UpdateProfileDto(
            if (source.hasFirstName()) source.firstName else null,
            if (source.hasLastName()) source.lastName else null,
            if (source.hasGender()) ProfileGender.fromProto(source.gender) else null,
            if (source.hasBirthday()) LocalDate.ofEpochDay(source.birthday) else null,
            if (source.hasNationality()) source.nationality else null,
            if (source.hasAddressFirstLine()) source.addressFirstLine else null,
            if (source.hasAddressZip()) source.addressZip else null,
            if (source.hasAddressCity()) source.addressCity else null,
            if (source.hasPhone()) source.phone else null,
            if (source.hasEmail()) source.email else null,
            if (source.hasShortBio()) source.shortBio else null
        )
    }
}
