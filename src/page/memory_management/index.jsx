import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../ultils/upload";

function MemoryManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formVar] = useForm();

  async function fetchMemory() {
    const response = await axios.get(
      "https://663244adc51e14d69563e7fc.mockapi.io/Memory"
    );
    setDataSource(response.data);
  }
  useEffect(() => {
    fetchMemory();
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  const handleOK = () => {
    formVar.submit();
  };

  async function handleSubmit(values) {
    values.time = new Date();
    const url = await uploadFile(values.picture.file.originFileObj);
    values.picture = url;
    console.log(url);
    const response = await axios.post(
      "https://663244adc51e14d69563e7fc.mockapi.io/Memory",
      values
    );
    setDataSource([...dataSource, values]);
    formVar.resetFields();
    handleHideModal();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Categroy",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (picture) => <Image src={picture} width={200}></Image>,
    },
    {
      title: "Add Date",
      dataIndex: "time",
      key: "time",
      render: (values) =>
        values ? formatDistanceToNow(new Date(values)) : null,
    },
  ];
  //=================================================
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  //=================================================
  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add your memory
      </Button>
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        title="Basic Modal"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOK}
      >
        <Form form={formVar} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item
            label="Memory's Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please enter Memory's Name!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Memory's Category"
            name={"category"}
            rules={[
              {
                required: true,
                message: "Please enter Memory's Category!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="Memory's Picture" name={"picture"}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default MemoryManagement;
