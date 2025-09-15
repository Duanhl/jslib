import {Button, Form, Input, Switch, Tabs} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import './index.css';

const { TabPane } = Tabs;

const Settings = () => {

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h2>个人设置</h2>
                <Tabs defaultActiveKey="profile">
                    <TabPane tab="通知设置" key="notifications">
                        <Form layout="vertical">
                            <Form.Item
                                label="新评论通知"
                                name="commentNotification"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>

                            <Form.Item
                                label="点赞通知"
                                name="likeNotification"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>

                            <Form.Item
                                label="关注通知"
                                name="followNotification"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary">
                                    保存设置
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane tab="账号安全" key="security">
                        <Form layout="vertical">
                            <Form.Item
                                label="原密码"
                                name="oldPassword"
                                rules={[{ required: true, message: '请输入原密码！' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="请输入原密码" />
                            </Form.Item>

                            <Form.Item
                                label="新密码"
                                name="newPassword"
                                rules={[{ required: true, message: '请输入新密码！' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" />
                            </Form.Item>

                            <Form.Item
                                label="确认新密码"
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: '请确认新密码！' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不一致！'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="请确认新密码" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary">
                                    修改密码
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Settings;
