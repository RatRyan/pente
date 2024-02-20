describe('import vue composables', () => {
  test('import useGame', () => {
		const useGame = import('../../composables/useGame')
		expect(useGame).toBeDefined()
	})
});