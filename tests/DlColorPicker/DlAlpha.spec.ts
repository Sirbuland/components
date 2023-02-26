import { mount } from '@vue/test-utils'
import { DlAlpha } from '../../src/components/DlColorPicker'

describe('DlColorPicker DlAlpha component', () => {
    it('should mount the component', async () => {
        const wrapper = mount(DlAlpha)

        expect(wrapper.exists()).toBe(true)
    })

    it('should execute the watcher functions', async () => {
        const wrapper = mount(DlAlpha)

        const renderColorSpy = jest.spyOn(wrapper.vm, 'renderColor')
        const renderSlideSpy = jest.spyOn(wrapper.vm, 'renderSlide')

        await wrapper.setProps({
            color: '#111111',
            rgba: {
                r: 1,
                g: 1,
                b: 1,
                a: 0.5
            }
        })
        await wrapper.vm.$nextTick()

        expect(renderColorSpy).toHaveBeenCalled()
        expect(renderSlideSpy).toHaveBeenCalled()

        const selectAlphaSpy = jest.spyOn(wrapper.vm, 'selectAlpha')

        await wrapper.find('.color-alpha').trigger('mousedown')

        expect(selectAlphaSpy).toHaveBeenCalled()
    })
})
