declare module 'nodemailer' {
  interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: { user?: string; pass?: string }
    [key: string]: unknown
  }

  interface SendMailOptions {
    from?: string
    sender?: string
    to?: string | string[]
    cc?: string | string[]
    bcc?: string | string[]
    replyTo?: string
    subject?: string
    text?: string
    html?: string
    [key: string]: unknown
  }

  interface Transporter {
    sendMail(
      options: SendMailOptions,
      callback?: (error: Error | null, info: unknown) => void
    ): Promise<unknown>
    verify(callback?: (error: Error | null, success: boolean) => void): Promise<boolean>
    close(): void
  }

  export function createTransport(options: TransportOptions): Transporter
}