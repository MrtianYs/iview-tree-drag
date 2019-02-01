<template>
    <div id="app">
        <course-tree :tree-data="data" render-type="link" @on-select-change="" @on-check-change=""></course-tree>
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
                        children: [
                            {
                                title: 'child-1',
                                expand: true,
                                count: 4,
                                children: [
                                    {
                                        title: 'child-1-1',
                                        publishStatus: 0,
                                        count: 4,
                                    }
                                ]
                            },
                            {
                                title: 'child-2',
                                publishStatus: 1,
                                count: 4,
                            }
                        ]
                    },
                    {
                        title: 'father-2',
                        expand: true,
                        count: 4,
                        children: [
                            {
                                title: 'child-2',
                                publishStatus: 2,
                                count: 4,
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            courseTree
        }
    }
</script>
<style lang="less">

</style>
