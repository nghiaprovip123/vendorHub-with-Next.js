import { cn } from "@/lib/utils"

type Props = {
  imageUrl: string
  caption: string
  className?: string
}

export default function ImageCard({ imageUrl, caption, className }: Props) {
  return (
    <figure
      className={cn(
        "w-[150px] overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all",
        className,
      )}
    >
      <img className="w-full aspect-4/3" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-main-foreground border-border p-4 font-semibold">
        {caption}
      </figcaption>
    </figure>
  )
}
