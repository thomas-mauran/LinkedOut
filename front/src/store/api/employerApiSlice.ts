import { CreateEmployerEvaluationDto } from '@/models/dtos/employer/createEmployerEvaluationDto';
import { CreateEmployerMessageDto } from '@/models/dtos/employer/createEmployerMessageDto';
import { Employer } from '@/models/entities/employer';
import { EmployerEvaluation } from '@/models/entities/employerEvaluation';
import { Message } from '@/models/entities/message';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for employers.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployer: builder.query<Employer, string>({
      query: (id) => `employers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Employer', id }],
    }),
    postEmployerEvaluation: builder.mutation<
      EmployerEvaluation,
      CreateEmployerEvaluationDto
    >({
      query: (body) => ({
        url: `employers/${body.id}/evaluations`,
        method: 'POST',
        body: body.evaluation,
      }),
      invalidatesTags: [{ type: 'Employer', id: 'LIST' }],
    }),
    postEmployerMessage: builder.mutation<Message, CreateEmployerMessageDto>({
      query: (body) => ({
        url: `employers/${body.employerId}/messaging`,
        method: 'POST',
        body: { content: body.content },
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetEmployerQuery,
  usePostEmployerEvaluationMutation,
  usePostEmployerMessageMutation,
} = extendedApiSlice;
