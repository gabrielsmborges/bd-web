import { BaseAPI } from "../base"
import { CreateEventInput, Event } from "./types"

export class EventsAPI extends BaseAPI {
    public async createEvent(event: CreateEventInput) {
        const res = await this.fetch('events', {
            method: 'POST',
            json: event
        }) as { message: string, id: string }

        return res
    }

    public async getEvents(): Promise<Event[]> {
        const res = await this.fetch(`me/events`, {
            method: 'GET'
        }) as { events: Event[] }

        return res.events ?? []
    }

    public async getEvent(eventId: string): Promise<Event> {
        const res = await this.fetch(`events/${eventId}`, {
            method: 'GET'
        }) as { event: Event }

        return res.event ?? null
    }

}