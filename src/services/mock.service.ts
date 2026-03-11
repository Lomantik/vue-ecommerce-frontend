import rawProducts from '@/data/products.json'
import rawCategories from '@/data/categories.json'
import rawPages from '@/data/pages.json'
import rawReviews from '@/data/reviews.json'
import rawImages from '@/data/images.json'
import rawAttributes from '@/data/attributes.json'
import aboutHtml from '@/content/pages/about.html?raw'
import contactHtml from '@/content/pages/contact.html?raw'
import defaultProductDescriptionHtml from '@/content/products/default_description.html?raw'
import type { Product, ProductVariant } from '@/types/product.ts'
import type { Category, CategoryLink } from '@/types/category.ts'
import type { Image } from '@/types/image.ts'
import type { Page } from '@/types/page.ts'
import type { IDataService } from '@/types/api.ts'
import type { Attribute } from '@/types/attribute.ts'
import type { Review } from '@/types/review.ts'

const products = rawProducts as Product[]
const categories = rawCategories as Category[]
const pages = rawPages as Page[]
const reviews = rawReviews as Review[]
const images = rawImages as Image[]
const attributes = rawAttributes as Attribute[]

const pagesContent: Record<string, string> = {
  about: aboutHtml,
  contact: contactHtml,
}
const productDescriptions: Record<string, string> = {
  default_description: defaultProductDescriptionHtml,
}

