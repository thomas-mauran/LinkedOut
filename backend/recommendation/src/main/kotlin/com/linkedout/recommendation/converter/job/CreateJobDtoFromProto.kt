package com.linkedout.recommendation.converter.job

import com.linkedout.proto.dto.job.CreateJobDtoOuterClass
import org.springframework.core.convert.converter.Converter
import java.util.*
import com.linkedout.recommendation.dto.CreateJobDto
import com.linkedout.recommendation.entity.JobEntity

class CreateJobEntityFromProto : Converter<CreateJobDtoOuterClass.CreateJobDto, JobEntity> {
    override fun convert(source: CreateJobDtoOuterClass.CreateJobDto): JobEntity {
        return com.linkedout.recommendation.entity.JobEntity(
            UUID.fromString(source.id),
            source.title,
            source.category
        )
    }
}
