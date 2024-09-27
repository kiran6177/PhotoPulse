import React, { useState } from "react";
import ImageBox from "./ImageBox";
import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";

function ImageManipulation({images,setImages}) {
  const [active,setActive] = useState(null);

    const handleImageTitle = (e,index) => {
        const updated = [...images]
        updated[index].imageTitle = e.target.value;
        setImages(updated)
      }
    
      const handleSwapOrder = (event) => {
        console.log(event);
        setActive(null)
        const { active , over } = event;
        if(!over) return;
    
        if(active.id !== over.id){
            const newOrder = [...images];
            console.log(newOrder);
            [newOrder[active.id-1],newOrder[over.id-1]] = [newOrder[over.id-1],newOrder[active.id-1]];
            setImages(newOrder)
        }
      }
  return (
    <DndContext
      onDragStart={(e) => setActive(e.active.id)}
      collisionDetection={closestCorners}
      onDragEnd={handleSwapOrder}
    >
      <div className="grid gap-2  sm:grid-cols-2 md:grid-cols-4 ">
        <SortableContext items={images} strategy={rectSwappingStrategy}>
          {images?.map((image, index) => {
            return (
              <ImageBox
                handleImageTitle={handleImageTitle}
                images={images}
                url={image.imageUrl}
                key={index}
                index={index}
              />
            );
          })}
        </SortableContext>
        <DragOverlay
          dropAnimation={{
            duration: 300,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {active && (
            <ImageBox
              handleImageTitle={handleImageTitle}
              images={images}
              url={images[active - 1].imageUrl}
              index={active - 1}
            />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default ImageManipulation;
