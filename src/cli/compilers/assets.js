import fs from 'fs-promise'
import { getConfig } from '../config'

export async function buildAsset (evt, file) {
  const { source, output, assets } = getConfig()

  const outputFile = file
    /* send file to output dir */
    .replace(source, output)
    /* flatten out assets dir */
    .replace(new RegExp(`/${assets}/`), '/')

  switch (evt) {
    case 'add':
    case 'change':
      await fs.exists(file)
        ? await fs.copy(file, outputFile)
        : await fs.writeFile(outputFile, file)
      break
    case 'unlink':
      await fs.remove(outputFile)
      break
  }
}
