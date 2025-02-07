/*
 * This interface represents the aggregate of the accounts profile.
 * It includes the recent submissions, etc.
 */

import { SubmissionStatus } from "@/features/submission/models/submission-status";
import { Account } from "./account.model";

export interface AccountProfile extends Account {
  recentSubmissions: {
    problemSlug: string;
    problemId: string;
    problemTitle: string;
    status: SubmissionStatus;
    createdAt: Date;
    id: string;
  }[];
}
