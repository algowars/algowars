import Card from "../Card";

const CardSkeleton = () => {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="w-64 h-4 rounded animate-pulse bg-slate-100"></div>
          <div className="w-24 h-4 rounded animate-pulse bg-slate-100"></div>
        </div>

        <div className="w-48 h-4 rounded animate-pulse bg-slate-100"></div>
      </div>
    </Card>
  );
};

export default CardSkeleton;
