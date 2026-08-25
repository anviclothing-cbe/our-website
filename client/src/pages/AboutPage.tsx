import { ANVI_STORY } from "@/lib/story-data"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { routes } from "@/lib/routes"
import { ScrollReveal } from "@/components/shared/ScrollReveal"
import { useSEO } from "@/hooks/useSEO"

export default function AboutPage() {
  useSEO({
    title: "About ANVI Clothing | Our Story",
    description: "Learn about the story behind ANVI Clothing. We create beautiful, comfortable, and truly wearable fashion for women and little girls.",
    canonical: "https://anvi.clothing/our-story"
  });
  
  return (
    <div className="w-full flex flex-col items-center bg-surface selection:bg-button-primary selection:text-text-on-dark pb-0">
      
      {/* 1. Hero Section - Editorial Split */}
      <section className="w-full relative min-h-[90vh] flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-5/12 px-6 sm:px-12 lg:pl-24 xl:pl-32 flex flex-col justify-center z-10 pt-16 pb-16 lg:py-24">
          <ScrollReveal>
            <h1 className="text-display text-text-primary mb-8 leading-[1.1] relative">
              <span className="block">{ANVI_STORY.hero.heading.split(' ')[0]}</span>
              <span className="block text-brand-primary">{ANVI_STORY.hero.heading.split(' ').slice(1, 3).join(' ')}</span>
              <span className="block">{ANVI_STORY.hero.heading.split(' ').slice(3).join(' ')}</span>
            </h1>
            <div className="h-[1px] w-16 bg-brand-gold mb-8"></div>
            <p className="text-xl md:text-2xl font-light text-text-muted max-w-md leading-relaxed">
              {ANVI_STORY.hero.subheading}
            </p>
          </ScrollReveal>
        </div>
        
        <div className="w-full lg:w-7/12 min-h-[50vh] lg:min-h-[90vh] relative">
          <ScrollReveal delay={0.2} className="w-full h-full absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-border-subtle z-10 mix-blend-multiply pointer-events-none"></div>
            <img 
              src={ANVI_STORY.hero.image} 
              alt="ANVI Curated Collection" 
              loading="lazy"
              className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Founder Story - Magazine Overlap */}
      <section className="w-full py-24 md:py-40 bg-surface relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-surface-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row items-center">
            
            <ScrollReveal className="w-full lg:w-7/12 aspect-[4/5] lg:aspect-square overflow-hidden z-10 shadow-2xl">
              <img 
                src={ANVI_STORY.founder.image} 
                alt={ANVI_STORY.founder.name} 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="w-full lg:w-6/12 bg-surface border border-surface-accent/20 p-10 md:p-16 shadow-xl z-20 mt-[-10%] lg:mt-0 lg:ml-[-10%] relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary"></div>
              
              <h3 className="text-xs tracking-[0.2em] text-brand-gold uppercase mb-4 font-semibold">
                The Founder
              </h3>
              <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-8 leading-tight">
                {ANVI_STORY.founder.heading}
              </h2>
              
              <div className="space-y-6">
                {ANVI_STORY.founder.story.map((paragraph, index) => (
                  <p key={index} className="text-text-muted text-lg leading-relaxed font-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Origin & Philosophy - Flowing Editorial Sequence */}
      <section className="w-full py-24 md:py-32 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-10">
              {ANVI_STORY.origin.heading}
            </h2>
            <div className="space-y-8">
              {ANVI_STORY.origin.story.map((paragraph, index) => (
                <p key={index} className="text-text-muted text-xl leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-border-subtle">
          <ScrollReveal className="mb-20 lg:text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">
              {ANVI_STORY.philosophy.heading}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-2xl lg:mx-auto">
              {ANVI_STORY.philosophy.intro}
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {ANVI_STORY.philosophy.pillars.map((pillar, index) => (
              <ScrollReveal 
                key={pillar.id} 
                delay={0.1 * index} 
                className="flex flex-col relative pt-8 group"
              >
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full"></div>
                <span className="text-brand-gold/50 font-serif text-5xl mb-4 font-light">0{index + 1}</span>
                <h3 className="font-serif text-2xl text-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-text-muted leading-relaxed font-light text-base">
                  {pillar.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}
