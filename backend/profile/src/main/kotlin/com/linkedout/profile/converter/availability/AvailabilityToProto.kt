package com.linkedout.profile.converter.availability

import com.linkedout.profile.model.Availability
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.AvailabilityOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.LocalTime
import java.time.ZoneOffset

class AvailabilityToProto : Converter<Availability, AvailabilityOuterClass.Availability> {
    override fun convert(source: Availability): AvailabilityOuterClass.Availability {
        return AvailabilityOuterClass.Availability.newBuilder()
            .setId(source.id.toString())
            .setStartDate(source.startDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
            .setEndDate(source.endDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.addressFirstLine)
                    .setZipCode(source.addressZip)
                    .setCity(source.addressCity)
            )
            .setRange(source.range)
            .setJobCategoryId(source.jobCategoryId.toString())
            .build()
    }
}
