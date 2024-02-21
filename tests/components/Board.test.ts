import {expect} from "vitest";

describe('Board.vue', () => {
    test('Ensure board loads', () =>{
       const Board = import('../../components/Board.vue');
       expect(Board).toBeDefined;
    });
});