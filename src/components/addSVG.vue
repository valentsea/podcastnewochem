/* eslint-disable quotes */
<template>
    <span
        class="icon"
        :class="iconClass"
        @click="clickIcon"
        v-if="icon && showIconIf"
        v-html="require(`!html-loader!../assets/icons/${icon}.svg`)"
    ></span>
</template>

<script>
export default {
    name: 'addSVG',
    props: {
        icon: {
            type: String,
        },
        iconClass: {
            type: String,
            default: '',
        },
        showIconIf: {
            type: Boolean,
            default: true,
        },
        clickIcon: {
            default: '',
        },
    },
}
</script>

<style scoped>
svg {
    display: inline-block;
    vertical-align: baseline;
}
</style>
