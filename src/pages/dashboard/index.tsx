import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";
import { Movie } from "../../models/movie";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import { useForm } from "antd/es/form/Form";
import { UploadFile, RcFile } from "antd/es/upload/interface";
import { uploadFile } from "../../utils/upload"; // Import function

function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = useForm();

  const fetchMovie = async () => {
    try {
      const res = await api.get("vlxx");
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as RcFile;
        values.avatar = await uploadFile(file); // Use Firebase Storage upload function
      }

      if (isEditing && values?.id) {
        await api.put(`vlxx/${values.id}`, values);
        toast.success("Movie updated successfully");
      } else {
        await api.post("vlxx", values);
        toast.success("Movie added successfully");
      }

      form.resetFields();
      setIsOpen(false);
      setFileList([]);
      fetchMovie();
      setIsEditing(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`vlxx/${id}`);
      toast.success("Movie deleted successfully");
      fetchMovie();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày thêm phim",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (category: boolean) => (category ? "Học sinh" : "Người lớn"),
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img src={avatar} alt="profile" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Link Phim",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Xem Phim
        </a>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (id: string, record: Movie) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue({
                ...record,
                dateofbirth: record.dateofbirth
                  ? moment(record.dateofbirth, "YYYY-MM-DD")
                  : null,
              });
              setIsEditing(true);
              setIsOpen(true);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có muốn xóa?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsOpen(true);
          setIsEditing(false);
          form.resetFields();
          setFileList([]); // Clear file list on modal open
        }}
      >
        Thêm Phim Mới
      </Button>
      <div>
        <Table dataSource={movies} columns={columns} />
      </div>
      <Modal
        onOk={() => form.submit()}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={isEditing ? "Cập Nhật" : "Thêm Phim mới"}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng điền đẩy đủ tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày tháng năm sinh"
            name="dateofbirth"
            rules={[
              {
                required: true,
                message: "Vui lòng điền ngày tháng năm sinh!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn!",
              },
            ]}
          >
            <Select
              options={[
                { label: "Học sinh", value: true },
                { label: "Người lớn", value: false },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Vui lòng thêm ảnh!",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {fileList.length < 1 && <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Link Phim"
            name="videoUrl"
            rules={[
              {
                required: true,
                message: "Vui lòng điền link phim!",
              },
              {
                type: "url",
                message: "Vui lòng điền đúng định dạng URL!",
              },
            ]}
          >
            <Input placeholder="Nhập link phim (e.g., https://www.youtube.com/...)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
