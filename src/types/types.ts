export interface Product {
    id: number
    name: string,
    imageUrl: string,
    price: number,
}

export interface Category {
    id: number,
    title: string,
    imageUrl: string,
    items: Product[]
}

export interface Item  extends  Product {
    quantity: number
}
