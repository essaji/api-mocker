import {getEndpointByUrl} from "~/repository/repository.server";
import {ActionFunction, json, LoaderFunction} from "remix";


const resolveResponse: LoaderFunction = async ({request}) => {
    const url = new URL(request.url)
    const requestUrl = url.searchParams.get('endpoint') || ""
    const endpoint = await getEndpointByUrl(requestUrl)
    return json(endpoint.responseBody, { status: endpoint.responseCode })
}

export const loader: LoaderFunction = async (loader) => resolveResponse(loader)
export const action: ActionFunction = async (action) => resolveResponse(action)