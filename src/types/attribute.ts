interface AttributeOption {
  id: number
  title: string
  value: string
}

export interface Attribute {
  id: number
  name: string
  title: string
  options: AttributeOption[]
}
