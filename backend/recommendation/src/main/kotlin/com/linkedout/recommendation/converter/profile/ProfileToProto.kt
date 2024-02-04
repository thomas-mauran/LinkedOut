package com.linkedout.recommendation.converter.profile

import com.linkedout.proto.models.ProfileOuterClass
import com.linkedout.recommendation.entity.ProfileEntity
import org.springframework.core.convert.converter.Converter

class ProfileToProto : Converter<ProfileEntity, ProfileOuterClass.Profile.Builder> {
    override fun convert(source: ProfileEntity): ProfileOuterClass.Profile.Builder {
        return ProfileOuterClass.Profile.newBuilder()
            .setId(source.id.toString())
    }
}
