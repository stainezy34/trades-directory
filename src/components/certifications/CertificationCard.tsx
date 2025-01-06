import { Shield, ExternalLink, Check, X } from 'lucide-react'
import type { Certification } from '../../lib/types/certification'
import { cn } from '../../lib/utils/cn'

type Props = {
  certification: Certification
  isOwner: boolean
  onDelete?: (id: string) => Promise<void>
}

export function CertificationCard({ certification, isOwner, onDelete }: Props) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border",
        certification.verified ? "bg-green-50 border-green-200" : "bg-white"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Shield className={cn(
            "w-5 h-5",
            certification.verified ? "text-green-600" : "text-gray-400"
          )} />
          <div>
            <h3 className="font-medium">{certification.title}</h3>
            <p className="text-sm text-gray-600">
              Issued by {certification.issuer} on {new Date(certification.issueDate).toLocaleDateString()}
            </p>
            {certification.expiryDate && (
              <p className="text-sm text-gray-600">
                Expires: {new Date(certification.expiryDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {certification.verified ? (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check className="w-4 h-4" />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              Pending Verification
            </span>
          )}
          
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {isOwner && (
            <button
              onClick={() => onDelete?.(certification.id)}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}