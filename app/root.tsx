import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import atnd from "../node_modules/antd/dist/antd.compact.min.css"
import mainStyles from "./styles/main.css"

export const meta: MetaFunction = () => {
  return { title: "API Mocker" };
};

export const links = () => ([
    { rel: "stylesheet", href: atnd },
    { rel: "stylesheet", href: mainStyles }
])

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export const ErrorBoundary = ({ error }: any) => <div>{error.message}</div>
