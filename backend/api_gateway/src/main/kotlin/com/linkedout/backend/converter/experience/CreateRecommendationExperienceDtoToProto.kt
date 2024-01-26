package com.linkedout.backend.converter.experience

import com.linkedout.backend.dto.experience.CreateExperienceDto
import com.linkedout.backend.dto.experience.CreateRecommendationExperienceDto
import com.linkedout.proto.dto.experience.CreateExperienceDtoOuterClass
import com.linkedout.proto.dto.experience.CreateRecommendationExperienceDtoOuterClass
import com.linkedout.proto.models.AddressOuterClass
import org.springframework.core.convert.converter.Converter

class CreateRecommendationExperienceDtoToProto : Converter<CreateRecommendationExperienceDto, CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.Builder> {
    override fun convert(source: CreateRecommendationExperienceDto): CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.Builder {
        return CreateRecommendationExperienceDtoOuterClass.CreateRecommendationExperienceDto.newBuilder()
            .setId(source.id.toString())
            .setProfileId(source.profileId.toString())
            .setJobId(source.profileId.toString())
            .setJobTitle(source.jobTitle)
            .setJobCategory(source.jobCategory.toString())
    }
}
