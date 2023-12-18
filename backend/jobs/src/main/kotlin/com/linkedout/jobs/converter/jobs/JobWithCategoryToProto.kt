package com.linkedout.jobs.converter.jobs

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.proto.models.JobOuterClass
import org.springframework.core.convert.converter.Converter

class JobWithCategoryToProto : Converter<JobWithCategory, JobOuterClass.Job> {
    override fun convert(source: JobWithCategory): JobOuterClass.Job {
        return JobOuterClass.Job.newBuilder()
            .setId(source.id)
            .setTitle(source.title)
            .setCategory(source.category)
            .build()
    }
}
