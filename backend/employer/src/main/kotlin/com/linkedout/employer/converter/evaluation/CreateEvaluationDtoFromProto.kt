package com.linkedout.employer.converter.evaluation

import com.linkedout.employer.dto.evaluation.CreateEvaluationDto
import com.linkedout.proto.dto.employer.CreateEmployerEvaluationDtoOuterClass
import org.springframework.core.convert.converter.Converter

class CreateEvaluationDtoFromProto : Converter<CreateEmployerEvaluationDtoOuterClass.CreateEmployerEvaluationDto, CreateEvaluationDto> {
    override fun convert(source: CreateEmployerEvaluationDtoOuterClass.CreateEmployerEvaluationDto): CreateEvaluationDto {
        return CreateEvaluationDto(
            source.score,
            source.comment
        )
    }
}
