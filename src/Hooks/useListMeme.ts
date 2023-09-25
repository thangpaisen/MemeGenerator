import handleError from '@/Helpers/handleError'
import { axiosInstance } from '@/Service/api'
import { END_POINT } from '@/Service/constant'
import { useState } from 'react'
import { useQuery } from 'react-query'

const request = async () => {
  const { data } = await axiosInstance.request({
    method: 'GET',
    url: END_POINT.templates,
  })
  return data || []
}

const useListMeme = () => {
  const [error, setError] = useState<string | null>(null)

  const { isError, data, isFetching, refetch } = useQuery({
    queryKey: ['get-useListMeme'],
    queryFn: () => request(),
    onSuccess: (result) => {},
    onError: (err) => {
      const { message } = handleError(err)
      setError(message || 'Something went wrong')
    },
    enabled: true,
  })
  return { isError, isFetching, data, error, refetch, setError }
}

export { useListMeme }
