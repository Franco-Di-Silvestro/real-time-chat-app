import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { config } from 'dotenv'

export class NodeMailer {
  private static instance: NodeMailer
  private transporter: nodemailer.Transporter | undefined
  private EMAIL: string = 'realtimechat10@gmail.com'

  private constructor() {
    this.initTransporter()
  }

  private async initTransporter() {

    config()
    
    const OAuth2 = google.auth.OAuth2

    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, 
      process.env.CLIENT_SECRET, 
      process.env.REDIRECT_URL 
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    })

    try {
      const accessToken = await oauth2Client.getAccessToken()

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
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
