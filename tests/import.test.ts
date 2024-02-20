describe('import vue components', () => {
  test('can import tile', async () => {
		const comp = await import('../components/Tile.vue');
		expect(comp).toBeDefined();
	});
});
