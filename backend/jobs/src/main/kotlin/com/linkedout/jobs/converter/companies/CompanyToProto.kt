package com.linkedout.jobs.converter.companies

import com.linkedout.jobs.model.Company
import com.linkedout.proto.models.CompanyOuterClass
import org.springframework.core.convert.converter.Converter

class CompanyToProto : Converter<Company, CompanyOuterClass.Company> {
    override fun convert(source: Company): CompanyOuterClass.Company {
        return CompanyOuterClass.Company.newBuilder()
            .setId(source.id.toString())
            .setName(source.name)
            .build()
    }
}
