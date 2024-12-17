export const CREDENTIAL_RESPONSE_FIELDS: Array<any> = [
    'id',
    'learnerName',
    'learnerMail',
    'title',
    'issuerName',
    'issueDate',
    'criteria',
    'credits',
    'level',
    'status',
    'assessmentType',
    'participationForm',
    'verifiedBy',
    'vcToken',
];

export const CREDENTIAL_PUBLIC_RESPONSE_FIELDS: Array<any> = [
    'id',
    'learnerName',
    'learnerMail',
    'title',
    'issuerName',
    'issueDate',
    'criteria',
    'credits',
    'level',
    'status',
    'assessmentType',
    'participationForm',
    'verifiedBy',
];

export const CREDENTIAL_JWT_RESPONSE_FIELDS: Array<any> = ['id', 'vcToken'];

export type CredentialResponse = {
    id: string;
    learnerName: string;
    learnerMail: string;
    title: string;
    issuerName: string;
    issueDate: string;
    criteria: string;
    credits: string;
    level: string;
    status: string;
    assessmentType: string;
    participationForm: string;
    verifiedBy: string;
    vcToken?: string;
};

export type CredentialListResponse = CredentialResponse[];