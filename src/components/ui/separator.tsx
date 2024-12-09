export default function Separator({ height }: { height?: string }) {
  height = height ?? 'h-4';

  return (
    <div
      role="none"
      className={'shrink-0 w-[1px] bg-slate-200 inline-block mx-2 ' + height}
    ></div>
  );
}
