package com.linkedout.profile.converter.profile

import com.linkedout.profile.dto.profile.SetProfileDto
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.dto.profile.SetProfileDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalDate

class SetProfileDtoFromProto : Converter<SetProfileDtoOuterClass.SetProfileDto, SetProfileDto> {
    override fun convert(source: SetProfileDtoOuterClass.SetProfileDto): SetProfileDto {
        return SetProfileDto(
            source.firstName,
            source.lastName,
            ProfileGender.fromProto(source.gender),
            LocalDate.ofEpochDay(source.birthday),
            source.nationality,
            source.addressFirstLine,
            source.addressZip,
            source.addressCity,
            source.phone,
            source.email,
            source.shortBio
        )
    }
}
