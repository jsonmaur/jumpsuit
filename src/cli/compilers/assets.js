import fs from 'fs-promise'
import { CONFIG } from '../config'

export async function buildAsset (evt, file) {
  const { outputDir, assetsDir } = CONFIG

  /* flatten out assets dir */
  const outputFile = file.replace(assetsDir, outputDir)

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
