
import { Leaf } from "lucide-react";
import Button from "../components/Button";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";

function Home({ onStart, onJournal }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#17271b] text-[#f0f0df]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-[#142218]/45" />

      <div className="relative z-10">
     <Navbar onJournal={onJournal} />

        <section className="relative mx-auto flex min-h-[78vh] max-w-350 items-center px-6 py-16 md:px-16 lg:px-24">
          {/* Decorative doodles */}
          <motion.div
            animate={{ rotate: [0, 5, -3, 0], y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="pointer-events-none absolute right-[12%] top-[8%] hidden text-[#b8ca9d]/70 md:block"
          >
            <Leaf size={100} strokeWidth={0.7} />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -8, 4, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="pointer-events-none absolute bottom-[10%] right-[42%] hidden text-[#a4bb89]/50 md:block"
          >
            <Leaf size={54} strokeWidth={0.8} />
          </motion.div>

          {/* Main heading */}
          <div className="relative z-10 max-w-3xl">
           

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(68px,9vw,120px)] font-medium leading-[0.88] tracking-[-0.075em] font-['DM_Sans',sans-serif]"
            >
              Look
              <br />
              <span className="text-[#b7cc99]">again.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-7 max-w-xs text-sm leading-6 text-[#d0d9c6]"
            >
              The world is full of little things you've never noticed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8"
            >
              <Button onClick={onStart} size="lg">
                Start noticing
              </Button>
            </motion.div>
          </div>

          {/* Botanical illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute bottom-5 right-[5%] hidden w-[42%] max-w-125 md:block lg:right-[8%]"
          >
            <svg viewBox="0 0 440 480" fill="none" className="w-full">
              <ellipse
                cx="232"
                cy="425"
                rx="150"
                ry="20"
                fill="#080F09"
                opacity=".25"
              />

              {/* Pot */}
              <path
                d="M154 320 L180 422 Q228 445 276 422 L302 320Z"
                fill="#B6A786"
              />
              <path
                d="M154 320 Q228 339 302 320 L298 339 Q228 357 158 339Z"
                fill="#D3C6A4"
              />
              <path
                d="M180 365 L193 415"
                stroke="#8F8065"
                strokeWidth="2"
                opacity=".5"
              />
              <path
                d="M276 365 L265 415"
                stroke="#8F8065"
                strokeWidth="2"
                opacity=".5"
              />

              {/* Stems */}
              <path
                d="M226 329 Q208 235 145 165"
                stroke="#A6BF83"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M228 330 Q241 214 300 145"
                stroke="#A6BF83"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M226 330 Q170 250 210 115"
                stroke="#A6BF83"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M230 330 Q285 256 276 213"
                stroke="#A6BF83"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Leaves */}
              <path
                d="M145 165 Q57 161 77 84 Q154 88 145 165Z"
                fill="#708F60"
                stroke="#B6CA99"
                strokeWidth="1.5"
              />
              <path
                d="M145 165 L98 103"
                stroke="#B6CA99"
                strokeWidth="1.5"
              />

              <path
                d="M300 145 Q335 53 387 91 Q386 158 300 145Z"
                fill="#88A675"
                stroke="#C6D7AE"
                strokeWidth="1.5"
              />
              <path
                d="M300 145 L370 103"
                stroke="#C6D7AE"
                strokeWidth="1.5"
              />

              <path
                d="M210 115 Q157 35 221 20 Q265 66 210 115Z"
                fill="#A5BC88"
                stroke="#D1DDBD"
                strokeWidth="1.5"
              />
              <path
                d="M210 115 L218 36"
                stroke="#D1DDBD"
                strokeWidth="1.5"
              />

              <path
                d="M276 213 Q350 173 366 230 Q333 287 276 213Z"
                fill="#637F53"
                stroke="#B6CA99"
                strokeWidth="1.5"
              />
              <path
                d="M276 213 L352 233"
                stroke="#B6CA99"
                strokeWidth="1.5"
              />

              <path
                d="M226 268 Q130 233 150 178 Q225 186 226 268Z"
                fill="#8EA976"
                stroke="#C6D7AE"
                strokeWidth="1.5"
              />
              <path
                d="M226 268 L169 193"
                stroke="#C6D7AE"
                strokeWidth="1.5"
              />

              {/* Tiny floating stars */}
              <path
                d="M86 226 L91 239 L104 244 L91 249 L86 262 L81 249 L68 244 L81 239Z"
                fill="#D7E0B8"
              />
              <circle cx="352" cy="316" r="4" fill="#D7E0B8" />
              <circle cx="115" cy="56" r="3" fill="#D7E0B8" />
              <path
                d="M344 52 Q355 39 366 52 Q355 65 344 52Z"
                stroke="#D7E0B8"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>

          {/* Mobile doodle */}
          <div className="pointer-events-none absolute bottom-5 right-4 opacity-20 md:hidden">
            <Leaf size={110} strokeWidth={0.7} />
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-[#e0e8d4]/15 px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-[#c1d0ad]/80 md:px-16">
          <span>A practice in noticing</span>
          <span className="flex items-center gap-2">
            <Leaf size={13} />
            Slow down · Look closer
          </span>
        </footer>
      </div>
    </main>
  );
}

export default Home;
