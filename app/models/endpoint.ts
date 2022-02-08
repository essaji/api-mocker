import {ObjectId} from 'mongodb'

export default class Endpoint {
    constructor(public method: string, public requestUrl: string, public responseCode: number, public responseBody: string, public id?: ObjectId) {
    }
}