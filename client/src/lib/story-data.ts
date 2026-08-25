export interface StoryValue {
  id: string;
  title: string;
  description: string;
}

export interface StoryPhilosophy {
  id: string;
  title: string;
  description: string;
}

export interface BrandStory {
  hero: {
    heading: string;
    subheading: string;
    image: string;
  };
  founder: {
    heading: string;
    name: string;
    story: string[];
    image: string;
  };
  origin: {
    heading: string;
    story: string[];
    image: string;
  };
  philosophy: {
    heading: string;
    intro: string;
    pillars: StoryPhilosophy[];
  };
}

export const ANVI_STORY: BrandStory = {
  hero: {
    heading: "More than what you wear.",
    subheading: "A thoughtfully chosen collection of styles made for the women, little ones and everyday moments that matter.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200"
  },
  founder: {
    heading: "A note from Nivetha",
    name: "Nivetha",
    story: [
      "ANVI started with a simple idea — finding beautiful clothes should feel easy.",
      "I wanted to create a place where women could find pieces they genuinely love wearing, whether it's for a workday, a family gathering, a celebration or simply an ordinary day.",
      "Every piece at ANVI is chosen with care. I look for styles that feel beautiful, comfortable and worth reaching for again and again.",
      "What started as a small idea has grown into a space where I can share the styles I love with you.",
      "Thank you for being a part of ANVI."
    ],
    image: "https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=800&auto=format&fit=crop"
  },
  origin: {
    heading: "How ANVI began",
    story: [
      "ANVI began with a love for beautiful Indian clothing and a simple wish — to make good style easier to find. We wanted to build a place where you didn't have to look through hundreds of pieces to find one you love. We wanted to do the looking for you."
    ],
    image: "https://images.unsplash.com/photo-1550614000-4b95d4662247?auto=format&fit=crop&q=80&w=800"
  },
  philosophy: {
    heading: "Why we choose what we choose",
    intro: "Every single piece at ANVI is chosen by asking a few simple questions:",
    pillars: [
      { id: "beauty", title: "Is it beautiful?", description: "It has to look good and feel special." },
      { id: "comfort", title: "Is it comfortable?", description: "You should feel at ease wearing it all day." },
      { id: "quality", title: "Is it good quality?", description: "It needs to be made well and feel good to touch." },
      { id: "worth", title: "Is it worth it?", description: "It should be something you'll want to wear more than once." }
    ]
  }
};
