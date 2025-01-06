import { z } from 'zod'
import { projectSchema } from '../../../lib/validations'

export type ProjectFormData = z.infer<typeof projectSchema>