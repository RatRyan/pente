// import { mount } from '@vue/test-utils'

// describe('import vue composables', () => {
// 	test('import useGame', () => {
// 		const useGame = import('../../composables/useGame')
// 		expect(useGame).toBeDefined()
// 	})
// });

// describe('SidePanel.vue', () => {
	// const useGame = import('../../composables/useGame')
	// const SidePanel = import('../../components/SidePanel.vue');
	// const wrapper = mount(SidePanel);
	// const input = wrapper.find('input.board-size');
	// test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
	// 	// Test for gridSize greater than 39
	// 	input.setValue('40');
	// 	await wrapper.vm.$nextTick();
	// 	wrapper.find('button.game-button').trigger('click');
	// 	expect(wrapper.vm.useGame().gameStarted).toBeTruthy();
	// });

	// // Test for gridSize less than 9
	// test('game set at 8 shouldnt load', async () => {
	// 	input.setValue('8');
	// 	await wrapper.vm.$nextTick();
	// 	wrapper.find('button.game-button').trigger('click');
	// 	expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
	// });

	// // Test for even gridSize
	// test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
	// 	input.setValue('10');
	// 	await wrapper.vm.$nextTick();
	// 	wrapper.find('button.game-button').trigger('click');
	// 	expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
	// });

	// // Test for valid gridSize
	// test('should start game only when gridSize is greater than 9, less than 39, and odd', async () => {
	// 	input.setValue('15');
	// 	await wrapper.vm.$nextTick();
	// 	wrapper.find('button.game-button').trigger('click');
	// 	expect(wrapper.vm.useGame().gameStarted).toBeFalsy();
	// });
// });
