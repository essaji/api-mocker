import {json, LoaderFunction} from "remix";
import {getApiMockByUrl} from "~/repository/repository.server";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
    const apiMock = await getApiMockByUrl(url.searchParams.get("endpoint") || "")
    return json(apiMock)
}