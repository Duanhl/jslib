import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Button, Space, message, Typography, Spin } from 'antd';
import { SaveOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import {  ConfigItem } from '@jslib/common';
import './index.css';
import {configService} from "../../common/proxy.ts";

const { Title, Text } = Typography;

const ConfigManager: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [items, setItems] = useState<ConfigItem[]>([]);

    const load = async () => {
        setLoading(true);
        try {
            const data = await configService.list();
            setItems(data);
            const v: Record<string, string | boolean | number> = {};
            data.forEach((i) => (v[i.key] = i.value));
            form.setFieldsValue(v);
        } catch {
            message.error('加载失败');
        } finally {
            setLoading(false);
        }
    };

    const save = async (values: Record<string, string | boolean | number>) => {
        setSaving(true);
        try {
            for (const i of items) {
                let updateValue = values[i.key]
                if(updateValue && typeof updateValue === 'string') {
                    updateValue = updateValue.trim();
                }

                if (updateValue !== i.value) {
                    await configService.update({key: i.key, value: updateValue});
                }
            }
            message.success('保存成功');
            load();
        } catch {
            message.error('保存失败');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="config-page">
            <div className="config-container">
                <div className="config-header">
                    <div className="config-icon-box">
                        <SettingOutlined className="config-icon" />
                    </div>
                    <div className="config-title-box">
                        <Title className="config-title">系统配置</Title>
                        <Text className="config-sub-title">统一管理所有配置项</Text>
                    </div>
                </div>

                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={save}>
                        <div className="config-card">
                            {items.map((item) => (
                                <Form.Item
                                    key={item.key}
                                    name={item.key}
                                    label={<span className="config-label">{item.description}</span>}
                                    className="config-form-item"
                                    rules={
                                        item.key.includes('Host')
                                            ? [{ pattern: /^https?:\/\/.+/, message: '请输入有效URL' }]
                                            : []
                                    }
                                >
                                    {typeof item.value === 'boolean' ? (
                                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                                    ) : (
                                        <Input
                                            placeholder={`请输入${item.description}`}
                                            suffix={<span className="config-input-suffix">{item.key}</span>}
                                        />
                                    )}
                                </Form.Item>
                            ))}
                        </div>

                        <div className="config-card config-footer">
                            <Text type="secondary">修改后请点击保存</Text>
                            <Space>
                                <Button icon={<ReloadOutlined />} onClick={load} className="config-btn-reset">
                                    重置
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={saving}
                                    className="config-btn-save"
                                >
                                    保存
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    );
};

export default ConfigManager;