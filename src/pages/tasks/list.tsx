import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
import KanbanColumn from '@/components/tasks/column'
import KanbanItem from '@/components/tasks/kanban/item'
import { useList } from '@refinedev/core'
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries'
import React from 'react'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { TasksQuery } from '@/graphql/types'
import { TaskStage } from '@/graphql/schema.types'
import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card'

const List = () => {
  // Data rendering, sorting and filtering for Stages
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']
      }
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'asc'
      }
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY
    }
  })
  // Importing tasks as a whole, by due date and asc order
  const { data: tasks, isLoading: isLoadingTasks } = useList<GetFieldsFromList<TasksQuery>>({
    resource: 'tasks',
    sorters: [
      {
        field: 'dueDate',
        order: 'asc'
      }
    ],
    queryOptions:{
      enabled: !!stages,
    },
    pagination: {
      mode: 'off'
    },
    meta: {
      gqlQuery: TASKS_QUERY
    }
  })

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: []
      }
      
    }
    
    const unassignedStage = tasks.data.filter((task) => task.stageId === null)
    
    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id)
    }))  

    return {
      unassignedStage,
      columns: grouped,
    }
  }, [stages, tasks])
  
  
  const handleAddCard = (args: { stageId: string}) => {};

  return (
    // Rendering in Kanban board (draggable) in individual columns per item
    <>
        <KanbanBoardContainer>
            <KanbanBoard>
                <KanbanColumn
                  id="unassigned"
                  title={"unassigned"}
                  count={taskStages.unassignedStage.length || 0}
                  onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
                >
                  {taskStages.unassignedStage.map((task) => (
                    <KanbanItem key={task.id} id={task.id}
                      data={{ ...task, stageId: 'unassigned' }}
                    >
                    <ProjectCardMemo
                      {...task}
                      dueDate={ task.dueDate || undefined }
                    />
                    </KanbanItem>
                  ))}

                  {!taskStages.unassignedStage.length && (
                    <KanbanAddCardButton
                      onClick{() => handleAddCard({ stageId: ' unassigned' })}
                    />
                  )}
                </KanbanColumn>
            </KanbanBoard>
        </KanbanBoardContainer>
    </>
  )
}

export default List