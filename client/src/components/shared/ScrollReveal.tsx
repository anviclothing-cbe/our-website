import React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
}

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  yOffset = 30 
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : yOffset 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom smooth ease-out matching the rest of the site
      }}
    >
      {children}
    </motion.div>
  )
}
