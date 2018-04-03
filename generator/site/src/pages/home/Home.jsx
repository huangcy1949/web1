import React, {Component} from 'react'
import {Card, Button, Collapse, Checkbox, Modal} from 'antd';
import PageContent from '../../layouts/page-content';
import FixBottom from '../../layouts/fix-bottom';
import BaseInfo from '../../components/BaseInfo';
import ListPage from '../../components/ListPage';
import {connect} from '../../models';
import './style.less'

export const PAGE_ROUTE = '/';

const Panel = Collapse.Panel;

@connect(state => ({srcDirectories: state.generator.srcDirectories}))
export default class Home extends Component {
    state = {
        activePanelKeys: ['listPage'],
        checkedPanels: {
            listPage: true,
        },
    };

    componentWillMount() {
        this.props.action.generator.getSrcDirs();
    }

    handleSubmit = () => {
        this.baseInfoForm.validateFieldsAndScroll((err, baseInfo) => {
            if (err) return;

            const params = {};
            const {checkedPanels} = this.state;

            if (checkedPanels.listPage) {
                this.listPageForm.validateFieldsAndScroll((err, listPage) => {
                    if (err) return;

                    params.listPage = listPage;
                    this.doSubmit(params, baseInfo);
                });
            }
        });
    };

    doSubmit = (params, baseInfo) => {
        const {checkedPanels} = this.state;

        const fileCount = Object.keys(checkedPanels).reduce((prev, next) => checkedPanels[next] ? prev + 1 : prev, 0);
        const fileKeys = Object.keys(params);

        // 数据数量，与选中生成模块数量相同，则进行提交
        if (fileKeys.length === fileCount) {
            const files = [];

            fileKeys.forEach(key => {
                const config = params[key];
                const {outPutDir, outPutFile} = config;
                files.push({
                    fileDir: outPutDir,
                    fileName: outPutFile,
                });

            });

            this.props.action.generator.checkFileExist({
                params: {files}, onResolve: (result) => {
                    const existFiles = [];
                    if (result && result.length) {
                        result.forEach(({fileName, exist}) => {
                            if (exist) {
                                existFiles.push(fileName);
                            }
                        })
                    }
                    if (existFiles.length) {
                        return Modal.confirm({
                            title: '需要确认',
                            content: (
                                <span>
                                    <div>如下文件已存在，是否覆盖？</div>
                                    {existFiles.map(item => <div key={item} style={{color: 'red'}}>{item}</div>)}
                                 </span>
                            ),
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                this.props.action.generator.generatorFiles({params: {baseInfo, ...params}, successTip: '生成成功！'});
                            },
                        });

                    }
                    this.props.action.generator.generatorFiles({params: {baseInfo, ...params}, successTip: '生成成功！'});
                }
            });
        }
    };

    handlePanelChange = (activePanelKeys) => {
        this.setState({activePanelKeys});
    };

    handlePanelCheckboxChange = (checked, key) => {
        const activePanelKeys = [...this.state.activePanelKeys];
        const checkedPanels = {...this.state.checkedPanels};
        checkedPanels[key] = checked;

        const activePanelKeyIndex = activePanelKeys.indexOf(key);

        if (checked && activePanelKeyIndex === -1) {
            activePanelKeys.push(key);
        }

        if (!checked && activePanelKeyIndex !== -1) {
            activePanelKeys.splice(activePanelKeyIndex, 1)
        }

        this.setState({checkedPanels, activePanelKeys});
    };

    getPanelProps = (title, key) => {
        const {checkedPanels} = this.state;
        const checked = checkedPanels[key];
        const titleStyle = {};

        if (!checked) {
            titleStyle.color = 'rgba(0,0,0,.25)';
        }

        const header = (
            <Checkbox
                checked={checked}
                onChange={(e) => this.handlePanelCheckboxChange(e.target.checked, key)}
                onClick={e => e.stopPropagation()}
            >
                <span
                    style={titleStyle}
                    onClick={e => e.stopPropagation()}
                >{title}</span>
            </Checkbox>
        );
        return {
            header,
            key,
            disabled: !checkedPanels[key],
        };
    };

    render() {
        const {activePanelKeys, checkedPanels} = this.state;
        const fileCount = Object.keys(checkedPanels).reduce((prev, next) => checkedPanels[next] ? prev + 1 : prev, 0);
        const cardStyle = {
            marginBottom: '16px',
        };

        return (
            <PageContent>
                <Card
                    title="基础命名"
                    style={cardStyle}
                >
                    <BaseInfo
                        formRef={form => this.baseInfoForm = form}
                    />
                </Card>

                <Collapse activeKey={activePanelKeys} onChange={this.handlePanelChange}>
                    <Panel {...this.getPanelProps('列表页', 'listPage')}>
                        <ListPage
                            formRef={form => this.listPageForm = form}
                        />
                    </Panel>
                    <Panel {...this.getPanelProps('编辑页面', 'editPage')}>
                        <p>编辑页</p>
                    </Panel>
                    <Panel {...this.getPanelProps('model', 'model')}>
                        <p>model</p>
                    </Panel>
                </Collapse>

                <FixBottom>
                    <Button
                        type="primary"
                        onClick={this.handleSubmit}
                        disabled={!fileCount}
                    >
                        生成文件（{fileCount}）
                    </Button>
                </FixBottom>
            </PageContent>
        );
    }
}
