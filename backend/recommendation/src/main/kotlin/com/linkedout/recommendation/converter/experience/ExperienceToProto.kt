package com.linkedout.recommendation.converter.experience

import com.linkedout.proto.models.ExperienceOuterClass
import com.linkedout.recommendation.entity.ExperienceEntity
import org.springframework.core.convert.converter.Converter

class ExperienceToProto : Converter<ExperienceEntity, ExperienceOuterClass.Experience.Builder> {
    override fun convert(source: ExperienceEntity): ExperienceOuterClass.Experience.Builder {
        return ExperienceOuterClass.Experience.newBuilder()
            .setId(source.id.toString())
    }
}
