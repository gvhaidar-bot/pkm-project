"use client";

import { useState } from "react";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      {" "}
      <div className='w-full bg-[url("https://assets.prebuiltui.com/components/hero-section/heroBg.png")] bg-cover bg-center bg-no-repeat pb-20 overflow-hidden'>
        <nav className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <a href="https://prebuiltui.com">
              <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.147-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.147-1.596 3.444-1.596 1.008 0 1.82.364.811.364 1.512 1.176l-2.016 2.072c-.222-.249-.5-.44-.812-.56a3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.81-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.233-.476-2.072a3 3 0 0 0-1.204-1.288q-.757-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504a4.9 4.9 0 0 0 1.904-.364 4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.147-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.87 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.454.924-3.275.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.363 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532.502.532.504 1.316 0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.363 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532"
                  fill="#fff"
                />
                <path
                  d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.94m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.94M29 28.914V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
                  stroke="#fff"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <div
              id="menu"
              className={`${mobileOpen ? "max-lg:w-full" : "max-lg:w-0"} max-lg:fixed max-lg:top-0 max-lg:z-50 max-lg:left-0 max-lg:transition-all max-lg:duration-300 max-lg:overflow-hidden max-lg:h-screen max-lg:bg-black/50 max-lg:backdrop-blur max-lg:flex-col max-lg:justify-center flex items-center gap-10 text-sm ml-auto lg:ml-8 xl:ml-24`}
            >
              <a href="#" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/75 font-medium tracking-[-0.02em]">
                Solutions
              </a>
              <a href="#" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/75 font-medium tracking-[-0.02em]">
                Features
              </a>
              <a href="#" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/75 font-medium tracking-[-0.02em]">
                Resources
              </a>
              <a href="#" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/75 font-medium tracking-[-0.02em]">
                Pricing
              </a>

              <button id="close-menu" onClick={() => setMobileOpen(false)} className="lg:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-4 lg:gap-6 text-sm">
              <button className="text-white tracking-[-0.02em] font-medium border border-zinc-700 hover:bg-zinc-900 px-6 py-2.5 rounded-lg cursor-pointer">Log in</button>
              <button className="flex items-center justify-center gap-1 bg-[#DEECBF] text-black tracking-[-0.02em] font-medium px-4 py-2.5 rounded-lg transition cursor-pointer group">
                Book a Demo
                <svg className="transition-transform duration-200 group-hover:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m9 18 6-6-6-6" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <button id="open-menu" onClick={() => setMobileOpen(true)} className="lg:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="px-4 md:px-0 md:pl-16 lg:pl-24 xl:pl-32 mt-30 md:mt-48 w-full max-md:flex max-md:flex-col max-md:items-center">
          <div className="flex flex-wrap items-center justify-center gap-2 pl-3 pr-4 py-2.5 rounded-full border border-zinc-700 w-fit">
            <div className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#DEECBF]/90 opacity-75 animate-ping duration-300"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[#DEECBF]"></span>
            </div>
            <p className="text-xs text-white flex items-center gap-1.5">
              AI-DRIVEN <div className="size-1 rounded-full bg-white"></div>FUTURE-FOCUSED
            </p>
          </div>

          <h1 className="text-white font-medium text-[40px] md:text-[70px]/21 leading-tight max-w-163.75 mt-8 max-md:text-center">
            Intelligent Solutions. <span className="text-[#DEECBF]">Meaningful Impact.</span>
          </h1>

          <p className="text-white text-sm md:text-base/6 max-w-121 mt-4 max-md:text-center max-md:px-2">We help forward-thinking companies harness the power of AI and automation to transform ideas into measurable results.</p>

          <div className="flex max-sm:flex-col items-center justify-center md:justify-start gap-5 mt-10 w-full sm:w-fit">
            <button className="flex items-center justify-center max-sm:w-full gap-2 bg-[#DEECBF] text-black font-medium tracking-[-0.02em] px-5 py-2.5 rounded-lg transition cursor-pointer group">
              Explore Solutions
              <svg className="transition-transform duration-200 group-hover:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m9 18 6-6-6-6" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button className="flex items-center justify-center max-sm:w-full gap-3 max-md:bg-linear-to-r from-[#0E1617] to-[#1B2423] text-white tracking-[-0.02em] font-medium border border-zinc-700 hover:border-zinc-500 px-5 py-2.5 rounded-lg cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.583 17.917a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.667 7.667a.667.667 0 0 1 1.002-.576l4 2.333a.667.667 0 0 1 0 1.152l-4 2.333a.666.666 0 0 1-1.002-.575z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Watch Overview
            </button>
          </div>

          <div className="bg-linear-to-r from-[#0E1617] to-[#1B2423] border border-[#3D493E] p-6 md:px-8 md:py-6 rounded-2xl w-full sm:w-fit mt-16 md:mt-20 grid grid-cols-2 md:flex md:flex-row items-start md:items-center gap-y-7 gap-x-4 md:gap-8">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="size-12 md:size-14 rounded-full bg-[#1B2423] border border-[#3D493E] flex shrink-0 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DEECBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-white text-2xl md:text-[28px] leading-none tracking-tight">10K+</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-none">Happy Clients</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-13 bg-[#3D493E]/50"></div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="size-12 md:size-14 rounded-full bg-[#1B2423] border border-[#3D493E] flex shrink-0 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 13.999a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02a1 1 0 0 0 .94 1.35h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02a1 1 0 0 0-.94-1.35z"
                    stroke="#deecbf"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-white text-2xl md:text-[28px] leading-none tracking-tight">98%</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-none">Process Efficiency</p>
              </div>
            </div>
            {/* Stat 3 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="size-12 md:size-14 rounded-full bg-[#1B2423] border border-[#3D493E] flex shrink-0 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7h6v6" stroke="#deecbf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" stroke="#deecbf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-white text-2xl md:text-[28px] leading-none tracking-tight">2.5x</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-none">Average ROI</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-13 bg-[#3D493E]/50"></div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="size-12 md:size-14 rounded-full bg-[#1B2423] border border-[#3D493E] flex shrink-0 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                    stroke="#deecbf"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="m9 12 2 2 4-4" stroke="#deecbf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <h3 className="text-white text-base md:text-xl leading-none tracking-tight">Enterprise</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-none">Grade Security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
