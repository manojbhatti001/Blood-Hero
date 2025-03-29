import { motion } from "framer-motion"

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export const slideIn = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 60, opacity: 0 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function AnimatedSection({ children, className }) {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  )
} 