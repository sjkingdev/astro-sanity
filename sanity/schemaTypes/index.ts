import blockContent from './blockContent'
import page from './contentBlocks/pages'
import hero from './contentBlocks/hero'
import textBlock from './contentBlocks/textBlock'
import imageGallery from './contentBlocks/imageGallery'
import contactForm from './contentBlocks/contactForm'

export const schemaTypes = [
  // Documents
  page,
  
  // Content blocks
  hero,
  textBlock,
  imageGallery,
  contactForm,
  
  // Other types
  blockContent,
]