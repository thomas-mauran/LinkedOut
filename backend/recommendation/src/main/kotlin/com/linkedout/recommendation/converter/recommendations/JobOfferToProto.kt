package com.linkedout.recommendation.converter.recommendations

import com.linkedout.proto.models.RecommendationOuterClass
import com.linkedout.recommendation.entity.JobOfferEntity
import org.springframework.core.convert.converter.Converter

class JobOfferToProto : Converter<JobOfferEntity, RecommendationOuterClass.Recommendation.Builder> {
    override fun convert(source: JobOfferEntity): RecommendationOuterClass.Recommendation.Builder {
        return RecommendationOuterClass.Recommendation.newBuilder()
            .setId(source.id.toString())
    }
}
