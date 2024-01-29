package com.linkedout.recommendation.converter.experience

import com.linkedout.proto.dto.experience.CreateRecommendationExperienceDtoOuterClass
import com.linkedout.proto.models.ExperienceOuterClass
import com.linkedout.recommendation.dto.CreateEntityDto
import com.linkedout.recommendation.entity.ExperienceEntity
import org.springframework.core.convert.converter.Converter

class ExperienceToProto : Converter<ExperienceEntity, CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.Builder> {
    override fun convert(source: ExperienceEntity): CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.Builder {
        return CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.newBuilder()
            .setId(source.id.toString())
    }
}
