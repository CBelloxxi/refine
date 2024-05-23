import { DragOverlay, UseDraggableArguments, useDraggable } from '@dnd-kit/core'
import React from 'react'

interface Props {
  id: string;
  data?: UseDraggableArguments['data']
}

// Create the draggable and uses the dnd kit kit useDraggable function to make it manipulatable
const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  })

  return (
    <div
      style={{ position: 'relative' }}  
    >
      {/* Provide boxes for each item */}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        {/* Questions whether id is active and if so render the idem in said box */}
        {active ?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                borderRadius: '8px',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                cursor: 'grabbing',
              }}>
              {children}
            </div>
          </DragOverlay>
        )}
      </div>
        {children}
    </div>
  )
}

export default KanbanItem