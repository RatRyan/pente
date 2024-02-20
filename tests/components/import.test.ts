describe('import vue components', () => {
  test('can import tile', async () => {
		const comp = import('../../components/Tile.vue');
		expect(comp).toBeDefined();
	});
});