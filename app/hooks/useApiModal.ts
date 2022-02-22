import {ChangeEvent, useState} from "react";
import beautify from "json-beautify";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import toast from "react-hot-toast";
import {saveApi, updateApi} from "~/client";
import {useSubmit} from "@remix-run/react";
import {Endpoint} from "~/models/Endpoint";

const listOfMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]

export function useApiModal({ closeModal, initialFormFields }: UseApiModalProps) {
  const submitter = useSubmit()

  const sampleObject = initialFormFields ? JSON.parse(initialFormFields?.responseBody) : [{id: "123", name: "EESA", DOB: new Date()}]
  const [formInputFields, setFormInputFields] = useState<Endpoint>({
    method: initialFormFields?.method || listOfMethods[0],
    requestUrl: initialFormFields?.requestUrl || "mocked/api/url/here",
    responseCode: initialFormFields?.responseCode || 200,
    responseBody: beautify(sampleObject, null!!, 2, 60),
    throwError: initialFormFields?.throwError || false
  })

  const onMethodInputChange = (method: string) => setFormInputFields(fields => ({...fields, method}))
  const onRequestUrlInputChange = (e: ChangeEvent<HTMLInputElement>) => setFormInputFields(fields => ({...fields, requestUrl: e.target.value}))
  const onRequestCodeInputChange = (e: ChangeEvent<HTMLInputElement>) => setFormInputFields(fields => ({...fields, responseCode: Number(e.target.value)}))
  const onThrowErrorFieldChange = (e: CheckboxChangeEvent) => setFormInputFields(fields => ({ ...fields, throwError: e.target.checked }))
  const onRequestBodyInputChange = (str: string) => setFormInputFields(fields => ({...fields, responseBody: str}))

  const onAddApi = () => toast.promise(
    saveApi(formInputFields),
    {
      loading: "Adding API...",
      error: e => {
        return `Error: ${e.response.data.message}`
      },
      success: () => {
        submitter({})
        closeModal()
        return "API Added Successfully!"
      }
    }
  )

  const onModifyApi = (requestUrl: string) => toast.promise(
    updateApi(formInputFields, requestUrl),
    {
      loading: "Adding API...",
      error: e => {
        return `Error: ${e.response.data.message}`
      },
      success: () => {
        submitter({})
        closeModal()
        return "API Updated Successfully!"
      }
    }
  )

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const isValidFormInputs = formInputFields?.method && formInputFields.requestUrl && formInputFields.responseCode && isJsonString(formInputFields.responseBody as string)

  return {
    onMethodInputChange,
    onRequestUrlInputChange,
    onRequestCodeInputChange,
    onThrowErrorFieldChange,
    onRequestBodyInputChange,
    listOfMethods,
    formInputFields,
    onAddApi,
    onModifyApi,
    isValidFormInputs
  }
}

interface UseApiModalProps {
  closeModal: () => void
  initialFormFields?: Endpoint
}
