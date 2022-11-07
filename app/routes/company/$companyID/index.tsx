import React from "react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCompany } from "~/models/company.server";
import invariant from "tiny-invariant";
import { getJobsByCompanyID } from "~/models/job.server";
import JobCard from "~/components/job-card";

// Grab the company deets
type LoaderData = {
  company: Awaited<ReturnType<typeof getCompany>>;
  jobs: Awaited<ReturnType<typeof getJobsByCompanyID>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.companyID, "companyID not found");
  const company = await getCompany(params.companyID);
  const jobs = await getJobsByCompanyID(params.companyID);
  return json<LoaderData>({ company, jobs });
};

function CompanyDetailPage() {
  const { company, jobs } = useLoaderData<LoaderData>();

  return (
    <div className="p-8">
      <div className="prose">
        <h1>{company.name}</h1>
        <pre>{JSON.stringify(company, undefined, 2)}</pre>

        <h3>Jobs</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {jobs.map((job) => (
          <JobCard job={job} company={company} user={job.user} />
        ))}
      </div>
    </div>
  );

  return;
}

export default CompanyDetailPage;
