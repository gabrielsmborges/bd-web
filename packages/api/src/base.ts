import dayjs from "dayjs"
import ky, { Hooks, KyInstance, RetryOptions, type Options as KyOptions } from "ky"
import duration from "dayjs/plugin/duration"


dayjs.extend(duration)

export type RequestOptions = Pick<
    KyOptions,
    'method' | 'body' | 'json' | 'searchParams' | 'timeout'
>

export interface BdApiOptions {
    hooks?: Hooks
    token: string
    retry?: RetryOptions | number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export class BaseAPI {
    private readonly httpClient: KyInstance

    constructor({
        hooks,
        token,
        retry
    }: BdApiOptions) {
        this.httpClient = ky.create({
            prefixUrl: new URL(API_URL),
            hooks: {
                ...hooks,
                beforeRequest: [
                    async (request) => {
                        if (token) {
                            request.headers.set('Authorization', `Bearer ${token}`)
                        }
                    },
                    ...(hooks?.beforeRequest || [])
                ]
            },
            timeout: dayjs.duration(1, 'minute').asMilliseconds(),
            retry
        })
    }

    protected async fetch<T = unknown>(
        url: string | URL,
        options?: RequestOptions
    ): Promise<T> {
        try {
            const response = await this.httpClient(url, options)

            return await response.json<T>()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
