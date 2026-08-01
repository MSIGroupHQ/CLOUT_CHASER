import Image from "next/image";
import { MintPassport } from "./MintPassport";

export function LeeTwinsSpotlight() {
  return (
    <section className="lee-twins-spotlight py-16 px-6 max-w-6xl mx-auto border-t border-white/10 my-12 bg-[#06060c] rounded-3xl border border-[#00f0ff]/20 shadow-2xl">
      {/* HANGUL BILLBOARD SIGNAGE */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
          SOUTH KOREAN CULT GUEST DUO • 이_트윈스$ • FANDOM: THE MINT [$MNT]
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight font-mono">
          ◆ 이 트 윈 스 ◆
        </h2>
        <div className="text-xl font-bold text-[#00f0ff] tracking-widest mt-1">
          [ 이태양 x 이지지 ] — L E E T W I N S $
        </div>
        <p className="text-sm font-mono text-white/60 mt-3 max-w-xl mx-auto italic">
          &quot;Don&apos;t call us &apos;the twins&apos;... it&apos;s 주_이트윈스$ (L-e-e-e Twins).&quot;
        </p>
      </div>

      {/* MEMBER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* CECEE - THE FOUNDER */}
        <div className="bg-[#0a0a14] border border-[#ff2d95]/40 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-black border border-white/10">
            <Image
              src="/media/brand/CloutChaser/generate-one-single-image-of-the-same-white-bunny.webp"
              alt="Cecee - Agency Owner"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-2 left-2 bg-[#ff2d95] text-black font-extrabold text-[10px] font-mono px-2 py-0.5 rounded-full uppercase">
              FOUNDER &amp; OWNER
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">CECEE</h3>
            <p className="text-xs font-mono text-[#ff2d95] mb-2">Owner of Clout Studio &amp; Brother K&apos;s Sister</p>
            <p className="text-xs text-white/60 leading-relaxed">
              Pure white rabbit. Holds 100% equity, contracts, and agency charter. Quiet ultimate authority.
            </p>
          </div>
        </div>

        {/* TAEYANG LEE */}
        <div className="bg-[#0a0a14] border border-[#00f0ff]/40 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-black border border-white/10">
            <Image
              src="/media/brand/CloutChaser/grey_rabbit_kachina_jersey.webp"
              alt="Taeyang Lee"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-2 left-2 bg-[#00f0ff] text-black font-extrabold text-[10px] font-mono px-2 py-0.5 rounded-full uppercase">
              이태양 (Sun Lee) ☀️
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">TAEYANG LEE (이태양)</h3>
            <p className="text-xs font-mono text-[#00f0ff] mb-2">LEE_TWINS$ Co-Lead • Sleek Silver Grey</p>
            <p className="text-xs text-white/60 leading-relaxed">
              Interrupts deadpan whenever anyone says &quot;the twins&quot;: <span className="text-[#00f0ff] font-bold">&quot;L-e-e-e Twins!&quot;</span> (이~~~트윈스).
            </p>
          </div>
        </div>

        {/* GIGI LEE */}
        <div className="bg-[#0a0a14] border border-[#00f0ff]/40 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-black border border-white/10">
            <Image
              src="/media/brand/CloutChaser/feminine_rabbit_vaporwave.webp"
              alt="Gigi Lee"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-2 left-2 bg-[#00f0ff] text-black font-extrabold text-[10px] font-mono px-2 py-0.5 rounded-full uppercase">
              이지지 (Clever Lee) ⚡
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">GIGI LEE (이지지)</h3>
            <p className="text-xs font-mono text-[#00f0ff] mb-2">LEE_TWINS$ Hype Enforcer • Soft Grey</p>
            <p className="text-xs text-white/60 leading-relaxed">
              Background hype &amp; contract enforcer: <span className="text-[#00f0ff] font-bold">&quot;💵 Lee_Twins$! 💵 Check the spelling on the contract, bro.&quot;</span>
            </p>
          </div>
        </div>
      </div>

      {/* THE MINT [$MNT] PASSPORT DEMO SECTION */}
      <div className="mb-12">
        <h3 className="text-center text-lg font-extrabold text-white mb-2 tracking-tight">
          THE MINT // FANDOM PASSPORT GENERATOR [$MNT]
        </h3>
        <p className="text-center text-xs font-mono text-white/50 mb-6 max-w-md mx-auto">
          &quot;We print the green, they eat the green.&quot; — Cryptographically verified via BBS Merkle tree proofs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MintPassport username="SolarFanatic" tier="Solar" mintNumber={88} />
          <MintPassport username="ThumperElite" tier="Thumper" mintNumber={104} />
        </div>
      </div>

      {/* PRESS CONFERENCE SKIT RECORD */}
      <div className="bg-[#0b0c16] border border-white/10 rounded-2xl p-6 font-mono text-xs text-white/80 leading-relaxed">
        <div className="text-sm font-bold text-[#00f0ff] mb-3 flex items-center gap-2">
          <span>🎤 PRESS CONFERENCE TRANSCRIPT — SEOUL DEBUT</span>
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
        </div>
        <div className="space-y-3">
          <p><span className="text-white/40">Reporter:</span> &quot;Yeah, hi, a question for the twins—&quot;</p>
          <p><span className="text-[#00f0ff] font-bold">Taeyang:</span> (Leans directly into the mic, deadpan) &quot;L-e-e-e Twins.&quot;</p>
          <p><span className="text-[#ff2d95] font-bold">Gigi:</span> (Whispering sharply from background) &quot;💵 Lee_Twins$! 💵&quot;</p>
          <p><span className="text-white/40">Reporter:</span> &quot;Right, sorry. So for the... Lee Twins... how do you handle the pressure of—&quot;</p>
          <p><span className="text-[#00f0ff] font-bold">Taeyang:</span> (Interrupting, elongating further) &quot;이~~~트윈스 (Ee-e-e-teu-win-seu).&quot;</p>
          <p><span className="text-[#ff2d95] font-bold">Gigi:</span> (Thumps back leg like a bass drop) &quot;Check the spelling on the contract, bro.&quot;</p>
          <p><span className="text-white/40">Reporter:</span> &quot;My apologies! For the international superstars, LEE_TWINS$... what is the secret to your dynamic bond?&quot;</p>
          <p><span className="text-[#00f0ff] font-bold">Taeyang:</span> &quot;Much better. The secret is simple: we look expensive, we sound expensive, and we never share our cilantro.&quot;</p>
          <p><span className="text-[#ff2d95] font-bold">Gigi:</span> (Lean-back pose) &quot;Facts. Next question.&quot;</p>
        </div>
      </div>
    </section>
  );
}
