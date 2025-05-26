import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { toHTML } from '@portabletext/to-html'

export const sanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export function portableTextToHtml(content: any[]) {
  return toHTML(content, {
    components: {
      marks: {
        link: ({children, value}) => {
          const target = value?.blank ? ' target="_blank" rel="noopener noreferrer"' : ''
          return `<a href="${value?.href}"${target}>${children}</a>`
        }
      },
      types: {
        image: ({value}) => {
          const imageUrl = urlFor(value).width(800).url()
          return `<img src="${imageUrl}" alt="${value.alt || ''}" class="w-full h-auto rounded-lg my-6" />`
        }
      }
    }
  })
}

// Query helpers
export async function getAllPages() {
  return await sanityClient.fetch(`
    *[_type == "page"]{
      _id,
      title,
      slug,
      seo,
      content
    }
  `)
}

export async function getPageBySlug(slug: string) {
  return await sanityClient.fetch(`
    *[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      seo,
      content
    }
  `, { slug })
}