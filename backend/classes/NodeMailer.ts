import nodemailer from 'nodemailer'
import { google } from 'googleapis'

export class NodeMailer {
  private static instance: NodeMailer
  private transporter: nodemailer.Transporter | undefined
  private EMAIL: string = 'realtimechat10@gmail.com'

  private constructor() {
    this.initTransporter()
  }

  private async initTransporter() {
    const OAuth2 = google.auth.OAuth2

    const oauth2Client = new OAuth2(
      '618461406027-to8l7f2im472mrlf80tc737opar2ritu.apps.googleusercontent.com', // Client ID
      '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', // Client Secret
      'https://developers.google.com/oauthplayground' // Redirect URL
    )

    oauth2Client.setCredentials({
      refresh_token: '1//04xK1iNBy8y-LCgYIARAAGAQSNwF-L9IrU3auQ25QYhE7a-RuM0fj-Dj1_PX-OCqUKuqAGHJmbN6UCszM5Gqi0elhMFBm_usY_yk',
    })

    try {
      const accessToken = await oauth2Client.getAccessToken()

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.EMAIL,
          clientId: '618461406027-to8l7f2im472mrlf80tc737opar2ritu.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken: '1//04xK1iNBy8y-LCgYIARAAGAQSNwF-L9IrU3auQ25QYhE7a-RuM0fj-Dj1_PX-OCqUKuqAGHJmbN6UCszM5Gqi0elhMFBm_usY_yk',
          accessToken: accessToken.token || '', // Asegúrate de que accessToken esté correctamente manejado
        },
      })
    } catch (error) {
      console.error('Error al obtener el accessToken o configurar el transportador:', error)
      throw new Error('Error creating transporter')
    }
  }

  public static getInstance = () => {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new NodeMailer()
      return this.instance
    }
  }

  public getTransporter = (): nodemailer.Transporter | undefined => {
    return this.transporter
  }

  public getEmail = (): string => {
    return this.EMAIL
  }
}
