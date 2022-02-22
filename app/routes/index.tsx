import React from "react";
import {getEndpoints} from "~/repository/repository.server";
import MockedApisListTable from "~/components/MockedApisListTable/MockedApisListTable";

export function loader() {
    return getEndpoints()
}

export default function Index() {
  return <MockedApisListTable />
}
