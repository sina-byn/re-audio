// * types
type GridProps = { rows?: number; columns?: number };

const Grid = ({ rows = 16, columns = 80 }: GridProps) => {
  const dots = Array.from({ length: columns }, (_, colIndex) =>
    Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={`r-${rowIndex}-c${colIndex}`}
        className='dot block size-1 bg-white/25 rounded-full'
      />
    ))
  );

  return (
    <div className='wrapper stack justify-items-center w-full h-[600px] overflow-hidden pt-4'>
      <div
        className='grid justify-items-center gap-6 size-fit'
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {dots}
      </div>
      <div className='overlay-gradient size-full z-10' />
    </div>
  );
};

export default Grid;
