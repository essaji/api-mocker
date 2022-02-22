import {LoaderFunction} from "remix";
import {getEndpointByUrl} from "~/repository/repository.server";

export const loader: LoaderFunction = async ({request}) => {
    const ROUTE_URI = '/api-mocker/'
    const url = new URL(request.url)

    const requestUrl = url.pathname.slice(ROUTE_URI.length, url.pathname.length)
    const endpoint = await getEndpointByUrl(requestUrl)

    if (endpoint.throwError) {
        throw new Error("Mocked error thrown")
    }
    return new Response(endpoint.responseBody, {
        status: endpoint.responseCode,
        headers: {"Content-Type": "application/json; charset=utf-8"}
    })
}