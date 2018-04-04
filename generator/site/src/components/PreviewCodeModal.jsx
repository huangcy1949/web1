import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, notification} from 'antd';
import ClipboardJS from 'clipboard';
import Highlight from 'react-highlight'
import 'highlight.js/styles/github.css';

export default class PreviewCodeModal extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        code: PropTypes.string.isRequired,
        onCancel: PropTypes.func.isRequired,
        onOk: PropTypes.func.isRequired,
    };

    static defaultProps = {
        visible: false,
        code: '',
        width: '70%',
    };
    state = {};

    componentDidMount() {
        const clipboard = new ClipboardJS('.js-preview-code-btn');
        clipboard.on('success', function (e) {
            notification.success({
                message: '成功！',
                description: '复制到粘贴板成功！',
            });
            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            notification.error({
                message: '失败！',
                description: '复制到粘贴板失败！',
            });
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    };

    render() {
        const {
            visible,
            onCancel,
            onOk,
            code,
            width,
        } = this.props;

        return (
            <Modal
                style={{marginBottom: '50px'}}
                width={width}
                title="代码预览"
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
            >
                <textarea
                    style={{position: 'absolute', right: -1000}}
                    id="js-code-content"
                    defaultValue={code}
                />

                <Button
                    style={{marginBottom: 8}}
                    className="js-preview-code-btn"
                    data-clipboard-target="#js-code-content"
                    size="small"
                >复制</Button>

                <Highlight>{code}</Highlight>
            </Modal>
        );
    }
}
