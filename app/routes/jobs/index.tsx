import React from 'react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { getJobListItems } from '~/models/job.server';
import { json } from '@remix-run/node';

type LoaderData = {
  jobs: Awaited<ReturnType<typeof getJobListItems>>;
};

export const loader: LoaderFunction = async () => {
  const jobs = await getJobListItems();
  return json<LoaderData>({ jobs });
};

export default function JobsIndexPage(): JSX.Element {
  const data = useLoaderData<LoaderData>();

  return (<div className='flex flex-wrap gap-4 p-8'>
      {data.jobs.map((job) => (<div key={job.id} className='card w-96 bg-base-300 shadow-xl'>
          <div className='card-body'>
            <img
              className='h-16 w-16'
              src={job.company.logoUrl}
              alt={job.company.name}
            />
            <h2 className='card-title'>{job.title}</h2>
            <p className='text-xs'>{job.company.name}</p>
            <p>{job.description}</p>
            <div className='card-actions'>
              <div className='badge badge-outline'>{job.location}</div>
              <div className='badge badge-outline'>{job.contractType}</div>
              <div className='badge badge-outline'>{job.contractLength}</div>
            </div>

            <div className='divider mt-4 flex items-center justify-end gap-4'>
              <div>
                <p className='text-right text-xs'>{`Added by ${job.user.email}`}</p>
                <p className='text-right text-xs'>{`${new Date(job.createdAt).toLocaleString()}`}</p>
              </div>
              <label tabIndex={0} className='avatar btn btn-ghost btn-circle'>
                <div className='w-10 rounded-full'>
                  <img src={`https://i.pravatar.cc/80?u=${job.user.email}`} />
                </div>
              </label>
            </div>

            <div className='divider m-0' />

            <div className='mt-4 flex gap-4'>
              <a href={`/jobs/${job.id}`} className='btn btn-secondary flex-1'>
                Details
              </a>
              <a href={`/jobs/${job.id}/apply`} className='btn btn-primary flex-1'>
                Apply
              </a>
            </div>
          </div>
        </div>))}
    </div>);
}
