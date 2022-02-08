import {ActionFunction} from "remix";
import {removeApiByUrl} from "~/repository/repository.server";

export const action:ActionFunction = async ({ request }) => {
    const url = new URL(request.url)
    const requestUrl = url.searchParams.get('endpoint') || ""
    try {
        await removeApiByUrl(requestUrl)
    } catch (e) {
        console.log(e)
        throw Error("Something went wrong while removing API")
    }

    return new Response("Deleted", { status: 200 })
}