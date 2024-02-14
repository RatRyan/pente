describe('import vue components', () => {
  test('can import board', async () => {
    const cmp = await import('../components/Board.vue');
    expect(cmp).toBeDefined();
  });

  test('can import chip', async () => {
    const cmp = await import('../components/Chip.vue');
    expect(cmp).toBeDefined();
  });

});
