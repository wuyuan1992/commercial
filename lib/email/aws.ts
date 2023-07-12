import { Credentials, SES } from "aws-sdk"

const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? ""
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? ""
const awsRegion = process.env.AWS_REGION ?? "ap-northeast-2"

const sourceEmail = process.env.AWS_SES_SOURCE_EMAIL ?? ""

const ses = new SES({
  region: awsRegion,
  credentials: new Credentials({
    accessKeyId,
    secretAccessKey,
  }),
})

export function sendEmail(
  receiver: string | string[],
  title: string,
  content: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ses.sendEmail(
      {
        Source: sourceEmail,
        Destination: {
          ToAddresses: Array.isArray(receiver) ? receiver : [receiver],
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: title,
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: content,
            },
          },
        },
      },
      (err, data) => {
        if (err) {
          console.error("AWS SES error", err)
          resolve(false)
        } else {
          console.log(data)
          resolve(true)
        }
      }
    )
  })
}
