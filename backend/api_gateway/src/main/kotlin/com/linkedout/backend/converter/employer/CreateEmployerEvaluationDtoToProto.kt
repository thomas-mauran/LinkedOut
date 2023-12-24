package com.linkedout.backend.converter.employer

import com.linkedout.backend.dto.employer.CreateEmployerEvaluationDto
import com.linkedout.proto.dto.employer.CreateEmployerEvaluationDtoOuterClass
import org.springframework.core.convert.converter.Converter

class CreateEmployerEvaluationDtoToProto : Converter<CreateEmployerEvaluationDto, CreateEmployerEvaluationDtoOuterClass.CreateEmployerEvaluationDto.Builder> {
    override fun convert(source: CreateEmployerEvaluationDto): CreateEmployerEvaluationDtoOuterClass.CreateEmployerEvaluationDto.Builder {
        return CreateEmployerEvaluationDtoOuterClass.CreateEmployerEvaluationDto.newBuilder()
            .setScore(source.score)
            .setComment(source.review)
    }
}
