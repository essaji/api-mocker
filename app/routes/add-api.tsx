import {ActionFunction, json} from "remix";
import {modifyApiByUrl, saveEndpoint} from "~/repository/repository.server";
import { Endpoint } from '~/models/Endpoint';


const getEndpointResource = async (request: Request): Promise<Endpoint> => {
    const response: Endpoint = await request.json()
    return new Endpoint(
      response.method,
      response.requestUrl,
      response.responseCode,
      JSON.stringify(JSON.parse(response.responseBody)),
      response.throwError
    )
}

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST":
            try {
                await saveEndpoint(await getEndpointResource(request))
            }
            catch(e) {
                return json({ message: e.message }, { status: 400, statusText: e.messgae })
            }
            break;
        case "PUT":
            const endpoint = await getEndpointResource(request)
            try {
                const url = new URL(request.url)
                const requestUrl = url.searchParams.get('endpoint') || ""
                await modifyApiByUrl(requestUrl, endpoint)
            }
            catch(e) {
                return json({ message: e.message }, { status: 400, statusText: e.messgae })
            }
    }

    return new Response("Saved", { status: 200 })
}

