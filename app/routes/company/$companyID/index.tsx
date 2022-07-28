import type { LoaderFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import {
  getCompaniesWithUserId,
  getCompanyData,
} from "~/models/company.server";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getJob } from "~/models/job.server";
import { useLoaderData } from "@remix-run/react";
import React from "react";

type LoaderData = {
  company: Awaited<ReturnType<typeof getCompanyData>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.companyID, "noteId not found");
  const company = await getCompanyData(params.companyID);
  return json<LoaderData>({ company });
};

export default function Company() {
  const data = useLoaderData<LoaderData>();
  const { jobs } = data?.company;

  return (
    <main>
      <div className="card flex flex-row bg-base-300 px-6 py-4 mx-8 shadow-xl">
        <img src={data?.company?.logoUrl} />
        <div className="flex flex-col ml-4">
          <h2 className="card-title text-3xl">{data?.company?.name}</h2>
          <h2 className="card-title text-xl">{data?.company?.id}</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-8 justify-between">
        {jobs.map((job) => (
          <div key={job.id} className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{job.title}</h2>
              <p>{job.description}</p>
              <div className="card-actions">
                <div className="badge badge-outline">{job.location}</div>
                <div className="badge badge-outline">{job.contractType}</div>
                <div className="badge badge-outline">{job.contractLength}</div>
              </div>

              <div className="divider m-0" />

              <div className="mt-4 flex gap-4">
                <a
                  href={`/jobs/${job.id}`}
                  className="btn btn-secondary flex-1"
                >
                  Details
                </a>
                <a
                  href={`/jobs/${job.id}/apply`}
                  className="btn btn-primary flex-1"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
