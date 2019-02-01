<template>
    <div id="app">
        <course-tree :tree-data="data" render-type="link" @on-select-change="" @on-check-change=""
                     @on-drag-end="dragend"></course-tree>
        <router-view/>
    </div>
</template>
<script>
    import courseTree from './components/tree-extend'

    export default {
        data() {
            return {
                data: [
                    {
                        title: 'father-1',
                        expand: true,
                        count: 4,
                        selected: false,
                        children: [
                            {
                                title: 'child-1-1',
                                expand: true,
                                count: 4,
                                selected: false,
                                children: [
                                    {
                                        title: 'child-1-1-1',
                                        publishStatus: 2,
                                        count: 4,
                                        selected: true,
                                    },
                                    {
                                        title: 'child-1-1-2',
                                        publishStatus: 2,
                                        count: 4,
                                    },
                                    {
                                        title: 'child-1-1-3',
                                        publishStatus: 2,
                                        count: 4,
                                    },
                                ]
                            },
                            {
                                title: 'child-1-2',
                                publishStatus: 1,
                                count: 4,
                                selected: false,
                            },
                            {
                                title: 'child-1-3',
                                publishStatus: 1,
                                count: 4,
                                selected: false,
                            },
                            {
                                title: 'child-1-4',
                                publishStatus: 1,
                                count: 4,
                                selected: false,
                            }
                        ]
                    },
                    {
                        title: 'father-2',
                        expand: true,
                        count: 4,
                        children: [
                            {
                                title: 'child-2-1',
                                publishStatus: 2,
                                count: 4,
                                selected: false,
                            },
                            {
                                title: 'child-2-2',
                                publishStatus: 2,
                                count: 4,
                                selected: false,
                            },
                            {
                                title: 'child-2-3',
                                publishStatus: 2,
                                count: 4,
                                selected: true,
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            courseTree
        },
        methods: {
            dragend(root) {
                // console.log(this.data)
            }
        }
    }
</script>
<style lang="less">

</style>
