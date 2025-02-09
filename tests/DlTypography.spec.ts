import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { DlTypography } from '../src/components'

describe('DlTypography', () => {
    it('should compute values properly', async () => {
        const wrapper = mount(DlTypography, {
            props: {
                transform: 'uppercase',
                bold: false,
                size: '30px'
            },
            slots: {
                default: () => 'some'
            }
        })

        expect(wrapper.html()).toBe(
            `<p data-v-50b0b5ef="" id="${wrapper.vm.uuid}" class="dl-typography" style="text-transform: uppercase; font-weight: 400; font-size: 30px;">some</p>`
        )

        await wrapper.setProps({ transform: 'none', bold: true })

        expect(wrapper.html()).toBe(
            `<p data-v-50b0b5ef="" id="${wrapper.vm.uuid}" class="dl-typography" style="text-transform: none; font-weight: bold; font-size: 30px;">some</p>`
        )
    })
})
