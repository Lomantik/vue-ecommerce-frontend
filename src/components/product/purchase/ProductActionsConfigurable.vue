<script setup lang="ts">
import ProductQuantity from '@/components/ui/ProductQuantity.vue'
import { getProductAttributes, getProductById, getProductVariants } from '@/api/products.api.js'
import type { Product, ProductVariant } from '@/types/product.ts'
import { computed, reactive, ref, watch } from 'vue'
import type { Attribute } from '@/types/attribute.ts'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(['variant-change'])

const selectedOptions = reactive<Record<string, string>>({})
const variants = ref<ProductVariant[]>([])
const attributes = ref<Attribute[]>([])
const availableOptions = computed(() => {
  const result: Record<string, Set<string>> = {}
  for (const attribute of attributes.value) {
    result[attribute.name] = new Set<string>()
  }
  for (const attribute of attributes.value) {
    for (const option of attribute.options) {
      const match = variants.value.some((allowedVariant) => {
        const testedVariant = { ...selectedOptions }
        testedVariant[attribute.name] = option.value
        return Object.entries(testedVariant).every(([attrName, attrValue]) => {
          if (attrValue === '') return true
          return attrValue === allowedVariant[attrName]
        })
      })
      if (match) {
        result[attribute.name]?.add(option.value)
      }
    }
  }
  return result
})

function isOptionAvailable(attrName: string, value: string) {
  return availableOptions.value[attrName]?.has(value)
}

const variantProducts = ref<Product[]>([])

const selectedVariantProduct = computed(() => {
  return variantProducts.value.find(
    (prod) =>
      prod.id ===
      variants.value.find((variant) =>
        Object.entries(selectedOptions).every(
          ([attrName, optValue]) => optValue === variant[attrName],
        ),
      )?.id,
  )
})

watch(
  () => props.product,
  async (product) => {
    variants.value = await getProductVariants(product.id)
    attributes.value = await getProductAttributes(product.id)
    variantProducts.value = (
      await Promise.all(product.variantIds.map(async (id) => await getProductById(id)))
    ).filter((p): p is Product => p !== null)
    if (product.defaultVariantId) {
      const defaultVariant = variants.value.find(
        (variant) => variant.id === product.defaultVariantId,
      )
      if (defaultVariant) {
        attributes.value.forEach((attribute) => {
          if (typeof defaultVariant[attribute.name] === 'string')
            selectedOptions[attribute.name] = defaultVariant[attribute.name] as string
        })
      }
    } else attributes.value.forEach((attribute) => (selectedOptions[attribute.name] = ''))
  },
  { immediate: true },
)

const qty = ref<number>(1)

const notAllOptionsSelected = computed(() => {
  return Object.values({ ...selectedOptions }).some((val) => val === '')
})

const zeroQty = computed(() => {
  return Number(qty.value) === 0
})

const handlePurchase = () => {
  if (zeroQty.value) {
    alert('Please set quantity greater than 0 before adding this product to your cart.')
  } else if (notAllOptionsSelected.value) {
    alert('Please select some product options before adding this product to your cart.')
  } else {
    alert(
      `Product added to cart!\nconfigurable_id = ${props.product.id}; simple_id = ${selectedVariantProduct?.value?.id}; qty = ${qty.value}`,
    )
  }
}

const purchaseDisabled = computed(() => {
  return notAllOptionsSelected.value || zeroQty.value
})

watch(
  () => selectedVariantProduct?.value,
  (product) => {
    emit('variant-change', product)
  },
)
</script>

<template>
  <div class="product-actions-configurable">
    <form class="product-actions-configurable__form">
      <fieldset
        class="product-actions-configurable__group"
        v-for="attribute in attributes"
        :key="attribute.id"
      >
        <label :for="attribute.name" class="product-actions-configurable__group-label">{{
          attribute.title
        }}</label>
        <select
          :id="attribute.name"
          class="product-actions-configurable__group-select form-select"
          v-model="selectedOptions[attribute.name]"
        >
          <option value="">Choose an option</option>
          <option
            :value="option.value"
            v-for="option in attribute.options"
            :key="option.id"
            :disabled="!isOptionAvailable(attribute.name, option.value)"
          >
            {{ option.title }}
          </option>
        </select>
      </fieldset>
    </form>
    <div class="product-actions-configurable__wrapper row">
      <div class="col-auto"><ProductQuantity :min-qty="1" v-model="qty" /></div>
      <div class="col">
        <button
          class="product-actions-configurable__button btn btn-primary"
          :class="{ 'product-actions-configurable__button--disabled': purchaseDisabled }"
          @click="handlePurchase"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:color';

.product-actions-configurable {
  &__form {
    margin-bottom: pxtorem(15px);
  }
  &__group {
    padding-bottom: pxtorem(20px);
    &-label {
      font-size: pxtorem(12px);
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: pxtorem(10px);
    }
    &-select {
      max-width: 450px;
      padding: pxtorem(0 15px);
      font-size: pxtorem(13px);
      line-height: 1.15;
      height: 46px;
      border-radius: 6px;
      box-shadow: none !important;
      cursor: pointer;
      border: 1px solid color.adjust(color-token(form-border), $alpha: -0.8) !important;
    }
  }
  &__wrapper {
    --bs-gutter-x: 10px;
  }
  &__button {
    text-transform: uppercase;
    width: auto;
    @include media-breakpoint-up(lg) {
      width: 280px;
    }
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
