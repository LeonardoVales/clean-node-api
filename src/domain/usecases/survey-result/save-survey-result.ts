import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

// export type AddSurveyModel = {
//   question: string
//   answers: SurveyAnswerModel[]
//   date: Date
// }
export interface SaveSurveyResult {
  save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
