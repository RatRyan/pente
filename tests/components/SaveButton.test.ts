describe('import vue components', () => {
    test('import Save button', () => {
        const useGame = import('../../components/SaveButton.vue')
        expect(useGame).toBeDefined()
    })
});

