import { SurveyModel } from '@/domain/models/survey'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

// export type AddSurveyModel = {
//   question: string
//   answers: SurveyAnswerModel[]
//   date: Date
// }
export interface AddSurvey {
  add (account: AddSurveyModel): Promise<void>
}
