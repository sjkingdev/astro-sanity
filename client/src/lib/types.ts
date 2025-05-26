export type Page = {
  _id: string
  title: string
  slug: { current: string }
  seo?: any
  content: any[] // or a more specific type for Portable Text
}
