package com.linkedout.profile.converter.profile

import com.linkedout.profile.model.Profile
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ProfileOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalTime
import java.time.ZoneOffset

class ProfileToProto : Converter<Profile, ProfileOuterClass.Profile> {
    override fun convert(source: Profile): ProfileOuterClass.Profile {
        return ProfileOuterClass.Profile.newBuilder()
            .setId(source.id.toString())
            .setFirstName(source.firstName)
            .setLastName(source.lastName)
            .setGender(ProfileGender.toProto(source.gender))
            .setBirthday(source.birthday.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
            .setNationality(source.nationality)
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.addressFirstLine)
                    .setZipCode(source.addressZip)
                    .setCity(source.addressCity)
            )
            .setPhone(source.phone)
            .setEmail(source.email)
            .setShortBio(source.shortBio)
            .setDeletionRequested(source.deletionRequested)
            .build()
    }
}
