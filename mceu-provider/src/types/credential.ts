export type Credential = {
    id?: string;
    learnerName: string;
    learnerMail: string;
    title: string;
    issueDate: Date | string;
    country: string;
    criteria: string;
    credits: string;
    level: string;
    assessmentType: string;
    participationForm: string;
    verifiedBy: string;
    status?: Status;
};

export enum Status {
    Unclaimed = 'unclaimed',
    Claimed = 'claimed',
    Revoked = 'revoked',
}
