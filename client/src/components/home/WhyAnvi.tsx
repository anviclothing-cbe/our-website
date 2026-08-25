import { Check, Sparkles, Feather, Heart } from "lucide-react"

const PRINCIPLES = [
  {
    icon: <Sparkles className="w-6 h-6 stroke-[1.5]" />,
    title: "Handpicked",
    description: "Every piece is chosen with intention.",
  },
  {
    icon: <Feather className="w-6 h-6 stroke-[1.5]" />,
    title: "Comfort",
    description: "Beautiful should still feel effortless.",
  },
  {
    icon: <Check className="w-6 h-6 stroke-[1.5]" />,
    title: "Quality",
    description: "Selected with quality and wearability in mind.",
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[1.5]" />,
    title: "Value",
    description: "Thoughtful fashion without unnecessary pricing.",
  },
]

export function WhyAnvi() {
  return (
    <section className="w-full bg-surface py-16 md:py-24 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-text-primary mb-4">
                {principle.icon}
              </div>
              <h3 className="font-serif text-xl text-text-primary font-semibold mb-2">{principle.title}</h3>
              <p className="text-text-muted text-sm max-w-[220px] mx-auto">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
