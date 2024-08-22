import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Checkbox,
  Popover,
  Drawer,
  Space,
  Input,
  Select,
  InputNumber,
  Form,
} from "antd";
import { List } from "../../interfaces/List.model";
import { ListItem } from "../../interfaces/ListItem.model";
import "./Index.css";
import { MenuOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { User } from "../../interfaces/User.modal";
import { getList, putList, putListItem } from "../../services/list.ws";
const Home = () => {
  const [data, setData] = useState<List | null>(null);
  const [userDate, setUserDate] = useState<User>({} as User);
  const [isModalOpenList, setIsModalOpenList] = useState(false);
  const [isModalOpenItem, setIsModalOpenItem] = useState(false);
  const [selectedList, setSelectedList] = useState<ListItem[] | null>(null);
  const [nameList, setNameList] = useState<Array<string | number> | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [titleList, setTitleList] = useState<string>("");
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  const [form] = Form.useForm<ListItem>();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const showModalList = () => {
    setIsModalOpenList(true);
  };

  const handleOk = () => {
    setIsModalOpenList(false);
    const list = {
      id: 0,
      name: titleList,
      creator: userDate.name,
      id_creator: userDate.id,
      items: [],
    };
    putList(list);
  };

  const handleCancel = () => {
    setIsModalOpenList(false);
  };

  const ListSelected = (list: ListItem[]) => {
    setSelectedList(list);
    setIsModalOpenItem(true);
  };

  const handleSubmit = () => {
    setIsModalOpenList(false);
    const list = {
      id: 0,
      idreq: Number(nameList?.slice(1, 2).toString()),
      user: userDate.name,
      check: false,
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      quantity: form.getFieldValue("quantity") || 1,
      unit: form.getFieldValue("unit"),
      price: form.getFieldValue("price"),
      created_at: new Date().toISOString(),
    };
  
    putListItem(list);
  };

  const handleOkItem = () => {};

  const handleShowAddItem = () => {
    setShowAddItem(true);
  };

  const handleCancelItem = () => {
    setIsModalOpenItem(false);
  };
  useEffect(() => {
    const user = localStorage.getItem("dateUser");
    if (user) {
      setUserDate(JSON.parse(user) as User);
      dataList(JSON.parse(user) as User);
    } else {
      localStorage.removeItem("dateUser");
      window.location.href = "/login";
    }
  }, []);

  const dataList = async (user: User) => {
    const data = await getList(user.id);
    setData(data);
  };

  return (
    <div style={{ margin: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" onClick={showModalList}>
          <PlusOutlined />
        </Button>
        <Button type="primary" onClick={showLoading}>
          <MenuOutlined />
        </Button>
      </div>

      <h1>Lista</h1>
      <div style={{ display: "flex" }}>
        {data &&
          data.map((list: List) => (
            <Card
              key={list.id}
              style={{ margin: "10px" }}
              onClick={() => [
                ListSelected(list.items),
                setNameList([list.name, list.id]),
              ]}
            >
              <h2>{list.name}</h2>
              <h3>{list.creator}</h3>
            </Card>
          ))}
      </div>
      <Modal
        title="Adicionar Item"
        open={showAddItem}
        onOk={() => null}
        footer={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              form="formItem"
              key="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        }
        onCancel={() => setShowAddItem(false)}
      >
        <div>
          <Form form={form} variant="filled">
            <Form.Item
              label="Nome do Item"
              name="name"
              rules={[{ required: true, message: "O Nome é Obrigatorio" }]}
            >
              <Input type="text" required />
            </Form.Item>
            <Space direction="horizontal">
              <Form.Item
                label="Quantidade"
                name="qdt"
                rules={[
                  { required: true, message: "A Quantidade é Obrigatoria" },
                ]}
              >
                <InputNumber min={1} defaultValue={1} />
              </Form.Item>
              <Form.Item label="Preço" name="price">
                <InputNumber type="text" required min={0} defaultValue={0} />
              </Form.Item>
            </Space>

            <Form.Item label="Unidade" name="uni">
              <Select defaultValue={null} style={{ width: 120 }}>
                <Select.Option value={null}>Não</Select.Option>
                <Select.Option value="kg">Kg</Select.Option>
                <Select.Option value="g">G</Select.Option>
                <Select.Option value="l">L</Select.Option>
                <Select.Option value="ml">Ml</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Descrição" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title="Nova Lista"
        open={isModalOpenList}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <h2>Nome da Lista</h2>
          <Input type="text" onChange={(e) => setTitleList(e.target.value)} />
        </div>
      </Modal>
      <Modal
        open={isModalOpenItem}
        onOk={handleOkItem}
        onCancel={handleCancelItem}
        footer={false}
      >
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h2>{nameList?.slice(0, 1).toString()}</h2>
            <Button type="primary" onClick={handleShowAddItem}>
              Adicionar
            </Button>
          </div>

          {selectedList?.length === 0 || selectedList === null ? (
            <div>
              <h2 style={{ textAlign: "center" }}>Nenhum item na lista</h2>
            </div>
          ) : (
            <div>
              {selectedList.map(
                (item) =>
                  !item.check && (
                    <Card key={item.id} style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Checkbox />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            width: "40%",
                            paddingInline: "10px",
                          }}
                        >
                          <div>
                            <b>x{item.quantity}</b> - <b>{item.name}</b>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "40%",
                          }}
                        >
                          <p>{item.description}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "20%",
                          }}
                        >
                          <Popover
                            content={
                              <div>
                                <Button
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                  }}
                                  onClick={() => null}
                                >
                                  Editar
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    backgroundColor: "red",
                                  }}
                                  onClick={() => null}
                                >
                                  Deletar
                                </Button>
                              </div>
                            }
                            trigger="click"
                          >
                            <Button>
                              <MoreOutlined />
                            </Button>
                          </Popover>
                        </div>
                      </div>
                    </Card>
                  )
              )}

              <h2>
                Concluidos {selectedList?.filter((item) => item.check).length}
              </h2>

              {selectedList?.map(
                (item) =>
                  item.check && (
                    <Card key={item.id} style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Checkbox
                          checked={true}
                          style={{ textDecoration: "line-through" }}
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            width: "40%",
                            paddingInline: "10px",
                          }}
                        >
                          <div>
                            <s>x{item.quantity}</s> - <s>{item.name}</s>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "50%",
                          }}
                        >
                          <s>{item.description}</s>
                        </div>
                      </div>
                    </Card>
                  )
              )}
            </div>
          )}
        </div>
      </Modal>
      <Drawer
        closable
        destroyOnClose
        title={<h2>Olá {userDate.name}</h2>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Space direction="vertical">
            <Button
              style={{
                width: "100%",
              }}
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              <b>Home</b>
            </Button>
            <Button
              style={{
                width: "100%",
              }}
              onClick={() => {
                localStorage.removeItem("dateUser");
                window.location.href = "/login";
              }}
            >
              <b>Sair</b>
            </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
