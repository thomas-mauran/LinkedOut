import { EmployerEvaluationDto } from '@/models/dtos/employer/EmployerEvaluationDto';
import { Employer } from '@/models/entities/employer';
import { EmployerEvaluation } from '@/models/entities/employerEvaluation';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for employers.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployer: builder.query<Employer, string>({
      query: (id) => `employers/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Employer', id }],
    }),
    postEmployerEvaluation: builder.mutation<
      EmployerEvaluation,
      EmployerEvaluationDto
    >({
      query: (body) => ({
        url: `employers/${body.id}/evaluations/`,
        method: 'POST',
        body: body.evaluation,
      }),
      invalidatesTags: [{ type: 'Employer', id: 'LIST' }],
    }),
  }),
});

export const { useGetEmployerQuery, usePostEmployerEvaluationMutation } =
  extendedApiSlice;
