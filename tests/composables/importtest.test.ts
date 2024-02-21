import { mount } from '@vue/test-utils'

describe('import vue composables', () => {
    test('import useGame', () => {
        const useGame = import('../../composables/useGame')
        expect(useGame).toBeDefined()
    })
});

describe('SidePanel.vue', () => {
    const useGame = import('../../composables/useGame');
    const SidePanel = import('../../components/SidePanel.vue');
    
    // Ensure the component is fully mounted
    const wrapper = mount(SidePanel);
    
    // Find the input element after the component is mounted
    const input = wrapper.find('#sizeInput');
    const button = wrapper.find('#startGame')
    
    // Test for gridSize greater than   39
    test('should start game only when gridSize is greater than   9, less than   39, and odd', async () => {
        // Check if the input element was found
        if (input.exists()) {
            // Set the value and wait for the DOM to update
            await input.setValue('40');
            await wrapper.vm.$nextTick();
            
            // Trigger the click event and wait for the DOM to update
            await button.trigger('click');
            await wrapper.vm.$nextTick();
            
            // Check if the game has started
            expect(wrapper.vm.useGame().gameStarted).toBeTruthy();
        } else {
            // Handle the case where the input element is not found
            console.error('Input element with class "board-size" not found');
        }
    });

    // // Test for gridSize less than 9
    // test('game set at 8 shouldnt load', async () => {
    //     input.setValue('8');
    //     await wrapper.vm.$nextTick();
    //     wrapper.find('button.game-button').trigger('click');
    //     expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
    // });

    // // Test for even gridSize
    // test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
    //     input.setValue('10');
    //     await wrapper.vm.$nextTick();
    //     wrapper.find('button.game-button').trigger('click');
    //     expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
    // });

    // // Test for valid gridSize
    // test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
    //     input.setValue('15');
    //     await wrapper.vm.$nextTick();
    //     wrapper.find('button.game-button').trigger('click');
    //     expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
    // });
});