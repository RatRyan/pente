describe('import vue components', () => {
    test('import useGame', () => {
        const useGame = import('../../components/LoadButton.vue')
        expect(useGame).toBeDefined()
    })
});
