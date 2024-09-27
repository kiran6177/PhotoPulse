import React, { useState } from "react";
import ImageBox from "./ImageBox";
import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";

function ImageManipulation({ images, setImages , setDeleted}) {
  const [active, setActive] = useState(null);

  const handleImageTitle = (e, index) => {
    const updated = [...images];
    updated[index].title = e.target.value;
    setImages(updated);
  };

  const handleRemoveImage = (e, index) => {
    const updated = [...images];
    if(setDeleted){
      // console.log(updated,index,updated[parseInt(index)]?._id);
      
      setDeleted(prev=>{
        return [...prev,updated[parseInt(index)]?._id]
      })
    }
    updated.splice(index,1)
    setImages(updated);
  };

  const handleSwapOrder = (event) => {
    console.log(event);
    setActive(null);
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const newOrder = [...images];
      console.log(newOrder);
      [newOrder[active.id - 1], newOrder[over.id - 1]] = [
        newOrder[over.id - 1],
        newOrder[active.id - 1],
      ];
      setImages(newOrder);
    }
  };
  return (
    <DndContext
      onDragStart={(e) => setActive(e.active.id)}
      collisionDetection={closestCorners}
      onDragEnd={handleSwapOrder}
    >
      <div className="grid gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <SortableContext items={images} strategy={rectSwappingStrategy}>
          {images?.map((image, index) => {
            return (
              <ImageBox
                handleRemoveImage={handleRemoveImage}
                handleImageTitle={handleImageTitle}
                images={images}
                url={image.url}
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
              handleRemoveImage={handleRemoveImage}
              handleImageTitle={handleImageTitle}
              images={images}
              url={images[active - 1].url}
              index={active - 1}
            />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default ImageManipulation;
