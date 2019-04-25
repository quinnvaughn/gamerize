const jwt = require('jsonwebtoken')

function getUserId(context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}
const addMinutes = (date, minutes) =>
  new Date(new Date(date).getTime() + minutes * 60000)

class AuthError extends Error {
  constructor(props) {
    super(props ? props : 'Not authorized')
  }
}

const processUpload = async upload => {
  const { createReadStream } = await upload
  const stream = createReadStream()
  const cloudinary = require('cloudinary')
  // change to env variables
  cloudinary.config({
    cloud_name: 'gamerize',
    api_key: '922482335973871',
    api_secret: 'ct5wctpqi_85_iU5jyklMoJ2L4M',
  })
  let resultUrl = ''
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream(function(
          error,
          result
        ) {
          if (result) {
            resultUrl = result.secure_url
            resolve(resultUrl)
          } else {
            reject(error)
          }
        })

        stream.pipe(streamLoad)
      })
    } catch (err) {
      throw new Error(`Failed to upload profile picture ! Err:${err.message}`)
    }
  }

  await cloudinaryUpload({ stream })
  return resultUrl
}
const noSpaces = string => string.replace(/ /g, '_')

module.exports = {
  noSpaces,
  getUserId,
  AuthError,
  addMinutes,
  processUpload,
}
