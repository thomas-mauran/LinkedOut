package com.linkedout.recommendation.converter.job

import com.linkedout.proto.models.JobOuterClass
import com.linkedout.recommendation.entity.JobEntity
import org.springframework.core.convert.converter.Converter

class JobToProto : Converter<JobEntity, JobOuterClass.Job.Builder> {
    override fun convert(source: JobEntity): JobOuterClass.Job.Builder {
        return JobOuterClass.Job.newBuilder()
            .setId(source.id.toString())
            .setTitle(source.title)
            .setCategory(source.category.title)
    }
}
