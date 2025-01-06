import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { Certification } from '../types/certification'

export function useCertifications(tradesPersonId: string) {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('certifications')
          .select('*')
          .eq('tradesperson_id', tradesPersonId)
          .order('issue_date', { ascending: false })

        if (fetchError) throw fetchError
        
        setCertifications(data?.map(cert => ({
          id: cert.id,
          type: cert.type,
          title: cert.title,
          issuer: cert.issuer,
          issueDate: cert.issue_date,
          expiryDate: cert.expiry_date,
          verificationUrl: cert.verification_url,
          documentUrl: cert.document_url,
          verified: cert.verified
        })) || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch certifications')
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [tradesPersonId])

  const addCertification = async (certification: Omit<Certification, 'id' | 'verified'>) => {
    try {
      const { error: insertError } = await supabase
        .from('certifications')
        .insert({
          tradesperson_id: tradesPersonId,
          type: certification.type,
          title: certification.title,
          issuer: certification.issuer,
          issue_date: certification.issueDate,
          expiry_date: certification.expiryDate,
          verification_url: certification.verificationUrl,
          document_url: certification.documentUrl,
          verified: false
        })

      if (insertError) throw insertError

      // Refresh certifications
      const { data, error: fetchError } = await supabase
        .from('certifications')
        .select('*')
        .eq('tradesperson_id', tradesPersonId)
        .order('issue_date', { ascending: false })

      if (fetchError) throw fetchError
      
      setCertifications(data?.map(cert => ({
        id: cert.id,
        type: cert.type,
        title: cert.title,
        issuer: cert.issuer,
        issueDate: cert.issue_date,
        expiryDate: cert.expiry_date,
        verificationUrl: cert.verification_url,
        documentUrl: cert.document_url,
        verified: cert.verified
      })) || [])

      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add certification')
      return false
    }
  }

  const deleteCertification = async (certificationId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('certifications')
        .delete()
        .eq('id', certificationId)

      if (deleteError) throw deleteError
      
      setCertifications(current => 
        current.filter(cert => cert.id !== certificationId)
      )
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete certification')
      return false
    }
  }

  return {
    certifications,
    loading,
    error,
    addCertification,
    deleteCertification
  }
}