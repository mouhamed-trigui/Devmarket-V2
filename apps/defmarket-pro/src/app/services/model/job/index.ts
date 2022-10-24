export interface JobProps {
    id: number;
    job: { id: number; jobName: string };
    jobParent: number;
    depth: number;
}
