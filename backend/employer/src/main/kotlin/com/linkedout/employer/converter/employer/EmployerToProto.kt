package com.linkedout.employer.converter.employer

import com.linkedout.employer.model.Employer
import com.linkedout.proto.models.EmployerOuterClass
import org.springframework.core.convert.converter.Converter

class EmployerToProto : Converter<Employer, EmployerOuterClass.Employer.Builder> {
    override fun convert(source: Employer): EmployerOuterClass.Employer.Builder {
        return EmployerOuterClass.Employer.newBuilder()
            .setId(source.id.toString())
            .setFirstName(source.firstName)
            .setLastName(source.lastName)
            .setPicture(source.picture)
            .setPhone(source.phone)
    }
}
