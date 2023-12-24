package com.linkedout.employer.converter.evaluation

import com.linkedout.employer.model.Evaluation
import com.linkedout.proto.models.EmployerEvaluationOuterClass
import org.springframework.core.convert.converter.Converter

class EvaluationToProto : Converter<Evaluation, EmployerEvaluationOuterClass.EmployerEvaluation.Builder> {
    override fun convert(source: Evaluation): EmployerEvaluationOuterClass.EmployerEvaluation.Builder {
        return EmployerEvaluationOuterClass.EmployerEvaluation.newBuilder()
            .setId(source.id.toString())
            .setScore(source.score)
            .setComment(source.comment)
    }
}
