import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateClaimingEmailSentAtCommand} from "../update-claiming-email-sent-at.command";
import {Credential} from "../../entities/credential.entity";
import {EntityManager} from "@mikro-orm/postgresql";

@CommandHandler(UpdateClaimingEmailSentAtCommand)
export class UpdateClaimingEmailSentAtHandler implements ICommandHandler<UpdateClaimingEmailSentAtCommand> {
    constructor(private readonly em: EntityManager) {

    }

    public async execute(command: UpdateClaimingEmailSentAtCommand): Promise<Credential> {
        const {credential, sentDate} = command;

        credential.claimMailSentAt = sentDate;
        await this.em.persistAndFlush(credential);

        return credential;

    }
}
