describe('import vue components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('../components/Board.vue');
    expect(cmp).toBeDefined();
  });
});
