<template>
    <div>
        <Tree :style="{width:treeWidth}" :data='treeData' :show-checkbox="showCheckbox"
              :render="renderContent" @on-check-change="checkedNode"></Tree>
    </div>
</template>

<script>
    let className = 'tree-title';
    let dragedData = null;
    let positionStatusClass = null;
    let position = null;
    export default {
        name: "courseTree",
        data() {
            return {}
        },
        props: {
            treeData: {
                default: () => [],
                type: Array
            },
            renderType: {
                default: 'normal',
                type: String
            },
            showCheckbox: {
                default: false,
                type: Boolean
            },
            isRadio: {
                default: false,
                type: Boolean
            },
            isStatus: {
                default: false,
                type: Boolean
            },
            isLock: {
                default: false,
                type: Boolean
            },
            isCount: {
                default: false,
                type: Boolean
            },
            isLink: {
                default: false,
                type: Boolean
            },
            isDrag: {
                default: true,
                type: Boolean
            },
            isSiblingsNode: {
                default: true,
                type: Boolean
            },
            treeWidth: {
                default: '100%',
                type: String
            }
        },
        methods: {
            renderContent(h, {root, node, data}) {
                return h('div', {
                    class: ['ivu-tree-box']
                }, [
                    this.isLock ? h('Icon', {
                        props: {
                            type: data.checked ? 'ios-lock' : 'ios-unlock'
                        },
                        class: ['ivu-tree-lock']
                    }) : '',
                    this.isRadio ? h('input', {
                        attrs: {
                            type: 'radio',
                            name: 'checkNode',
                            checked: false
                        },
                        on: {
                            click: () => {
                                console.log(data)
                            }
                        }
                    }) : '',
                    this.isStatus ? h('bookStatus', {
                        props: {
                            status: data.publishStatus
                        }
                    }) : '',
                    h('span', {
                        class: ['tree-title'],
                        attrs: {
                            draggable: this.isDrag
                        },
                        on: {
                            dragstart: (e) => {
                                this.dragstart(e, {root, node, data})
                            },
                            dragenter: (e) => {
                                this.dragenter(e)
                            },
                            dragover: (e) => {
                                this.dragover(e, {root, node, data})
                            },
                            drop: (e) => {
                                this.drop(e, {root, node, data})
                            },
                            click: (e) => {
                                let treeTitle = document.querySelectorAll('.tree-title');
                                for (let i = 0; i < treeTitle.length; i++) {
                                    treeTitle[i].classList.remove('tree-title-on');
                                }
                                e.target.classList.add('tree-title-on');
                                this.selectedNode(data);
                            }
                        }
                    }, data.title),
                    this.isCount ? h('span', {
                        class: ['ivu-tree-fr'],
                    }, data.count) : '',
                    this.isLink ? h('div', {class: ['ivu-tree-fr']}, [
                        h('span', {
                            class: ['ivu-tree-margin-right', 'ivu-tree-link', 'ivu-tree-on']
                        }, '关联'),
                        h('span', {
                            class: ['ivu-tree-margin-right']
                        }, '已关联[系统目录]'),
                        h('span', {
                            class: ['ivu-tree-margin-right', 'ivu-tree-delete']
                        }, '删'),
                        h('span', {
                            class: ['ivu-tree-margin-right']
                        }, 'sd'),
                    ]) : ''
                ])
            },
            dragstart(e, {root, node, data}) {
                let {dataTransfer, target} = e;
                dataTransfer.setData('text/plain', '');
                dataTransfer.effectAllowed = 'move';
                target.classList.add('ivu-tree-draged');
                dragedData = data;
                console.log(data,1)
            },
            dragenter(e) {
                e.dataTransfer.dropEffect = 'move'
            },
            dragover(e, {root, node, data}) {
                let {target, offsetY} = e;
                e.preventDefault();
                if (dragedData !== data) {
                    this.clearBorder();
                    let positonStatus = offsetY / target.offsetHeight;
                    if (positonStatus <= 1 / 3) {
                        position = 1;
                        positionStatusClass = ' ivu-tree-before';
                    } else if (positonStatus > 1 / 3 && positonStatus < 2 / 3) {
                        position = 2;
                        positionStatusClass = ' ivu-tree-over'
                    } else if (positonStatus >= 2 / 3) {
                        position = 3;
                        positionStatusClass = ' ivu-tree-after';
                    }
                    target.className = className + positionStatusClass;
                }
            },
            drop(e, {root, node, data}) {
                this.clearBorder();
                document.querySelector('.ivu-tree-draged').classList.remove('ivu-tree-draged');
                console.log(data,2)
                dragedData = null;
                positionStatusClass = null;
                position = null;
            },
            selectedNode(data) {
                this.$emit('on-select-change', data);
            },
            checkedNode(data) {
                this.$emit('on-check-change', data);
            },
            clearBorder(){
                let borderElem = document.querySelectorAll('.ivu-tree-before,.ivu-tree-over,.ivu-tree-after');
                for(let i=0;i<borderElem.length;i++){
                    borderElem[i].className = className;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .ivu-tree {
        /deep/ ul {
            font-size: 14px !important;
        }
        /deep/ .ivu-tree-box {
            display: inline-block;
            width: 100%;
            padding-right: 20px;
        }
        /deep/ .ivu-tree-lock {
            cursor: pointer;
            font-size: 20px;
        }
        /deep/ .fr {
            float: right;
        }
        /deep/ .ivu-tree-margin-right {
            margin-right: 8px;
            &.ivu-tree-link {
                color: #fff;
                border-radius: 3px;
                padding: 3px 6px;
                &.on {
                    background-color: #ababab;
                }
                &.off {
                    background-color: #2d8cf0;
                }
            }
        }
        /deep/ input[name=checkNode] {
            position: relative;
            top: 4px;
            width: 14px;
            height: 14px;
        }
        /deep/ .tree-title {
            padding: 3px;
            box-sizing: border-box;
            cursor: pointer;
            &.tree-title-on {
                color: #2d8cf0;
            }
            &.ivu-tree-draged {
                background-color: #ccc;
                opacity: 0.5;
            }
            &.ivu-tree-before {
                border-top: 1px solid #2d8cf0;
            }
            &.ivu-tree-over {
                background-color: #2d8cf0;
                color: #fff;
            }
            &.ivu-tree-after {
                border-bottom: 1px solid #2d8cf0;
            }
        }
    }
</style>