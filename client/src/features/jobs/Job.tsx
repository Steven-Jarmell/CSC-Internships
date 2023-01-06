import { memo } from "react"
import { useGetJobsQuery } from "./jobApiSlice"

type Props = {
    jobId: number
}

const Job = ({ jobId }: Props) => {
    const { job } = useGetJobsQuery('jobsList', {
        selectFromResult: ({ data }) => ({
            job: data?.find(job => job._id === jobId)
        })
    })

    return (
        <div className="Job">
          <h1>{job?.companyName}</h1>
        </div>
    )
}

export default Job;