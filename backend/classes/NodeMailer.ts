import nodemailer from 'nodemailer';

export class NodeMailer {
  private static instance: NodeMailer
  private transporter: nodemailer.Transporter
  private EMAIL: string = 'alolisandro14@gmail.com';

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.EMAIL,
        pass: 'vsue hysv pzhw uoqi',
      },
    })
  }

  public static getInstance = () => {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new NodeMailer()
      return this.instance
    }
  }

  public getTransporter = (): nodemailer.Transporter => {
    return this.transporter
  }

  public getEmail = (): string => {
    return this.EMAIL;
  }
}