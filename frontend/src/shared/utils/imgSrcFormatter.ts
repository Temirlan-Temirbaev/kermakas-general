export default function FormatImageSrc(src: string): string {
  return src.includes(process.env.NEXT_PUBLIC_API_BASE_URL as string)
    ? src
    : process.env.NEXT_PUBLIC_API_BASE_URL + src;
}
