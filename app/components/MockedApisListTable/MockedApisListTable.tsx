import useMockedApisListTable from "~/components/MockedApisListTable/useMockedApisListTable";

const Editor = React.lazy(() => import("../Editor/Editor"));
import React, {Suspense} from "react";
import {Toaster} from "react-hot-toast";
import {Button, Modal, Table} from "antd";
import AddApiModal from "~/components/AddApiModal/AddApiModal";
import ModifyApiModal from "~/components/ModifyApiModal/ModifyApiModal";

export default function MockedApisListTable() {
  const {
    data,
    columns,
    onAddApiClick,
    isAddMockAPIVisible,
    onCloseAddApiModal,
    isModifyApiModalVisible,
    endpointToModify,
    onCloseModifyModal,
    isViewResponseVisible,
    onCloseViewResponseModal,
    currentResponseBody
  } = useMockedApisListTable()

  return (
    <div className="container">
      <div className="main__title">Mocked APIs List</div>
      <Table dataSource={data} columns={columns} pagination={false} rowKey="id"/>
      <Button type="primary" onClick={onAddApiClick} className="main__add-btn">Add Endpoint</Button>
      <AddApiModal visible={isAddMockAPIVisible} closeModal={onCloseAddApiModal} />
      {endpointToModify && <ModifyApiModal visible={isModifyApiModalVisible} endpoint={endpointToModify} closeModal={onCloseModifyModal}/>}
      <Modal title="Mocked API Response" visible={isViewResponseVisible}
             cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
             onCancel={onCloseViewResponseModal} onOk={onCloseViewResponseModal}>
        <Suspense fallback={<div>Loading...</div>} >
          <Editor content={currentResponseBody} />
        </Suspense>
      </Modal>
      <Toaster/>
    </div>
  )
    ;
}