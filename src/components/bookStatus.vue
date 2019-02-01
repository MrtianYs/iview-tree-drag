<template>
    <span :class="['status-common', onClass[status]]">{{ text[status] }}</span>
</template>

<script>
    export default {
        name: "bookStatus",
        data() {
            return {
                text: {
                    0: '录入中',
                    1: '录入中',
                    2: '待校对',
                    3: '校对中',
                    4: '已校对',
                    5: '已发布',
                },
                onClass: {
                    0: 'pink',
                    1: 'pink',
                    2: 'yellow',
                    3: 'yellow',
                    4: 'green',
                    5: 'green'
                }
            }
        },
        props: {
            status: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style scoped>
    .status-common {
        display: inline-block;
        margin: 0 6px;
        padding: 2px 6px;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
    }

    .status-common.pink {
        background-color: #ffaaa3;
    }

    .status-common.yellow {
        background-color: #ffb26a;
    }

    .status-common.green {
        background-color: #06c8a9;
    }
</style>