export default function EllipseLoading() {
  return (
    <div className="flex flex-row ml-5 text-2xl text-slate-400 ">
      <span className="block animate-[bounce_1s_infinite]">.</span>
      <span className="block animate-[bounce_1s_0.1s_infinite]">.</span>
      <span className="block animate-[bounce_1s_0.2s_infinite]">.</span>
    </div>
  );
}
