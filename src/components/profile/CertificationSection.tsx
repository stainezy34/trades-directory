import { useState } from 'react'
import { Shield, Plus, ExternalLink, Check, X } from 'lucide-react'
import type { Certification, CertificationType } from '../../lib/types/certification'
import { cn } from '../../lib/utils/cn'

type Props = {
  certifications: Certification[]
  isOwner: boolean
  onAdd?: (certification: Omit<Certification, 'id' | 'verified'>) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

export function CertificationSection({ certifications, isOwner, onAdd, onDelete }: Props) {
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    
    const certification = {
      type: form.type.value as CertificationType,
      title: form.title.value,
      issuer: form.issuer.value,
      issueDate: form.issueDate.value,
      expiryDate: form.expiryDate.value || undefined,
      verificationUrl: form.verificationUrl.value || undefined,
      documentUrl: form.documentUrl.value || undefined,
    }

    await onAdd?.(certification)
    setIsAdding(false)
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certifications & Licenses</h2>
        {isOwner && (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Certification
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                required
                className="mt-1 block w-full rounded-lg border-gray-300"
              >
                <option value="license">License</option>
                <option value="certification">Certification</option>
                <option value="qualification">Qualification</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuer</label>
              <input
                type="text"
                name="issuer"
                required
                className="mt-1 block w-full rounded-lg border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                required
                className="mt-1 block w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                name="expiryDate"
                className="mt-1 block w-full rounded-lg border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verification URL (Optional)
              </label>
              <input
                type="url"
                name="verificationUrl"
                className="mt-1 block w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document URL (Optional)
            </label>
            <input
              type="url"
              name="documentUrl"
              className="mt-1 block w-full rounded-lg border-gray-300"
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
              Add Certification
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={cn(
              "p-4 rounded-lg border",
              cert.verified ? "bg-green-50 border-green-200" : "bg-white"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Shield className={cn(
                  "w-5 h-5",
                  cert.verified ? "text-green-600" : "text-gray-400"
                )} />
                <div>
                  <h3 className="font-medium">{cert.title}</h3>
                  <p className="text-sm text-gray-600">
                    Issued by {cert.issuer} on {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                  {cert.expiryDate && (
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cert.verified ? (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    Pending Verification
                  </span>
                )}
                
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {isOwner && (
                  <button
                    onClick={() => onDelete?.(cert.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No certifications or licenses added yet
          </p>
        )}
      </div>
    </div>
  )
}