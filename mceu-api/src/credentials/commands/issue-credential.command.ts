import { IssueCredentialDto } from '../dtos';

export class IssueCredentialCommand {
  public constructor(public readonly issueCredentialDto: IssueCredentialDto) {}
}
