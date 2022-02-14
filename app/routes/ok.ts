import {LoaderFunction} from "remix";

export const loader: LoaderFunction = () => {
    return new Response("OK", { status: 200 })
}