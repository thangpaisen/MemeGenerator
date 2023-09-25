import handleError from '@/Helpers/handleError'
import { axiosInstance } from '@/Service/api'
import { END_POINT } from '@/Service/constant'
import { useState } from 'react'
import { useQuery } from 'react-query'

const request = async (payload: any) => {
  const { data } = await axiosInstance.request({
    method: 'POST',
    url: END_POINT.images,
    data: {
      ...payload,
    },
  })
  return data || []
}

const useCreateImage = (payload: any, createSuccess: any) => {
  const [error, setError] = useState<string | null>(null)

  const { isError, data, isFetching, refetch } = useQuery({
    queryKey: ['post-useCreateImage'],
    queryFn: () => request(payload),
    onSuccess: (result) => {
      createSuccess?.(result)
    },
    onError: (err) => {
      const { message } = handleError(err)
      setError(message || 'Something went wrong')
    },
    enabled: false,
  })
  return { isError, isFetching, data, error, refetch, setError }
}

export { useCreateImage }
