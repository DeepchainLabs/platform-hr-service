import { Injectable, Inject, forwardRef, OnModuleInit } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ClientRMQ } from "@nestjs/microservices";
import { Channel, GuildMember, TextChannel, EmbedBuilder } from "discord.js";
import * as moment from "moment";
import { Observable, firstValueFrom } from "rxjs";

@Injectable()
export class DiscordService {
  constructor(
    @Inject("AttendanceService")
    private readonly attendanceServiceClient: ClientRMQ,
  ) {}

  // Or use the decorator to listen for events
  @OnEvent("SEND_DISCORD_NOTIFICATION")
  handleEvent(payload: any): Observable<any> {
    console.log("hello world ", payload);
    return this.attendanceServiceClient.emit(
      "SEND_EMBED_MESSAGE_TO_CHANNEL_CUSTOMIZE",
      payload,
    );
  }
}
