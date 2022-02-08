const Editor = React.lazy(() => import("../Editor/Editor"));
import {Button, Form, Input, Modal, Select} from "antd";
import React, {useState, Suspense} from "react";
import beautify from "json-beautify"

const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export default function AddAPIModal(props: AddEndpointModalProps) {
    const {visible, closeModal} = props
    const listOfMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    const sampleObject = [{id: "123", name: "EESA", DOB: new Date()}]

    const [formFields, setFormFields] = useState({
        method: listOfMethods[0],
        requestUrl: "mocked/api/url/here",
        responseCode: 200,
        responseBody: beautify(sampleObject, null!!, 2, 60)
    })

    const isSaveBtnDisabled = !(formFields.method && formFields.requestUrl && formFields.responseCode && isJsonString(formFields.responseBody))
    return (
        <Modal title="Add Mock API" visible={visible} okButtonProps={{style: {display: 'none'}}}
               cancelButtonProps={{style: {display: 'none'}}} onCancel={closeModal}>
            <Form>
                <Form.Item label="Request Method" name="method" initialValue={formFields.method}>
                    <Select
                        onChange={method => setFormFields(fields => ({...fields, method}))} style={{width: 100}}>
                        {listOfMethods.map(method => <Select.Option key={method}
                                                                    value={method}>{method}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Request Url" name="requestUrl" initialValue={formFields.requestUrl}>
                    <Input onChange={e => setFormFields(fields => ({...fields, requestUrl: e.target.value}))}/>
                </Form.Item>
                <Form.Item label="Response Code" name="responseCode" initialValue={formFields.responseCode}>
                    <Input type="number" onChange={e => setFormFields(fields => ({
                        ...fields,
                        responseCode: Number(e.target.value)
                    }))}/>
                </Form.Item>
                <Form.Item label="Response Body" name="responseBody">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Editor content={formFields.responseBody}
                                onChange={(str: string) => setFormFields(fields => ({...fields, responseBody: str}))}
                        />
                    </Suspense>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" disabled={isSaveBtnDisabled} onClick={async () => {
                        await fetch("/add-api", {
                            method: "post",
                            body: JSON.stringify(formFields),
                            headers: {'Content-Type': 'application/json'}
                        })
                        closeModal()
                        location.reload()
                    }}>Save</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

interface AddEndpointModalProps {
    visible: boolean
    closeModal: () => void
}