import { db } from './db.server'
import Endpoint from "~/models/endpoint";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

export async function getEndpoints(): Promise<Endpoint[]> {
    return await db.endpoints.findMany() as unknown as Endpoint[]
}

export async function saveEndpoint(document: Endpoint) {
    try {
        await db.endpoints.create({ data: document })
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
    const endpoint = await db.endpoints.findFirst({ where: { requestUrl } })
    if (!endpoint) throw Error("request url not found")
    return endpoint
}

export async function removeApiByUrl(requestUrl: string) {
    await db.endpoints.delete({ where: { requestUrl } })
}

export async function modifyApiByUrl(requestUrl: string, data: Endpoint) {
    await db.endpoints.update({ where: { requestUrl }, data })
}

export async function getApiMockByUrl(requestUrl: string): Promise<Endpoint> {
    return await db.endpoints.findFirst({ where: { requestUrl } }) as unknown as Endpoint
}