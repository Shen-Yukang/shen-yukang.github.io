const imageModules = import.meta.glob('../assets/imgs/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const videoModules = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const docModules = import.meta.glob('../assets/docs/*.pdf', {
  eager: true,
  import: 'default',
}) as Record<string, string>

// 约定：文件名（不含后缀）作为 key，比如 result.png -> result
export function getImageUrlByKey(key: string): string | undefined {
  // ../assets/imgs/result.png
  const entry = Object.entries(imageModules).find(([path]) =>
    path.endsWith(`/imgs/${key}.png`),
  )
  return entry?.[1] // 这里就是打包后的真实 URL
}

// 约定：文件名（不含后缀）作为 key，比如 result.png -> result
export function getVideoUrlByKey(key: string): string | undefined {
  // ../assets/videos/result.mp4
  const entry = Object.entries(videoModules).find(([path]) =>
    path.endsWith(`/videos/${key}.mp4`),
  )
  return entry?.[1] // 这里就是打包后的真实 URL
}

// 约定：文件名（不含后缀）作为 key，比如 result.png -> result
export function getPDFUrlByKey(key: string): string | undefined {
  // ../assets/docs/result.pdf
  const entry = Object.entries(docModules).find(([path]) =>
    path.endsWith(`/docs/${key}.pdf`),
  )
  return entry?.[1] // 这里就是打包后的真实 URL
}