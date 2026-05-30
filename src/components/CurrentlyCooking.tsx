export default function CurrentlyCooking() {
  return (
    <section className="mx-auto w-full max-w-[1040px] px-6 pt-2 pb-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42]">Currently cooking ☺︎</h2>
      </div>
      <p className="max-w-[760px] text-[16px] leading-[1.7] text-[#69645e]">
        Designing something new called{" "}
        <span className="inline-flex translate-y-[3px] items-center gap-1 rounded-md bg-[#fdecea] px-1.5 py-0.5 align-baseline">
          <span aria-hidden className="text-[12px]">❤️</span>
          <span className="font-script text-[20px] leading-none text-[#c0625a]">
            The Uncle Thing
          </span>
        </span>
        . A fun lil app that helps people better self-introspect with guided
        questions &amp; personal AI insights. Stay tuned for our TestFlight. ✈️
      </p>
    </section>
  );
}
