<template>
    <div
        :id="uuid"
        :class="identifierClass"
        class="root-wrapper"
        :style="rootVars"
    >
        <dl-input
            ref="input"
            type="text"
            clear-button-tooltip
            :size="size"
            :model-value="modelValue"
            :placeholder="placeholder"
            :auto-suggest-items="autoSuggestItems"
            :highlight-matches="highlightMatches"
            :dense="dense"
            :suggest-menu-width="suggestMenuWidth"
            @input="onChange"
            @focus="onFocus"
            @blur="onBlur"
            @enter="onEnterPress"
            @clear="onClear"
        >
            <template #prepend>
                <dl-icon
                    icon="icon-dl-search"
                    color="dl-color-lighter"
                    style="margin-left: 9px"
                    size="12px"
                />
            </template>
        </dl-input>
        <dl-button
            v-show="withSearchButton"
            :size="buttonSize"
            :class="buttonClasses"
            @click="onSearchButtonPress"
        >
            Search
        </dl-button>
    </div>
</template>

<script lang="ts">
import { v4 } from 'uuid'
import { defineComponent, PropType } from 'vue-demi'
import { DlButton } from '../../../basic'
import { DlIcon } from '../../../essential'
import { DlInput } from '../../DlInput'

const SearchSizes = {
    l: 'l',
    m: 'm'
} as const
type TSearchSizes = (typeof SearchSizes)[keyof typeof SearchSizes]

const BUTTON_SIZES = {
    l: 'l',
    m: 's'
}

export default defineComponent({
    name: 'DlSearch',
    components: {
        DlButton,
        DlIcon,
        DlInput
    },
    model: {
        prop: 'modelValue',
        event: 'update:model-value'
    },
    props: {
        modelValue: { type: String, default: '' },
        size: {
            type: String as PropType<TSearchSizes>,
            default: SearchSizes.l
        },
        placeholder: { type: String, default: '' },
        autoSuggestItems: {
            type: Array as PropType<string[]>,
            default: (): string[] => []
        },
        highlightMatches: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        withSearchButton: { type: Boolean, default: false },
        suggestMenuWidth: { type: String, default: 'auto' }
    },
    emits: [
        'input',
        'focus',
        'blur',
        'clear',
        'enter',
        'search',
        'update:model-value'
    ],
    data() {
        return {
            uuid: `dl-search-${v4()}`
        }
    },
    computed: {
        buttonSize(): string {
            return BUTTON_SIZES[this.size]
        },
        identifierClass(): string {
            return `dl-search-${this.placeholder}`.replaceAll(' ', '-')
        },
        buttonClasses(): string[] {
            return [`button--${this.size}`]
        },
        rootVars(): Record<string, any> {
            return this.withSearchButton
                ? {
                      '--dl-search-text-input-margin': '0 20px 0 0'
                  }
                : {}
        }
    },
    methods: {
        onChange(value: string): void {
            this.$emit('input', value)
            this.$emit('update:model-value', value)
        },
        onFocus(e: InputEvent): void {
            this.$emit('focus', e)
        },
        onBlur(e: InputEvent): void {
            this.$emit('blur', e)
        },
        onEnterPress(value: string): void {
            this.$emit('enter', value)
        },
        onClear(value: string): void {
            this.$emit('clear', value)
        },
        onSearchButtonPress(): void {
            this.$emit('search', this.modelValue)
        }
    }
})
</script>

<style scoped lang="scss">
.root-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
}

::v-deep .dl-text-input {
    padding: 0;
    margin: var(--dl-search-text-input-margin);
    width: 100%;
    &__input {
        height: 100%;
    }
}
</style>
