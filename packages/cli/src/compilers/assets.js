import fs from 'fs-promise'
import { CONFIG } from '../utils/config'
import { convertIfWin32Path } from '../utils/common'

export async function buildAsset (evt, file) {
  file = convertIfWin32Path(file)
  const { outputDir, assetsDir, sourceDir } = CONFIG

  /* flatten out assets dir */
  let outputFile

  if (file.indexOf(assetsDir) > -1) {
    outputFile = file.replace(assetsDir, outputDir)
  } else {
    outputFile = file.replace(sourceDir, outputDir)
  }

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
