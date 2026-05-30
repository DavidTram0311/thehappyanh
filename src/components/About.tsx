export default function About() {
  return (
    <section className="mx-auto w-full max-w-[1040px] px-6 py-12">
      <div className="md:pl-10">
        <h2 className="mb-6 text-[24px] font-medium text-[#3e3e42]">About ⌘</h2>

        <div className="max-w-[760px] space-y-4 text-[16px] leading-[1.7] text-[#69645e]">
          <p>
            I&apos;m a product designer(she/her) who loves crafting meaningful
            interactions and bringing fun ideas to life. Currently based in Paris,
            France.
          </p>
          <p>
            While I value the aesthetic and emotional aspects of design, my recent
            work has centered on leveraging design psychology to achieve measurable
            user and business outcomes.
          </p>
          <p>
            Before relocating to France, I earned my Master&apos;s in
            Human-Computer Interaction from Carnegie Mellon University and a B.S. in
            Interactive Media Arts from NYU Shanghai.
          </p>
          <p>I design to make people smile ☺.</p>
        </div>

        <p className="mt-8 text-[14px] text-[#8f8d8c]">
          <a
            href="https://www.linkedin.com/in/jackiehu-design/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 transition-colors hover:text-[#3e3e42] hover:underline"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a
            href="https://x.com/itsjackiehu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 transition-colors hover:text-[#3e3e42] hover:underline"
          >
            Twitter (x)
          </a>{" "}
          | E-mail:{" "}
          <a
            href="mailto:jackiehu.design@gmail.com"
            className="underline-offset-2 transition-colors hover:text-[#3e3e42] hover:underline"
          >
            jackiehu.design@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
