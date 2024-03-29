import {
  SaveSurveyResultRepository,
  LoadSurveyResultRepository
} from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { mockeSaveSurveyResultRepositoryStub, mockLoadSurveyResultRepository } from '@/data/test'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockeSaveSurveyResultRepositoryStub()
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  )

  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  it('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId)
  })

  it('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultParams())

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
