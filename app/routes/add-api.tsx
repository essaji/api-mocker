import {ActionFunction, json} from "remix";
import {saveEndpoint} from "~/repository/repository.server";
import Endpoint from "~/models/endpoint";

export const action: ActionFunction = async ({ request }) => {
    const apiResource = await request.json() as Endpoint
    const endpoint = new Endpoint(
        apiResource.method,
        apiResource.requestUrl,
        apiResource.responseCode,
        JSON.stringify(JSON.parse(apiResource.responseBody))
    )

    try {
        await saveEndpoint(endpoint)
    }
    catch(e) {
        return json({ message: e.message }, { status: 400, statusText: e.messgae })
    }
    return new Response("Saved", { status: 200 })
}

