import { db } from './db.server'
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import { Endpoint } from '~/models/Endpoint';

export async function getEndpoints(): Promise<Endpoint[]> {
    return await db.endpoint.findMany() as unknown as Endpoint[]
}

export async function saveEndpoint(document: Endpoint) {
    try {
        await db.endpoint.create({ data: document })
    }
    catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                throw Error("requestUrl must be unique")
            }
        }
        console.log(e);
        throw Error("Something went wrong while saving object")
    }
}

export async function getEndpointByUrl(requestUrl: string): Promise<Endpoint> {
    const endpoint = await db.endpoint.findFirst({ where: { requestUrl } })
    if (!endpoint) throw Error("request url not found")
    return endpoint as Endpoint
}

export async function removeApiByUrl(requestUrl: string) {
    await db.endpoint.delete({ where: { requestUrl } })
}

export async function modifyApiByUrl(requestUrl: string, data: Endpoint) {
    await db.endpoint.update({ where: { requestUrl }, data })
}

export async function getApiMockByUrl(requestUrl: string): Promise<Endpoint> {
    return await db.endpoint.findFirst({ where: { requestUrl } }) as Endpoint
}