export default function Logo() {
  return (
    <h2 className="flex items-center pl-4 text-2xl font-bold">
      <div className="relative text-primary">
        <div className="absolute -left-[14px] top-1/2 flex -translate-y-1/2 flex-col items-end justify-end gap-[1px]">
          <span className="block h-[5px] w-4 translate-x-[4px] rounded-l-lg rounded-tr-none border-b-1 border-background bg-primary-500"></span>
          <span className="block h-[4px] w-4 rounded-l-lg bg-primary-500"></span>
          <span className="block h-[5px] w-4 translate-x-[3.3px] rounded-l-lg rounded-tr-none border-t-1 border-background bg-primary-500"></span>
        </div>
        <span>Go</span>
      </div>
      Sprint
    </h2>
  );
}
