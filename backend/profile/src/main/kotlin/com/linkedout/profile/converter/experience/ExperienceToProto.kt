package com.linkedout.profile.converter.experience

import com.linkedout.profile.model.Experience
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ExperienceOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalTime
import java.time.ZoneOffset

class ExperienceToProto : Converter<Experience, ExperienceOuterClass.Experience.Builder> {
    override fun convert(source: Experience): ExperienceOuterClass.Experience.Builder {
        return ExperienceOuterClass.Experience.newBuilder()
            .setId(source.id.toString())
            .setStartDate(source.startDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
            .setEndDate(source.endDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.companyAddressFirstLine)
                    .setZipCode(source.companyAddressZip)
                    .setCity(source.companyAddressCity)
            )
            .setCompanyId(source.companyId.toString())
            .setJobId(source.jobId.toString())
    }
}
