import {ActionFunction} from "remix";
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

    await saveEndpoint(endpoint)
    return new Response("Saved", { status: 200 })
}

