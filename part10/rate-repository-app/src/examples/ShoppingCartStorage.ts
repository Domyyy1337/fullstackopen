import AsyncStorage from '@react-native-async-storage/async-storage'

type Product = string

class ShoppingCartStorage {
  namespace: string

  constructor(namespace = 'shoppingCart') {
    this.namespace = namespace
  }

  async getProducts() {
    const rawProducts = await AsyncStorage.getItem(`${this.namespace}:products`)

    return rawProducts ? (JSON.parse(rawProducts) as Product[]) : ([] as Product[])
  }

  async addProduct(productId: Product) {
    const currentProducts = await this.getProducts()
    const newProducts = [...currentProducts, productId]

    await AsyncStorage.setItem(`${this.namespace}:products`, JSON.stringify(newProducts))
  }

  async clearProducts() {
    await AsyncStorage.removeItem(`${this.namespace}:products`)
  }
}

async function doShopping() {
  const shoppingCartA = new ShoppingCartStorage('shoppingCartA')
  const shoppingCartB = new ShoppingCartStorage('shoppingCartB')

  await shoppingCartA.addProduct('chips')
  await shoppingCartA.addProduct('soda')

  await shoppingCartB.addProduct('milk')

  const productsA = await shoppingCartA.getProducts()
  const productsB = await shoppingCartB.getProducts()

  console.log(productsA, productsB)

  await shoppingCartA.clearProducts()
  await shoppingCartB.clearProducts()
}

await doShopping()