/*
Game Fundamentals Tests:
players must be able to click a tile on their turn, so they can place a stone
players must be able to switch turns, so each players can place a stone
players must not be able to place a stone on top of another one
players must not be able to place a stone on not their turn
players must be able to surround adjacent same-colored stones, so they can be captured
players must be able to place 5 same-colored stones in a horizontal, vertical, and diagonal line, so they can win the game
players must be able to capture 5 or more pairs, so they can win the game
Avalonia Tests
the board must be initialized as a 19x19 grid
the board must be empty on generation
clicking a tile must create the appropriate colored stone corresponding to the currents players turn
restarting the game must clear out the board
 */

import {assert, expect} from "vitest";
import type {integer} from "vscode-languageserver-types";

describe('import vue components', () => {
  test('can import board', async () => {
    const cmp = await import('../components/Board.vue');
    expect(cmp).toBeDefined();
  });

  test('can import chip', async () => {
    const cmp = await import('../components/Chip.vue');
    expect(cmp).toBeDefined();
  });

  test('player cannot click when not their turn', async () => {

  })

  test('board size must be odd numbers 9 through 39 ', (size: integer) =>{
    //size = 15
    assert.isTrue(size % 2 != 0)
    assert.isTrue(size >= 9)
    assert.isTrue(size <= 39)
  })
});
