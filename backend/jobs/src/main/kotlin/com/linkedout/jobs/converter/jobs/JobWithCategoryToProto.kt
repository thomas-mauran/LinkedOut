package com.linkedout.jobs.converter.jobs

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.proto.models.JobOuterClass
import org.springframework.core.convert.converter.Converter

class JobWithCategoryToProto : Converter<JobWithCategory, JobOuterClass.Job.Builder> {
    override fun convert(source: JobWithCategory): JobOuterClass.Job.Builder {
        return JobOuterClass.Job.newBuilder()
            .setId(source.id)
            .setTitle(source.title)
            .setCategory(source.category)
    }
}
