import { Company, Job, User } from "@prisma/client";

export interface IJobCardProps {
  job: Job;
  company?: Company;
  user?: User;
}

function JobCard({job, company, user}: IJobCardProps) {
  return (
    <div key={job.id} className="card w-96 bg-base-300 shadow-xl">
      <div className="card-body">
        <img
          className="h-16 w-16"
          src={company?.logoUrl}
          alt={company?.name}
        />
        <h2 className="card-title">{job.title}</h2>
        <a href={`/company/${company?.id}`} className="text-xs">
          {company?.name}
        </a>
        <p>{job.description}</p>
        <div className="card-actions">
          <div className="badge badge-outline">{job.location}</div>
          <div className="badge badge-outline">{job.contractType}</div>
          <div className="badge badge-outline">{job.contractLength}</div>
        </div>

        <div className="divider mt-4 flex items-center justify-end gap-4">
          <div>
            <p className="text-right text-xs">{`Added by ${user?.email}`}</p>
            <p className="text-right text-xs">{`${new Date(
              job.createdAt
            ).toLocaleString()}`}</p>
          </div>
          <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img src={`https://i.pravatar.cc/80?u=${user?.email}`} />
            </div>
          </label>
        </div>

        <div className="divider m-0" />

        <div className="mt-4 flex gap-4">
          <a href={`/jobs/${job.id}`} className="btn btn-secondary flex-1">
            Details
          </a>
          <a href={`/jobs/${job.id}/apply`} className="btn btn-primary flex-1">
            Apply
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
