package com.linkedout.jobs.converter.jobCategories

import com.linkedout.jobs.model.JobCategory
import com.linkedout.proto.models.JobCategoryOuterClass
import org.springframework.core.convert.converter.Converter

class JobCategoryToProto : Converter<JobCategory, JobCategoryOuterClass.JobCategory.Builder> {
    override fun convert(source: JobCategory): JobCategoryOuterClass.JobCategory.Builder {
        return JobCategoryOuterClass.JobCategory.newBuilder()
            .setId(source.id.toString())
            .setCategory(source.title)
    }
}
