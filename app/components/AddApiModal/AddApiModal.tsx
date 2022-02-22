const Editor = React.lazy(() => import("../Editor/Editor"));
import {Button, Form, Input, Modal, Select, Checkbox} from "antd";
import React, {Suspense} from "react";
import {useApiModal} from "~/hooks/useApiModal";


export default function AddApiModal(props: AddApiModalProps) {
  const {visible, closeModal} = props

  const {
    onMethodInputChange,
    onRequestUrlInputChange,
    onRequestCodeInputChange,
    onThrowErrorFieldChange,
    onRequestBodyInputChange,
    formInputFields,
    listOfMethods,
    onAddApi,
    isValidFormInputs
  } = useApiModal({ closeModal })

 return (
    <Modal title="Add Mock API" visible={visible} okButtonProps={{style: {display: 'none'}}}
           cancelButtonProps={{style: {display: 'none'}}} onCancel={() => closeModal()}>
      <Form>
        <Form.Item label="Request Method" name="method" initialValue={formInputFields.method}>
          <Select
            onChange={onMethodInputChange} style={{width: 100}}>
            {listOfMethods.map(method => <Select.Option key={method}
                                                        value={method}>{method}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Request Url" name="requestUrl" initialValue={formInputFields.requestUrl}>
          <Input onChange={onRequestUrlInputChange}/>
        </Form.Item>
        <Form.Item label="Response Code" name="responseCode" initialValue={formInputFields.responseCode}>
          <Input type="number" onChange={onRequestCodeInputChange}/>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={onThrowErrorFieldChange} checked={formInputFields.throwError!!}>Throw Error</Checkbox>
        </Form.Item>
        <Form.Item label="Response Body" name="responseBody">
          <Suspense fallback={<div>Loading...</div>}>
            <Editor content={formInputFields.responseBody as string} onChange={onRequestBodyInputChange}/>
          </Suspense>
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={!isValidFormInputs} onClick={onAddApi}>Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

interface AddApiModalProps {
  visible: boolean
  closeModal: (shouldRefetch?: boolean) => void
}