import {useLoaderData, useSubmit} from "@remix-run/react";
import { Endpoint } from '~/models/Endpoint';
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {ColumnsType} from "antd/es/table";
import {Button, Popconfirm} from "antd";
import beautify from "json-beautify";
import {deleteApi, fetchApiDetail, fetchApiResponse} from "~/client";

export default function useMockedApisListTable () {
  const data = useLoaderData<Endpoint[]>()
  const submitter = useSubmit()
  const [isAddMockAPIVisible, setIsAddMockAPIVisible] = useState(false)
  const [isModifyApiModalVisible, setIsModifyApiModalVisible] = useState(false)
  const [isViewResponseVisible, setIsViewResponseVisible] = useState(false)
  const [currentResponseBody, setCurrentResponseBody] = useState<string>('[]')
  const [currentUrlToDelete, setCurrentUrlToDelete] = useState<string>("")

  const [endpointToModify, setEndpointToModify] = useState<Endpoint>()

  const onViewResponseClick = async (endpoint: Endpoint) => {
    try {
      const { data } = await fetchApiResponse(endpoint)
      setCurrentResponseBody(JSON.stringify(data))
      setIsViewResponseVisible(true)
    } catch(e: any) {
      toast.error(e.response.data)
    }
  }

  const onClickModify = async (endpoint: Endpoint) => {
    const { data } = await fetchApiDetail(endpoint.requestUrl)
    await setEndpointToModify(data)
    setIsModifyApiModalVisible(true)
  }

  const onDeleteConfirm = (endpoint: Endpoint) => {
    setCurrentUrlToDelete("")
    toast.promise(
      deleteApi(endpoint.requestUrl),
      {
        loading: "Loading...",
        success: () => {
          submitter({})
          return "Endpoint deleted successfully!"
        },
        error: "Something went wrong..."
      }
    )
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
          <Button onClick={() => onClickModify(endpoint)} style={{marginLeft: 12}}>Modify</Button>
          <Popconfirm title="Are you sure?" visible={currentUrlToDelete === endpoint.requestUrl} okText="Yes" cancelText="No"
                      onConfirm={() => onDeleteConfirm(endpoint)} onCancel={() => setCurrentUrlToDelete("")}>
            <Button onClick={() => setCurrentUrlToDelete(endpoint.requestUrl)}
                    style={{color: 'red', marginLeft: 12}}>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ]

  return {
    data,
    columns,
    onAddApiClick: () => setIsAddMockAPIVisible(true),
    isAddMockAPIVisible,
    onCloseAddApiModal: () => setIsAddMockAPIVisible(false),
    isModifyApiModalVisible,
    endpointToModify,
    onCloseModifyModal: () => {
      setIsModifyApiModalVisible(false)
      setEndpointToModify(undefined)
    },
    isViewResponseVisible,
    onCloseViewResponseModal: () => setIsViewResponseVisible(false),
    currentResponseBody: beautify(JSON.parse(currentResponseBody), null!!, 2, 60)
  }
}