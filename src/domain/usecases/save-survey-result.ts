import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

// export type AddSurveyModel = {
//   question: string
//   answers: SurveyAnswerModel[]
//   date: Date
// }
export interface SaveSurveyResult {
  save (account: SaveSurveyResultModel): Promise<SurveyResultModel>
}
