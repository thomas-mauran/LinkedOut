package com.linkedout.profile.utils

import com.linkedout.proto.models.ProfileOuterClass.Profile

enum class ProfileGender(val value: Int) {
    Unknown(0),
    Male(1),
    Female(2),
    Unspecified(9);

    companion object {

        fun fromProto(value: Profile.Gender): ProfileGender {
            return when (value) {
                Profile.Gender.Unknown -> Unknown
                Profile.Gender.Male -> Male
                Profile.Gender.Female -> Female
                Profile.Gender.Unspecified -> Unspecified
                Profile.Gender.UNRECOGNIZED -> throw Exception("Invalid profile gender")
            }
        }

        fun toProto(value: ProfileGender): Profile.Gender {
            return when (value) {
                Unknown -> Profile.Gender.Unknown
                Male -> Profile.Gender.Male
                Female -> Profile.Gender.Female
                Unspecified -> Profile.Gender.Unspecified
            }
        }
    }
}
