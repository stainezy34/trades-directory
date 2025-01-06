export type CertificationType = 'license' | 'certification' | 'qualification'

export interface Certification {
  id: string
  type: CertificationType
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  verificationUrl?: string
  documentUrl?: string
  verified: boolean
}