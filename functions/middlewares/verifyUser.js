export const verifyUser = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    req.user = { id: token }
    next()
  } else {
    throw new Error("Not Authorized")
  }
}