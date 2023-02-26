import { mount } from '@vue/test-utils'
import DlStepperHeader from '../../src/components/DlStepper/DlStepperHeader.vue'

describe('DlStepperHeader', () => {
    it('should display the title; should emit the "close" event', async () => {
        const headerTitle = 'Title'
        const wrapper = mount(DlStepperHeader, {
            props: { headerTitle }
        })

        expect(wrapper.text()).toContain(headerTitle)
        const button = wrapper.find('button')
        await button.trigger('click')
        expect(wrapper.emitted()['close'][0]).toBeTruthy()
    })
})