export const mockService: IDataService = {
  async getAllProducts(
    activeOnly: boolean = true,
    showInCatalogOnly: boolean = true,
  ): Promise<Product[]> {
    let result = products
    if (activeOnly) result = result.filter((product) => product.active)
    if (showInCatalogOnly) result = result.filter((product) => product.showInCatalog)
    return result
  },
  async getProductsByCategoryId(
    categoryId: number,
    activeOnly: boolean = true,
    showInCatalogOnly: boolean = true,
  ): Promise<Product[]> {
    let result = products.filter((product) => product.categoryIds.includes(categoryId)) as Product[]
    if (activeOnly) result = result.filter((product) => product.active)
    if (showInCatalogOnly) result = result.filter((product) => product.showInCatalog)
    return result
  },
  async getProductsByCategorySlug(categorySlug: string): Promise<Product[] | null> {
    const category = await this.getCategoryBySlug(categorySlug)
    if (category) {
      return products.filter((product) => product.categoryIds.includes(category.id))
    }
    return null
  },
  async getProductById(productId: number): Promise<Product | null> {
    const product = products.find((product) => product.id === productId)
    if (product) {
      return {
        ...product,
        description: productDescriptions[product.description],
      } as Product
    }
    return null
  },
  async getProductBySlug(productSlug: string): Promise<Product | null> {
    const product = products.find((product) => product.slug === productSlug)
    if (product) {
      return {
        ...product,
        description: productDescriptions[product.description],
      } as Product
    }
    return null
  },
  async getProductAttributes(productId: number): Promise<Attribute[]> {
    const result: Attribute[] = []
    const product = await this.getProductById(productId)
    if (product) {
      if (product.type === 'simple') {
        if (product.attributes) {
          const res = await Promise.all(
            Object.entries(product.attributes).map(async ([attributeId, attributeOptionId]) => {
              const attribute = await this.getAttributeById(Number(attributeId))
              if (attribute) {
                return {
                  ...attribute,
                  options: attribute.options.filter((option) => option.id === attributeOptionId),
                } as Attribute
              }
            }),
          )
          result.push(...(Object.values(res) as Attribute[]))
        }
      } else if (product.type === 'grouped') {
        const productsAttributes = await Promise.all(
          product.variantIds.map(async (id) => await this.getProductAttributes(id)),
        )
        result.push(
          ...(Object.values(
            productsAttributes
              .flat()
              .flat()
              .reduce((acc: Record<string, Attribute>, item) => {
                if (item.name in acc) {
                  item.options
                    .filter((option) => !acc[item.name]?.options.some((x) => x.id === option.id))
                    .forEach((opt) => acc[item.name]?.options.push(opt))
                } else {
                  acc[item.name] = { ...item }
                }
                return acc
              }, {}),
          ) as Attribute[]),
        )
      } else if (product.type === 'configurable') {
        const variantProducts = await Promise.all(
          product.variantIds.map(async (id) => await this.getProductById(id)),
        )
        for (const attributeId of product.configurableAttributeIds) {
          const attribute = await this.getAttributeById(attributeId)
          if (attribute) {
            result.push({
              ...attribute,
              options: attribute.options.filter((option) =>
                variantProducts.some(
                  (prod) => prod?.attributes && prod.attributes[attributeId] === option.id,
                ),
              ),
            } as Attribute)
          }
        }
      }
    }
    return result
  },
  async getProductVariants(productId: number): Promise<ProductVariant[]> {
    const result = new Set<ProductVariant>()

    const product = await this.getProductById(productId)
    if (product) {
      const configurableAttributes = await Promise.all(
        product.configurableAttributeIds.map(async (id) => await this.getAttributeById(id)),
      )
      const variantProducts = await Promise.all(
        product.variantIds.map(async (id) => await this.getProductById(id)),
      )

      for (const variantProduct of variantProducts) {
        if (variantProduct) {
          const newValue: ProductVariant = { id: variantProduct.id }
          for (const [attributeId, optionId] of Object.entries(variantProduct.attributes ?? {})) {
            if (!product.configurableAttributeIds.includes(Number(attributeId))) continue
            const attribute = configurableAttributes.find((x) => x?.id === Number(attributeId))
            if (attribute) {
              const option = attribute.options.find((x) => x.id === Number(optionId))
              if (option) newValue[attribute.name] = option.value
            }
          }
          result.add(newValue)
        }
      }
    }
    return [...result]
  },
  async getAllChildProducts(product: Product): Promise<Product[]> {
    const childProducts: Product[] = []
    if (product.type !== 'simple') {
      for (const variantId of product.variantIds) {
        const variant = await this.getProductById(variantId)
        if (variant) {
          if (variant.type === 'simple') childProducts.push(variant)
          else childProducts.push(...(await this.getAllChildProducts(variant)))
        }
      }
    }
    return childProducts
  },
  async getVariantProducts(product: Product): Promise<Product[]> {
    return (
      await Promise.all(product.variantIds.map(async (id: number) => await this.getProductById(id)))
    ).filter((p): p is Product => p !== null)
  },
  async getProductCategories(product: Product): Promise<CategoryLink[]> {
    const categories = await Promise.all(
      product.categoryIds.map(async (id) => await this.getCategoryById(id)),
    )

    return (
        await Promise.all(
          categories.map(async (cat) => {
            if (cat) {
              return {
                id: cat.id,
                title: cat.title,
                link: `${import.meta.env.BASE_URL}${(await this.buildCategoryPath(cat)).join('/')}`,
              }
            } else return null
          }),
        )
      ).filter((p): p is CategoryLink => p !== null).sort((a, b) => (a.title <= b.title ? -1 : 1))
  },
  async getAllCategories(): Promise<Category[]> {
    return categories
  },
  async getCategoryById(categoryId: number): Promise<Category | null> {
    const category = categories.find((c) => c.id === categoryId)
    return category ?? null
  },
  async getCategoryTree(category: Category | null = null): Promise<Category | null> {
    const resultChildren: Category[] = []
    if (category === null) category = await this.getCategoryById(0)
    if (category) {
      const children: Category[] = categories.filter((child) => child.parentId === category.id)
      for (const child of children) {
        if (child) {
          const el = await this.getCategoryTree(child)
          if (el) resultChildren.push(el)
        }
      }
    }
    return { ...category, children: resultChildren } as Category
  },
  async buildCategoryPath(category: Category): Promise<string[]> {
    const path = [category.slug]
    let parentId = category.parentId

    while (parentId !== 0 && parentId !== null) {
      if (typeof category.parentId !== 'number') continue
      const parent = await this.getCategoryById(category.parentId)
      if (parent) {
        path.unshift(parent.slug)
        parentId = parent.parentId
      }
    }

    return path
  },
  async getCategoryBySlug(categorySlug: string): Promise<Category | null> {
    const category = categories.find((category) => category.slug === categorySlug)
    return category ?? null
  },
  async getAllPages(): Promise<Page[]> {
    const results: Page[] = []
    for (const page of pages) {
      results.push({ ...page, content: pagesContent[page.content] } as Page)
    }
    return results
  },
  async getPageBySlug(pageSlug: string): Promise<Page | null> {
    const page = pages.find((page) => page.slug === pageSlug)
    if (page) return { ...page, content: pagesContent[page.content] } as Page
    return null
  },
  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return reviews.filter((review) => review.productId === productId)
  },
  async getImageById(imageId: number): Promise<Image | null> {
    const image = images.find((image) => image.id === imageId)
    return image ?? null
  },
  async getImageBySlug(imageSlug: string): Promise<Image | null> {
    const image = images.find((image) => image.slug === imageSlug)
    return image ?? null
  },
  async getAttributeById(attributeId: number): Promise<Attribute | null> {
    const attribute = attributes.find((attribute) => attribute.id === attributeId)
    return attribute ?? null
  },
}
