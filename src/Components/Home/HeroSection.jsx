import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/6e20bb6bf_ee71ce079_generated_553ce91c.jpg';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-transparent to-obsidian/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 max-w-[1600px] mx-auto pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p className="technical-text text-bone/70 mb-4">Summer 2026 Campaign</p>
          <h1 className="display-heading text-bone mb-6 max-w-4xl">
            The Art of<br />
            <span className="italic">Understated</span><br />
            Elegance
          </h1>
          <Link
            to="/collection?category=new"
            className="inline-flex items-center gap-3 group"
          >
            <span className="technical-text text-bone border border-bone/50 px-8 py-4 group-hover:bg-bone group-hover:text-obsidian transition-all duration-500">
              Explore Collection
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
