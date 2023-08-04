interface Props { 
    quantity: number;
}

export const CardItemSkeleton = ({quantity}: Props) => {
    const skeletonItems = [];
  
    for (let i = 0; i < quantity; i++) {
      skeletonItems.push(
        <div
          key={i}
          className="w-full lg:w-[170px] h-[255px] bg-white border rounded-xl animate-pulse"
        />
      );
    }
  
    return (
      <div id="content" className="grid md:grid-cols-3 w-full lg:grid-cols-6 gap-8">
        {skeletonItems}
      </div>
    );
  };