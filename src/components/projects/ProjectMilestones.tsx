import { useState } from 'react'
import { CheckCircle, Circle, Plus } from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import type { Project } from '../../lib/types/project'

type Milestone = {
  title: string
  description: string
  completed: boolean
  due_date: string
}

type Props = {
  project: Project
  isOwner: boolean
}

export function ProjectMilestones({ project, isOwner }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>(project.milestones || [])
  const [isAdding, setIsAdding] = useState(false)

  const handleAddMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    
    const newMilestone: Milestone = {
      title: form.title.value,
      description: form.description.value,
      due_date: form.due_date.value,
      completed: false
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          milestones: [...milestones, newMilestone]
        })
        .eq('id', project.id)

      if (error) throw error

      setMilestones([...milestones, newMilestone])
      setIsAdding(false)
      form.reset()
    } catch (error) {
      console.error('Error adding milestone:', error)
    }
  }

  const toggleMilestone = async (index: number) => {
    const updatedMilestones = milestones.map((m, i) => 
      i === index ? { ...m, completed: !m.completed } : m
    )

    try {
      const { error } = await supabase
        .from('projects')
        .update({ milestones: updatedMilestones })
        .eq('id', project.id)

      if (error) throw error
      setMilestones(updatedMilestones)
    } catch (error) {
      console.error('Error updating milestone:', error)
    }
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
        >
          <button
            onClick={() => isOwner && toggleMilestone(index)}
            disabled={!isOwner}
            className="mt-1"
          >
            {milestone.completed ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <h4 className="font-medium">{milestone.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
            <time className="text-sm text-gray-500 mt-2 block">
              Due: {new Date(milestone.due_date).toLocaleDateString()}
            </time>
          </div>
        </div>
      ))}

      {isOwner && (
        <div>
          {isAdding ? (
            <form onSubmit={handleAddMilestone} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="mt-1 w-full rounded-lg border-gray-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  className="mt-1 w-full rounded-lg border-gray-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  required
                  className="mt-1 w-full rounded-lg border-gray-300"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Milestone
            </button>
          )}
        </div>
      )}
    </div>
  )
}