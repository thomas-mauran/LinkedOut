package com.linkedout.profile.converter.evaluation

import com.linkedout.profile.model.Evaluation
import com.linkedout.proto.models.EmployeeEvaluationOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.ZoneOffset

class EvaluationToProto : Converter<Evaluation, EmployeeEvaluationOuterClass.EmployeeEvaluation.Builder> {
    override fun convert(source: Evaluation): EmployeeEvaluationOuterClass.EmployeeEvaluation.Builder {
        return EmployeeEvaluationOuterClass.EmployeeEvaluation.newBuilder()
            .setId(source.id.toString())
            .setEmployerId(source.employerId.toString())
            .setScore(source.score)
            .setComment(source.comment)
            .setCreatedAt(source.createdAt.toEpochSecond(ZoneOffset.UTC) * 1000)
    }
}
