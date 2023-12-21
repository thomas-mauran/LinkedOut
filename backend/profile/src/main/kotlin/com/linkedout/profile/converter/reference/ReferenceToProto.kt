package com.linkedout.profile.converter.reference

import com.linkedout.profile.model.Reference
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ReferenceOuterClass
import org.springframework.core.convert.converter.Converter

class ReferenceToProto : Converter<Reference, ReferenceOuterClass.Reference> {
    override fun convert(source: Reference): ReferenceOuterClass.Reference {
        return ReferenceOuterClass.Reference.newBuilder()
            .setId(source.id.toString())
            .setFirstName(source.firstName)
            .setLastName(source.lastName)
            .setAddress(
                AddressOuterClass.Address.newBuilder()
                    .setFirstLine(source.addressFirstLine)
                    .setZipCode(source.addressZip)
                    .setCity(source.addressCity)
            )
            .setPhone(source.phone)
            .setEmail(source.email)
            .setCompanyId(source.companyId.toString())
            .build()
    }
}
