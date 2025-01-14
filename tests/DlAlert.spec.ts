import { mount } from '@vue/test-utils'
import { DlAlert } from '../src/components'
import { describe, it, expect } from 'vitest'

describe('DlAlert', () => {
    const _closeButton = '[data-test="close-button-icon"]'
    const _root = '[data-test="root"]'

    it('should render the given text prop', () => {
        const wrapper = mount(DlAlert, {
            props: {
                type: 'success',
                text: 'Alert'
            }
        })

        expect(wrapper.text()).toContain('Alert')
    })

    it('should render the close icon', () => {
        const wrapper = mount(DlAlert, {
            props: {
                type: 'success',
                text: 'Alert',
                closable: true
            }
        })

        expect(wrapper.get(_root)).toBeDefined()
        expect(wrapper.get(_closeButton)).toBeDefined()
    })

    it('should accept only valid "type" properties', () => {
        const validator = DlAlert.props.type.validator

        expect(validator('info')).toBe(true)
        expect(validator('text')).toBe(false)
    })

    describe('when the props are updated', () => {
        it('should adapt the styling accordingly', async () => {
            const wrapper = mount(DlAlert, {
                props: {
                    type: 'success',
                    text: 'Alert'
                }
            })

            await wrapper.setProps({ fluid: true })
            await wrapper.vm.$nextTick()
            expect(
                (wrapper.get(_root).element as HTMLElement).style.width
            ).toEqual('100%')
        })
    })

    describe('when the close icon is clicked', () => {
        it('should trigger the "update:model-value" event and close hide the component', async () => {
            const wrapper = mount(DlAlert, {
                props: {
                    text: 'Alert',
                    type: 'success',
                    closable: true
                }
            })

            const closeButton = await wrapper.find(_closeButton)
            closeButton.trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.emitted()).toHaveProperty('update:model-value')
            let error: any
            try {
                const root = wrapper.get(_root)
            } catch (e) {
                error = e
            }
            expect(error).toBeDefined()
        })
    })
})
