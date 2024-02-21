import { mount } from '@vue/test-utils'
import SidePanel from '../../components/SidePanel.vue';

describe('import vue composables', () => {
  test('import useGame', () => {
		const useGame = import('../../composables/useGame')
		expect(useGame).toBeDefined()
	})
});

describe('SidePanel.vue', () => {
	test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
		const useGame = import('../../composables/useGame')
		const wrapper = mount(SidePanel);
		const input = wrapper.find('input.board-size');

		// Test for gridSize greater than 39
		input.setValue('40');
		await wrapper.vm.$nextTick();
		wrapper.find('button.game-button').trigger('click');
		expect(wrapper.vm.useGame().gameStarted).toBe(false);

		// Test for gridSize less than 9
		input.setValue('8');
		await wrapper.vm.$nextTick();
		wrapper.find('button.game-button').trigger('click');
		expect(wrapper.vm.useGame().gameStarted).toBe(false);

		// Test for even gridSize
		input.setValue('10');
		await wrapper.vm.$nextTick();
		wrapper.find('button.game-button').trigger('click');
		expect(wrapper.vm.useGame().gameStarted).toBe(false);

		// Test for valid gridSize
		input.setValue('15');
		await wrapper.vm.$nextTick();
		wrapper.find('button.game-button').trigger('click');
		expect(wrapper.vm.useGame().gameStarted).toBe(true);
	});
});
