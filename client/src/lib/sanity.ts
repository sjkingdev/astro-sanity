import dotenv from 'dotenv'
dotenv.config()


import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { toHTML } from '@portabletext/to-html'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Set to false for development, true for production
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// export function portableTextToHtml(content: any[]) {
//   if (!content) return ''
  
//   return toHTML(content, {
//     components: {
//       marks: {
//         link: ({children, value}) => {
//           const target = value?.blank ? ' target="_blank" rel="noopener noreferrer"' : ''
//           return `<a href="${value?.href}"${target}>${children}</a>`
//         }
//       },
//       types: {
//         image: ({value}) => {
//           const imageUrl = urlFor(value).width(800).url()
//           return `<img src="${imageUrl}" alt="${value.alt || ''}" class="w-full h-auto rounded-lg my-6" />`
//         }
//       }
//     }
//   })
// }

export function portableTextToHtml(content: any[]) {
  if (!content) return ''

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
        },
        hero: ({value}) => {
          return `
            <section style="text-align: ${value.textAlign}; position: relative; height: ${value.height === 'large' ? '400px' : '200px'};">
              ${value.overlay?.enabled ? `<div style="background-color: ${value.overlay.color}; opacity: ${value.overlay.opacity}; position: absolute; inset: 0;"></div>` : ''}
              <h1>${value.title}</h1>
              <h2>${value.subtitle}</h2>
            </section>
          `
        }
      }
    }
  })
}


// Query helpers
export async function getAllPages() {
  try {
    return await sanityClient.fetch(`
      *[_type == "page"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        seo,
        content[] {
          _type,
          _key,
          ...,
          "backgroundImage": backgroundImage {
            ...,
            asset->
          },
          "images": images[] {
            ...,
            "image": image {
              ...,
              asset->
            }
          }
        }
      }
    `)
  } catch (error) {
    console.error('Error fetching all pages:', error)
    return []
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await sanityClient.fetch(`
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        seo {
          ...,
          "ogImage": ogImage {
            ...,
            asset->
          }
        },
        content[] {
          _type,
          _key,
          ...,
          "backgroundImage": backgroundImage {
            ...,
            asset->
          },
          "images": images[] {
            ...,
            "image": image {
              ...,
              asset->
            }
          }
        }
      }
    `, { slug })
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error)
    return null
  }
}

// Additional helper for debugging
export async function testConnection() {
  try {
    const result = await sanityClient.fetch('*[_type == "page"][0...3]')
    console.log('Sanity connection test:', result)
    return result
  } catch (error) {
    console.error('Sanity connection failed:', error)
    return null
  }
}

