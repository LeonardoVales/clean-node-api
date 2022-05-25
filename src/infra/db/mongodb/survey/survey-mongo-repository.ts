
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'bson'
import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const { insertedId: id } = await surveyCollection.insertOne(surveyData)
    const { _id, ...surveyWithoutId } = await surveyCollection.findOne({ _id: new ObjectId(id) })

    return MongoHelper.map(surveyWithoutId, _id)
  }
}
