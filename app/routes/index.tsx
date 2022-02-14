import axios from "axios";

const Editor = React.lazy(() => import("../components/Editor/Editor"));
import {useLoaderData, useSubmit} from "@remix-run/react";
import {getEndpoints} from "~/repository/repository.server";
import Endpoint from "~/models/endpoint";
import {Button, Table, Modal} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {useState, Suspense} from "react";
import AddAPIModal from "~/components/AddAPIModal/AddAPIModal";
import beautify from "json-beautify"
import {toast, Toaster} from 'react-hot-toast';

export function loader() {
    return getEndpoints()
}

export default function Index() {
    const data = useLoaderData<Endpoint[]>()
    const submitter = useSubmit()
    const [isAddMockAPIVisible, setIsAddMockAPIVisible] = useState(false)
    const [isViewResponseVisible, setIsViewResponseVisible] = useState(false)
    const [currentResponseBody, setCurrentResponseBody] = useState<string>('[]')

    const onViewResponseClick = async (endpoint: Endpoint) => {
        const data = await (await fetch(`/api-mocker?endpoint=${endpoint.requestUrl}`, {
            method: endpoint.method
        })).json()
        setCurrentResponseBody(data)
        setIsViewResponseVisible(true)
    }

    const refetchData = () => {
        submitter({ method: "get" })
    }
    const columns: ColumnsType<Endpoint> = [
        {title: "Request Method", key: "method", dataIndex: "method"},
        {title: "Request Url", key: "requestUrl", dataIndex: "requestUrl"},
        {title: "ResponseCode", key: "responseCode", dataIndex: "responseCode"},
        {
            title: "Actions",
            key: "actions",
            dataIndex: "",
            render: (endpoint: Endpoint) => (
                <>
                    <Button onClick={() => onViewResponseClick(endpoint)}>Hit Endpoint</Button>
                    <Button onClick={async () => {
                        toast.promise(
                            axios.delete("/remove-api", { params: { endpoint: endpoint.requestUrl }}),
                            {
                                loading: "Loading...",
                                success: () => {
                                    refetchData()
                                    return "Endpoint deleted successfully!"
                                },
                                error: "Something went wrong..."
                            }
                        )
                    }} style={{ color: 'red', marginLeft: 12 }}>Delete</Button>
                </>
            )
        }
    ]

    return (
        <div className="container">
            <div className="main__title">Mocked APIs List</div>
            <Table dataSource={data} columns={columns} pagination={false}/>
            <Button type="primary" onClick={() => setIsAddMockAPIVisible(true)} className="main__add-btn">Add
                Endpoint</Button>

            <AddAPIModal visible={isAddMockAPIVisible} closeModal={shouldRefetchData => {
                setIsAddMockAPIVisible(false)
                if (shouldRefetchData) refetchData()
            }}
            />
            <Modal title="Mocked API Response" visible={isViewResponseVisible}
                   cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
                   onCancel={() => setIsViewResponseVisible(false)} onOk={() => setIsViewResponseVisible(false)}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Editor content={beautify(JSON.parse(currentResponseBody), null!!, 2, 60)}/>
                </Suspense>
            </Modal>
            <Toaster />
        </div>
    )
        ;
}
