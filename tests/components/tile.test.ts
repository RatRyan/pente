import mount from '@nuxt/test-utils'
import _sut from '../../components/Tile.vue'

describe ('render Tile component', () => {
  test('can be mounted', () => {
    expect(_sut).toBeTruthy()
    const wrapper = mount(_sut)
    expect(wrapper)
  }) 
})